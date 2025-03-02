import { NextRequest, NextResponse } from 'next/server';
import { Booking } from '@/lib/tidycal-api';

export async function POST(request: NextRequest) {
  try {
    const { booking, packageDetails, serviceName } = await request.json();
    
    if (!booking || !packageDetails || !serviceName) {
      return NextResponse.json(
        { error: 'Missing required booking information' },
        { status: 400 }
      );
    }

    // Format the booking data for the email
    const formattedBooking = formatBookingForEmail(booking, packageDetails, serviceName);
    
    // Send email using environment variables for email configuration
    const emailSent = await sendEmail(formattedBooking);
    
    if (!emailSent) {
      console.error('Failed to send booking email');
      return NextResponse.json(
        { error: 'Failed to send booking email' },
        { status: 500 }
      );
    }
    
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error sending booking email:', error);
    return NextResponse.json(
      { error: 'Failed to send booking email' },
      { status: 500 }
    );
  }
}

// Package type definition
type PackageDetails = {
  id: string;
  title: string;
  price: string;
  description: string;
  features: string[];
  popular?: boolean;
};

// Format booking data for email
function formatBookingForEmail(
  booking: Booking, 
  packageDetails: PackageDetails, 
  serviceName: string
): string {
  const startDate = new Date(booking.starts_at);
  const endDate = new Date(booking.ends_at);
  
  const formattedStartDate = startDate.toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
  
  const formattedStartTime = startDate.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit'
  });
  
  const formattedEndTime = endDate.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit'
  });
  
  return `
    New Booking Notification
    
    Service: ${serviceName}
    Package: ${packageDetails.title} (${packageDetails.price})
    
    Date: ${formattedStartDate}
    Time: ${formattedStartTime} - ${formattedEndTime}
    
    Client Information:
    Name: ${booking.contact.name}
    Email: ${booking.contact.email}
    
    Additional Information:
    ${booking.questions?.message || 'No additional information provided'}
    
    Booking ID: ${booking.id}
    Created: ${new Date(booking.created_at).toLocaleString()}
  `;
}

// Send email function
async function sendEmail(emailContent: string): Promise<boolean> {
  // Get email configuration from environment variables
  const EMAIL_TO = process.env.NOTIFICATION_EMAIL || 'info@jasonholtphotography.com';
  const EMAIL_FROM = process.env.EMAIL_FROM || 'bookings@jasonholtphotography.com';
  
  console.log('Preparing to send email to:', EMAIL_TO);
  
  // Check if we're in development mode
  const isDevelopment = process.env.NODE_ENV === 'development';
  
  if (isDevelopment) {
    // In development, just log the email content
    console.log('Email would be sent in production. Email content:');
    console.log(emailContent);
    return true;
  }
  
  // In production, use SendGrid to send the email
  try {
    // Import SendGrid dynamically to avoid issues in development
    const sgMail = await import('@sendgrid/mail');
    
    // Get API key from environment variables
    const SENDGRID_API_KEY = process.env.SENDGRID_API_KEY;
    
    if (!SENDGRID_API_KEY) {
      console.error('SendGrid API key not found in environment variables');
      return false;
    }
    
    sgMail.default.setApiKey(SENDGRID_API_KEY);
    
    const msg = {
      to: EMAIL_TO,
      from: EMAIL_FROM,
      subject: 'New Booking Notification - Jason Holt Photography',
      text: emailContent,
    };
    
    await sgMail.default.send(msg);
    console.log('Email sent successfully');
    return true;
  } catch (error) {
    console.error('Error sending email:', error);
    return false;
  }
}
