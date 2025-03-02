import { NextRequest, NextResponse } from 'next/server';
import { createServerSideApiClient } from '@/lib/tidycal-api';

export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const bookingData = await request.json();
    
    console.log(`Creating booking for booking type ID: ${params.id}`);
    console.log('Booking data:', bookingData);
    
    const tidyCalApi = createServerSideApiClient();
    const response = await tidyCalApi.post(
      `/booking-types/${params.id}/bookings`,
      bookingData
    );
    
    const booking = response.data.data;
    console.log(`Booking created with ID: ${booking.id}`);
    
    return NextResponse.json({ booking });
  } catch (error) {
    console.error('Error creating booking:', error);
    return NextResponse.json(
      { error: 'Failed to create booking' },
      { status: 500 }
    );
  }
}
