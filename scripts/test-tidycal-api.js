// Test script for TidyCal API integration
// This script tests the booking questions handling in TidyCal

// Import required modules
import dotenv from 'dotenv';
import axios from 'axios';
import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';
import fs from 'fs';

// Set up paths for finding .env files
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const rootDir = resolve(__dirname, '..');

// Debug environment setup
console.log(`Current directory: ${process.cwd()}`);
console.log(`Script directory: ${__dirname}`);
console.log(`Root directory: ${rootDir}`);

// Explicitly check for .env.local file
const envLocalPath = resolve(rootDir, '.env.local');
if (fs.existsSync(envLocalPath)) {
  console.log(`.env.local found at: ${envLocalPath}`);
  // Read the file content and display it for debugging
  const envContent = fs.readFileSync(envLocalPath, 'utf8');
  console.log(`Full .env.local content:`);
  console.log(envContent);
  
  // Parse the env file manually as a fallback
  const envLines = envContent.split('\n');
  for (const line of envLines) {
    if (line.trim() && !line.startsWith('#')) {
      const [key, ...valueParts] = line.split('=');
      const value = valueParts.join('='); // Rejoin in case value contains =
      if (key && value) {
        process.env[key.trim()] = value.trim();
      }
    }
  }
  
  console.log("Available environment variables after manual parsing:");
  console.log("TIDYCAL_API_TOKEN present:", !!process.env.TIDYCAL_API_TOKEN);
  if (process.env.TIDYCAL_API_TOKEN) {
    console.log("Token starts with:", process.env.TIDYCAL_API_TOKEN.substring(0, 20) + "...");
  }
} else {
  console.log(`WARNING: .env.local file not found at: ${envLocalPath}`);
}

// Load environment variables with explicit path as well (belt and suspenders)
dotenv.config({ path: envLocalPath });

/**
 * Create a server-side API client without using the library
 * to avoid TypeScript import issues
 */
function createApiClient() {
  const TIDYCAL_API_BASE_URL = 'https://tidycal.com/api';
  const TIDYCAL_API_TOKEN = process.env.TIDYCAL_API_TOKEN;

  if (!TIDYCAL_API_TOKEN) {
    throw new Error('TIDYCAL_API_TOKEN environment variable is not set. Please add it to your .env.local file.');
  }

  return axios.create({
    baseURL: TIDYCAL_API_BASE_URL,
    headers: {
      Authorization: `Bearer ${TIDYCAL_API_TOKEN}`,
      'Content-Type': 'application/json',
    },
  });
}

/**
 * Main test function
 */
async function testTidyCalAPI() {
  console.log('===== TESTING TIDYCAL API INTEGRATION =====');
  console.log('Testing started at:', new Date().toLocaleString());
  console.log('-------------------------------------------');
  
  try {
    // Initialize the API client
    const api = createApiClient();
    console.log('✅ API client initialized');
    
    // Test 1: Get Booking Types
    console.log('\n📋 TEST 1: Get Booking Types');
    const bookingTypesResponse = await api.get('/booking-types');
    
    if (!bookingTypesResponse.data.data || !bookingTypesResponse.data.data.length) {
      throw new Error('No booking types found');
    }
    
    console.log(`✅ Success! Found ${bookingTypesResponse.data.data.length} booking types`);
    
    // For debugging, display all booking types
    console.log('\nAvailable Booking Types:');
    bookingTypesResponse.data.data.forEach((type, index) => {
      console.log(`${index + 1}. ID: ${type.id}, Title: "${type.title}", Duration: ${type.duration_minutes} mins`);
    });
    
    // Use the first booking type for testing
    const testBookingType = bookingTypesResponse.data.data[0];
    console.log(`\nUsing booking type ID ${testBookingType.id} (${testBookingType.title}) for testing`);
    
    // Test 2: Get Timeslots
    console.log('\n📋 TEST 2: Get Available Timeslots');
    
    // Format a date according to TidyCal's expected format: Y-m-d\TH:i:s\Z
    function formatDateForTidyCal(date) {
      const year = date.getUTCFullYear();
      const month = String(date.getUTCMonth() + 1).padStart(2, '0');
      const day = String(date.getUTCDate()).padStart(2, '0');
      const hours = String(date.getUTCHours()).padStart(2, '0');
      const minutes = String(date.getUTCMinutes()).padStart(2, '0');
      const seconds = String(date.getUTCSeconds()).padStart(2, '0');
      
      return `${year}-${month}-${day}T${hours}:${minutes}:${seconds}Z`;
    }
    
    // Get dates for timeslot search (tomorrow to +7 days)
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    tomorrow.setHours(0, 0, 0, 0);
    
    const nextWeek = new Date(tomorrow);
    nextWeek.setDate(nextWeek.getDate() + 7);
    
    // Format dates according to TidyCal's expected format
    const startsAtFormatted = formatDateForTidyCal(tomorrow);
    const endsAtFormatted = formatDateForTidyCal(nextWeek);
    
    console.log(`Searching for timeslots from ${startsAtFormatted} to ${endsAtFormatted}`);
    
    const timeslotsResponse = await api.get(`/booking-types/${testBookingType.id}/timeslots`, {
      params: {
        starts_at: startsAtFormatted,
        ends_at: endsAtFormatted,
      }
    });
    
    if (!timeslotsResponse.data.data || !timeslotsResponse.data.data.length) {
      throw new Error('No available timeslots found');
    }
    
    console.log(`✅ Success! Found ${timeslotsResponse.data.data.length} available timeslots`);
    
    // Display a sample of timeslots
    console.log('\nSample of available timeslots:');
    const sampleSize = Math.min(3, timeslotsResponse.data.data.length);
    for (let i = 0; i < sampleSize; i++) {
      const slot = timeslotsResponse.data.data[i];
      console.log(`- ${new Date(slot.starts_at).toLocaleString()} to ${new Date(slot.ends_at).toLocaleString()}`);
    }
    
    // Test 3: Create Booking with Questions
    console.log('\n📋 TEST 3: Create Booking with Questions');
    
    // Select the first available timeslot
    const testTimeslot = timeslotsResponse.data.data[0];
    
    // Create test booking data
    const testBookingData = {
      starts_at: testTimeslot.starts_at,
      timezone: 'Europe/Berlin',
      name: 'API Test User',
      email: 'test@example.com',
      booking_questions: [
        {
          booking_type_question_id: 1,
          answer: 'Wedding',
        },
        {
          booking_type_question_id: 2,
          answer: 'Test Additional Information'
        }
      ]
    };
    
    console.log('Sending booking data:');
    console.log(JSON.stringify(testBookingData, null, 2));
    
    // Create the booking
    console.log('\nSending booking request...');
    const bookingResponse = await api.post(
      `/booking-types/${testBookingType.id}/bookings`,
      testBookingData
    );
    
    // Check response
    if (!bookingResponse.data || (!bookingResponse.data.id && !bookingResponse.data.data?.id)) {
      throw new Error('Invalid booking response - no booking ID found');
    }
    
    // Extract booking data accounting for different response formats
    const bookingData = bookingResponse.data.data || bookingResponse.data;
    const bookingId = bookingData.id;
    
    console.log(`✅ Success! Booking created with ID: ${bookingId}`);
    console.log('\nBooking Response Data:');
    console.log(JSON.stringify(bookingData, null, 2));
    
    // Test 4: Check if questions are included in the response
    console.log('\n📋 TEST 4: Verify Questions Data in Response');
    
    if (bookingData.questions) {
      console.log('✅ Success! Questions data found in response:');
      console.log(JSON.stringify(bookingData.questions, null, 2));
    } else {
      console.log('⚠️ WARNING: No questions data found in response!');
      console.log('This may indicate that TidyCal is not storing or returning question answers.');
    }
    
    // Test 5: List All Bookings to find our new booking
    console.log('\n📋 TEST 5: List All Bookings');
    
    try {
      // Get all bookings
      const allBookingsResponse = await api.get('/bookings');
      const bookings = allBookingsResponse.data.data || [];
      
      console.log(`✅ Success! Retrieved ${bookings.length} bookings`);
      
      // Look for our newly created booking
      const ourBooking = bookings.find(b => b.id === bookingId);
      
      if (ourBooking) {
        console.log(`✅ Found our booking (ID: ${bookingId}) in the list of all bookings`);
        
        // Check for questions data
        if (ourBooking.questions && Object.keys(ourBooking.questions).length > 0) {
          console.log('✅ Questions data found in the booking:');
          console.log(JSON.stringify(ourBooking.questions, null, 2));
        } else {
          console.log('⚠️ WARNING: No questions data found in the booking!');
          console.log('This confirms that TidyCal is not storing or returning question answers in the API response.');
          console.log('The questions object exists but is empty:', JSON.stringify(ourBooking.questions));
        }
      } else {
        console.log(`⚠️ WARNING: Our newly created booking (ID: ${bookingId}) was not found in the list of all bookings.`);
        console.log('This may indicate a delay in TidyCal\'s database synchronization.');
      }
    } catch (error) {
      console.log('⚠️ Failed to list all bookings:', error.message);
      
      if (error.response) {
        console.error('Response status:', error.response.status);
        console.error('Response data:', JSON.stringify(error.response.data, null, 2));
      }
    }

  } catch (error) {
    console.error('❌ ERROR:', error.message);
    
    if (error.response) {
      console.error('Response status:', error.response.status);
      console.error('Response data:', JSON.stringify(error.response.data, null, 2));
    }
  }
  
  console.log('\n-------------------------------------------');
  console.log('Testing completed at:', new Date().toLocaleString());
  console.log('===== END OF TIDYCAL API TESTING =====');
}

// Run the test function
testTidyCalAPI().catch(console.error);
