import { NextResponse } from 'next/server';
import { createServerSideApiClient } from '@/lib/tidycal-api';
import { AxiosError } from 'axios';

export async function GET() {
  try {
    const tidyCalApi = createServerSideApiClient();
    const response = await tidyCalApi.get('/booking-types');
    const bookingTypes = response.data.data;
    
    return NextResponse.json({ bookingTypes });
  } catch (error: unknown) {
    const axiosError = error as AxiosError;
    console.error('Error fetching booking types:', {
      message: axiosError.message,
      status: axiosError.response?.status,
      statusText: axiosError.response?.statusText,
      data: axiosError.response?.data
    });
    return NextResponse.json(
      { error: 'Failed to fetch booking types' },
      { status: 500 }
    );
  }
}
