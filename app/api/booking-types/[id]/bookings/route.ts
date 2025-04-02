import { NextRequest, NextResponse } from 'next/server';
import { createServerSideApiClient } from '@/lib/tidycal-api';
import axios from 'axios';

export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const bookingData = await request.json();
    const { serviceName, packageDetails, starts_at, timezone, name, email, questions } = bookingData;
    
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
      ...(questions && { questions })
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
    
    // Send email notification
    try {
      await axios.post('/api/send-booking-email', {
        booking,
        packageDetails,
        serviceName
      });
      console.log('Booking notification email sent');
    } catch (emailError) {
      // Log the error but don't fail the booking process
      console.error('Failed to send booking notification email:', emailError);
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
