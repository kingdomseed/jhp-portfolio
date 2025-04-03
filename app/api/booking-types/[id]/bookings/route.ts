import { NextRequest, NextResponse } from 'next/server';
import { createServerSideApiClient } from '@/lib/tidycal-api';
import axios from 'axios';

export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    // Add detailed logging to diagnose data flow
    console.log('Received booking request for booking type ID:', params.id);
    
    const bookingData = await request.json();
    console.log('Raw booking request data:', JSON.stringify(bookingData, null, 2));
    
    const { serviceName, starts_at, timezone, name, email, booking_questions } = bookingData;
    
    // Log each critical field to diagnose missing data
    console.log('Critical data extraction:');
    console.log('- serviceName:', serviceName);
    console.log('- starts_at:', starts_at);
    console.log('- timezone:', timezone);
    console.log('- name:', name);
    console.log('- email:', email);
    console.log('- booking_questions:', booking_questions ? JSON.stringify(booking_questions) : 'Missing');
    
    // Validate required fields according to TidyCal API format
    if (!starts_at) throw new Error('starts_at is required');
    if (!timezone) throw new Error('timezone is required');
    if (!name) throw new Error('name is required');
    if (!email) throw new Error('email is required');
    
    // Construct booking data according to TidyCal API format
    const tidyCalBookingData = {
      starts_at,
      timezone,
      name,
      email,
      ...(booking_questions && { booking_questions })
    };
    
    console.log(`Creating booking for booking type ID: ${params.id}`, {
      bookingData: tidyCalBookingData
    });
    
    const tidyCalApi = createServerSideApiClient();
    const response = await tidyCalApi.post(
      `/booking-types/${params.id}/bookings`,
      tidyCalBookingData
    );
    
    // Handle different response formats from TidyCal API
    const booking = response.data.data || response.data;
    
    if (!booking || !booking.id) {
      console.error('Invalid booking response:', response.data);
      throw new Error('Invalid booking response from TidyCal API');
    }
    
    console.log(`Booking created with ID: ${booking.id}`);
    console.log('Booking data received from TidyCal:', JSON.stringify(booking, null, 2));
    
    // Extract service type from booking questions if available
    let serviceType = serviceName;
    if (booking_questions && Array.isArray(booking_questions)) {
      const serviceQuestion = booking_questions.find(q => q.booking_type_question_id === 1);
      if (serviceQuestion) {
        serviceType = serviceQuestion.answer as string;
      }
    }
    
    // Extract additional info from booking questions if available
    let additionalInfo = '';
    if (booking_questions && Array.isArray(booking_questions)) {
      const infoQuestion = booking_questions.find(q => q.booking_type_question_id === 2);
      if (infoQuestion) {
        additionalInfo = infoQuestion.answer as string;
      }
    }
    
    // Store booking information for email notifications
    // Note: We're adding the original booking_questions to the booking 
    // since TidyCal doesn't return them in the response
    const bookingWithQuestions = {
      ...booking,
      questions: {
        service: serviceType,
        message: additionalInfo
      }
    };
    
    // Prepare email data
    const emailData = {
      booking: bookingWithQuestions,
      serviceName: serviceType || 'Photography Session'
    };
    
    console.log('Email notification data prepared:', JSON.stringify({
      booking: 'Booking object present',
      serviceName: emailData.serviceName,
      additionalInfo: additionalInfo ? 'Present' : 'Missing'
    }));
    
    // Send email notification
    try {
      // Get base URL from environment or use default for development
      const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 
                      (process.env.NODE_ENV === 'development' ? 'http://localhost:3000' : '');
      
      if (!baseUrl) {
        console.warn('NEXT_PUBLIC_BASE_URL not set. Email sending might fail.');
      }
      
      // Use absolute URL for API endpoint to avoid Invalid URL errors
      await axios.post(`${baseUrl}/api/send-booking-email`, emailData);
      console.log('Booking notification email sent successfully');
    } catch (error) {
      // Log the error but don't fail the booking process
      console.error('Failed to send booking notification email:', error);
      
      if (axios.isAxiosError(error)) {
        console.error('Email API response error:', error.response?.data);
        console.error('Email API status:', error.response?.status);
      } else if (error instanceof Error) {
        console.error('Email error message:', error.message);
        console.error('Email error stack:', error.stack);
      } else {
        console.error('Unknown email error type:', String(error));
      }
    }
    
    return NextResponse.json({ booking });
  } catch (error) {
    console.error('Error creating booking:', {
      error: error instanceof Error ? error.message : 'Unknown error',
      response: axios.isAxiosError(error) ? {
        status: error.response?.status,
        data: error.response?.data
      } : undefined
    });
    return NextResponse.json(
      { 
        error: 'Failed to create booking',
        details: axios.isAxiosError(error) ? error.response?.data : undefined
      },
      { status: 500 }
    );
  }
}
