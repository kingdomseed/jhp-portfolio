import { NextRequest, NextResponse } from 'next/server';
import { Booking } from '@/lib/tidycal-api';

export async function POST(request: NextRequest) {
  try {
    console.log('Received email notification request');
    
    // Parse request data with detailed validation
    let requestData;
    try {
      requestData = await request.json();
      console.log('Email notification request data structure:', Object.keys(requestData));
    } catch (parseError) {
      console.error('Failed to parse email request JSON:', parseError);
      return NextResponse.json(
        { error: 'Invalid JSON in request body' },
        { status: 400 }
      );
    }
    
    const { booking, serviceName } = requestData;
    
    // Detailed validation with specific error messages
    const validationErrors = [];
    
    if (!booking) {
      validationErrors.push('Missing booking data');
      console.error('Email validation error: booking data is missing');
    } else {
      console.log('Booking data received with ID:', booking.id);
    }
    
    if (!serviceName) {
      validationErrors.push('Missing service name');
      console.error('Email validation error: service name is missing'); 
    } else {
      console.log('Service name received:', serviceName);
    }
    
    if (validationErrors.length > 0) {
      return NextResponse.json(
        { 
          error: 'Missing required booking information',
          details: validationErrors 
        },
        { status: 400 }
      );
    }

    // Format the booking data for the email
    console.log('Formatting email content with booking data');
    const formattedBooking = formatBookingForEmail(booking, serviceName);
    
    // Send email using environment variables for email configuration
    console.log('Attempting to send email notification');
    const emailSent = await sendEmail(formattedBooking);
    
    if (!emailSent) {
      console.error('Failed to send booking email');
      return NextResponse.json(
        { error: 'Failed to send booking email' },
        { status: 500 }
      );
    }
    
    console.log('Email notification sent successfully');
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error sending booking email:', error);
    
    // Provide more specific error information
    let errorMessage = 'Failed to send booking email';
    let errorDetails = null;
    
    if (error instanceof Error) {
      errorMessage = `Error: ${error.message}`;
      errorDetails = error.stack;
    }
    
    return NextResponse.json(
      { 
        error: errorMessage,
        details: errorDetails
      },
      { status: 500 }
    );
  }
}

// Format booking data for email
function formatBookingForEmail(
  booking: Booking, 
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
  
  // Extract user message from booking questions
  let userMessage = 'No additional information provided';
  if (booking.questions && typeof booking.questions === 'object') {
    // Try to extract the message from different possible locations
    if ('message' in booking.questions && booking.questions.message) {
      userMessage = String(booking.questions.message);
    } else if ('additionalInformation' in booking.questions && booking.questions.additionalInformation) {
      userMessage = String(booking.questions.additionalInformation);
    }
  }
  
  // Include the service information that was selected
  const selectedService = booking.questions?.service ? `Selected Service: ${booking.questions.service}` : '';
  
  // Build the email content
  return `
    New Booking Notification
    
    Service: ${serviceName}
    
    Date: ${formattedStartDate}
    Time: ${formattedStartTime} - ${formattedEndTime}
    
    Client Information:
    Name: ${booking.contact.name}
    Email: ${booking.contact.email}
    
    Additional Information:
    ${userMessage}
    
    Booking Details:
    ${selectedService}
    
    Booking ID: ${booking.id}
    Created: ${new Date(booking.created_at).toLocaleString()}
    
    Note: Please check that the booking appears in your TidyCal dashboard. If the Zoom meeting link wasn't automatically created, you'll need to add it manually and send it to the client.
  `;
}

// Send email function
async function sendEmail(emailContent: string): Promise<boolean> {
  // Get email configuration from environment variables
  const EMAIL_TO = process.env.NOTIFICATION_EMAIL || 'hello@jasonholtphotography.com';
  const EMAIL_FROM = process.env.EMAIL_FROM || 'hello@jasonholtphotography.com';
  
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
