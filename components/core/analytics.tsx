import Script from 'next/script';

type AnalyticsProps = {
  gaId?: string; // Google Analytics ID (optional for now)
}

/**
 * Analytics component for tracking site usage
 * Placeholder implementation that can be easily populated with real tracking ID
 * 
 * @param gaId Google Analytics measurement ID (format: G-XXXXXXXX)
 */
export default function Analytics({ gaId = "G-XXXXXXXX" }: AnalyticsProps) {
  // If no ID provided, or in development, don't render analytics
  if (gaId === "G-XXXXXXXX" || process.env.NODE_ENV === "development") {
    return (
      <div data-testid="analytics-placeholder" className="hidden">
        {/* Placeholder for GA4 - Replace G-XXXXXXXX with actual tracking ID when ready */}
      </div>
    );
  }

  return (
    <>
      {/* Google Analytics 4 */}
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${gaId}', {
            page_path: window.location.pathname,
          });
        `}
      </Script>

      {/* Event tracking helper - This exposes a global tracking function */}
      <Script id="analytics-events" strategy="afterInteractive">
        {`
          // Define global tracking helper
          window.trackEvent = function(category, action, label, value) {
            if (window.gtag) {
              window.gtag('event', action, {
                'event_category': category,
                'event_label': label,
                'value': value
              });
            }
          }
          
          // Helper functions for common events
          window.trackContactClick = function() {
            window.trackEvent('engagement', 'contact_click', 'Contact Form', null);
          }
          
          window.trackBookingClick = function() {
            window.trackEvent('conversion', 'booking_click', 'Booking Calendar', null);
          }
          
          window.trackGalleryFilter = function(category) {
            window.trackEvent('engagement', 'gallery_filter', category, null);
          }
          
          window.trackServiceClick = function(service) {
            window.trackEvent('engagement', 'service_click', service, null);
          }
          
          // Setup automatic gallery tracking
          document.addEventListener('DOMContentLoaded', function() {
            // Add tracking to gallery links
            document.querySelectorAll('[data-gallery-id]').forEach(function(el) {
              el.addEventListener('click', function() {
                const galleryId = this.getAttribute('data-gallery-id');
                if(galleryId) {
                  window.trackEvent('engagement', 'gallery_view', galleryId, null);
                }
              });
            });
            
            // Add tracking to CTA buttons
            document.querySelectorAll('[data-track-cta]').forEach(function(el) {
              el.addEventListener('click', function() {
                const ctaName = this.getAttribute('data-track-cta');
                if(ctaName) {
                  window.trackEvent('conversion', 'cta_click', ctaName, null);
                }
              });
            });
          });
        `}
      </Script>
    </>
  );
}
