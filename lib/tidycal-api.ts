import axios from 'axios';

// Type definitions based on TidyCal API
export type BookingType = {
  id: number;
  title: string;
  duration_minutes: number;
  padding_minutes: number;
  url_slug: string;
  description: string;
  price: number;
  private: boolean;
  latest_availability_days: number;
  redirect_url: string | null;
  booking_threshold_minutes: number;
  max_bookings: number;
  url: string;
};

export type Timeslot = {
  starts_at: string;
  ends_at: string;
  available_bookings: number;
};

export type Contact = {
  name: string;
  email: string;
  timezone?: string;
};

export type BookingData = {
  starts_at: string;
  timezone?: string;
  contact: Contact;
};

// Type definition for booking response
export type Booking = {
  id: number;
  contact_id: number;
  booking_type_id: number;
  starts_at: string;
  ends_at: string;
  cancelled_at: string | null;
  created_at: string;
  updated_at: string;
  timezone: string;
  meeting_url: string | null;
  meeting_id: string | null;
  questions: Record<string, unknown>;
  contact: Contact & {
    id: number;
    ip_address: string | null;
    created_at: string;
    updated_at: string;
  };
};

// For server-side API calls (in API routes)
export const createServerSideApiClient = () => {
  const TIDYCAL_API_BASE_URL = 'https://tidycal.com/api';
  const TIDYCAL_API_TOKEN = process.env.TIDYCAL_API_TOKEN;

  return axios.create({
    baseURL: TIDYCAL_API_BASE_URL,
    headers: {
      Authorization: `Bearer ${TIDYCAL_API_TOKEN}`,
      'Content-Type': 'application/json',
    },
  });
};

// Client-side functions that call our Next.js API routes

// Get all booking types (client-side)
export async function getBookingTypes(): Promise<BookingType[]> {
  try {
    const response = await axios.get('/api/booking-types');
    return response.data.bookingTypes;
  } catch (error) {
    console.error('Error fetching booking types:', error);
    throw new Error('Failed to fetch booking types');
  }
}

// Get available timeslots for a specific booking type (client-side)
export async function getAvailableTimeslots(
  bookingTypeId: number,
  startDate: string,
  endDate: string
): Promise<Timeslot[]> {
  try {
    const response = await axios.get(`/api/booking-types/${bookingTypeId}/timeslots`, {
      params: {
        starts_at: startDate,
        ends_at: endDate,
      },
    });
    return response.data.timeslots;
  } catch (error) {
    console.error('Error fetching available timeslots:', error);
    throw new Error('Failed to fetch available timeslots');
  }
}

// Create a new booking (client-side)
export async function createBooking(
  bookingTypeId: number,
  bookingData: BookingData
): Promise<Booking> {
  try {
    const response = await axios.post(`/api/booking-types/${bookingTypeId}/bookings`, bookingData);
    return response.data.booking;
  } catch (error) {
    console.error('Error creating booking:', error);
    throw new Error('Failed to create booking');
  }
}

// We'll dynamically fetch booking types and create a mapping
let bookingTypes: BookingType[] = [];
const packageToBookingTypeMap: Record<string, number> = {};

// Helper function to get booking type ID from package ID
export async function getBookingTypeIdFromPackageId(packageId: string): Promise<number | null> {
  // If we haven't fetched booking types yet, do it now
  if (bookingTypes.length === 0) {
    try {
      bookingTypes = await getBookingTypes();
      
      // Create a mapping based on title similarity
      // This is a simple approach - in production, you'd want a more robust mapping
      const packageTypeMap: Record<string, string> = {
        'portrait-essential': 'Portrait Essential',
        'portrait-premium': 'Portrait Premium',
        'portrait-luxury': 'Portrait Luxury',
        'wedding-essential': 'Wedding Essential',
        'wedding-premium': 'Wedding Premium',
        'wedding-luxury': 'Wedding Luxury',
        'engagement-essential': 'Engagement Essential',
        'engagement-premium': 'Engagement Premium',
        'engagement-luxury': 'Engagement Luxury',
        'event-essential': 'Event Essential',
        'event-premium': 'Event Premium',
        'event-luxury': 'Event Luxury',
        'family-essential': 'Family Essential',
        'family-premium': 'Family Premium',
        'family-luxury': 'Family Luxury',
      };
      
      // For each booking type, try to find a matching package
      bookingTypes.forEach(bookingType => {
        console.log(`Found booking type: ${bookingType.title} (ID: ${bookingType.id})`);
        
        // Find a package that matches this booking type
        for (const [packageId, title] of Object.entries(packageTypeMap)) {
          if (bookingType.title.includes(title)) {
            packageToBookingTypeMap[packageId] = bookingType.id;
            console.log(`Mapped package ${packageId} to booking type ${bookingType.id}`);
            break;
          }
        }
      });
      
      // If we couldn't find any matches, use the first booking type as fallback
      if (Object.keys(packageToBookingTypeMap).length === 0 && bookingTypes.length > 0) {
        console.log('No matching booking types found, using first available as fallback');
        packageToBookingTypeMap['fallback'] = bookingTypes[0].id;
      }
    } catch (error) {
      console.error('Error fetching booking types:', error);
      return null;
    }
  }
  
  // Return the mapped ID or fallback to the first booking type
  return packageToBookingTypeMap[packageId] || packageToBookingTypeMap['fallback'] || null;
}
