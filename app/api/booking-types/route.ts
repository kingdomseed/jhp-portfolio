import { NextResponse } from 'next/server';
import { BookingType, createServerSideApiClient } from '@/lib/tidycal-api';

export async function GET() {
  try {
    console.log('Fetching all booking types from TidyCal API');
    const tidyCalApi = createServerSideApiClient();
    const response = await tidyCalApi.get('/booking-types');
    const bookingTypes = response.data.data;
    
    console.log(`Retrieved ${bookingTypes.length} booking types:`);
    bookingTypes.forEach((type: BookingType) => {
      console.log(`- ID: ${type.id}, Title: ${type.title}, Duration: ${type.duration_minutes} minutes`);
    });
    
    return NextResponse.json({ bookingTypes });
  } catch (error) {
    console.error('Error fetching booking types:', error);
    return NextResponse.json(
      { error: 'Failed to fetch booking types' },
      { status: 500 }
    );
  }
}
