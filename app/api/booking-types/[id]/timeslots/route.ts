import { NextRequest, NextResponse } from 'next/server';
import { createServerSideApiClient } from '@/lib/tidycal-api';

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { searchParams } = new URL(request.url);
    const startDate = searchParams.get('starts_at');
    const endDate = searchParams.get('ends_at');
    
    console.log(`Fetching timeslots for booking type ID: ${params.id}`);
    console.log(`Date range: ${startDate} to ${endDate}`);
    
    if (!startDate || !endDate) {
      return NextResponse.json(
        { error: 'Missing required parameters: starts_at and ends_at' },
        { status: 400 }
      );
    }
    
    const tidyCalApi = createServerSideApiClient();
    const response = await tidyCalApi.get(`/booking-types/${params.id}/timeslots`, {
      params: {
        starts_at: startDate,
        ends_at: endDate,
      },
    });
    
    const timeslots = response.data.data;
    console.log(`Retrieved ${timeslots.length} timeslots`);
    
    return NextResponse.json({ timeslots });
  } catch (error) {
    console.error('Error fetching timeslots:', error);
    return NextResponse.json(
      { error: 'Failed to fetch timeslots' },
      { status: 500 }
    );
  }
}
