import { NextRequest, NextResponse } from 'next/server';
import { createServerSideApiClient } from '@/lib/tidycal-api';
import axios from 'axios';

export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const bookingData = await request.json();
    const { serviceName, packageDetails } = bookingData;
    
    // Remove custom fields that aren't part of the TidyCal API
    const tidyCalBookingData = {
      starts_at: bookingData.starts_at,
      timezone: bookingData.timezone,
      contact: bookingData.contact,
      questions: bookingData.questions || {}
    };
    
    console.log(`Creating booking for booking type ID: ${params.id}`);
    
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
    console.error('Error creating booking:', error);
    return NextResponse.json(
      { error: 'Failed to create booking' },
      { status: 500 }
    );
  }
}
