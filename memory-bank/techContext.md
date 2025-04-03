# Jason Holt Photography Technical Context

## Technology Stack

### Frontend
- **Framework**: Next.js 14.1.0
- **Language**: TypeScript 5.3+
- **Styling**: Tailwind CSS 3.4.1 with custom theming
- **Component Library**: shadcn/ui (Radix UI-based components)
- **State Management**: React Hooks (useState, useEffect, useMemo)
- **Animations**: Framer Motion

### Build & Development
- **Package Manager**: npm
- **Development Server**: Next.js dev server
- **Build System**: Next.js build system with custom scripts
- **Image Processing**: Custom metadata generator using image-size

### Deployment
- **Hosting**: TBD (likely Vercel)
- **CI/CD**: TBD

### Third-Party Integrations
- **Booking System**: TidyCal API integration
- **Email Notifications**: SendGrid
- **Client Galleries**: External client gallery system (linked)

## Development Environment

### Local Setup
```bash
# Clone repository
git clone <repository-url>

# Install dependencies
cd jhp-next
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Generate image metadata
npm run generate-image-metadata
```

### Project Structure
- `/app`: Next.js app router pages and layouts
- `/components`: React components
  - `/ui`: Reusable UI components
- `/lib`: Utility functions and shared code
- `/public`: Static assets
  - `/images`: Photography images
- `/scripts`: Build and utility scripts
- `/hooks`: Custom React hooks

## Key Technical Decisions

### 1. Next.js App Router
The site uses Next.js App Router for improved routing capabilities, layouts, and server components where appropriate.

### 2. Image Handling
A custom solution for image handling was developed to address the specific needs of a photography portfolio:

- **Aspect Ratio Preservation**: Crucial for photography display
- **Build-time Metadata Generation**: Analyzes images during build
- **Runtime Adaptive Layout**: Uses metadata for optimal display
- **Fallback System**: Handles missing metadata gracefully

### 3. API Architecture
Server-side API routes are used to:
- Proxy requests to external services (TidyCal)
- Handle email sending through SendGrid
- Avoid CORS issues with third-party services

### 4. Type Safety
TypeScript is used throughout the project for:
- Component props validation
- API response typing
- State management type safety
- Improved developer experience

### 5. Component Library
The shadcn/ui component library was chosen because:
- It provides accessible, customizable components
- It integrates well with Tailwind CSS
- It offers a good balance between structure and flexibility
- It's based on the robust Radix UI primitives

## Key Technical Challenges

### 1. Gallery Aspect Ratio Handling
Challenge: Photography images have varying aspect ratios that need to be preserved in a visually appealing grid layout.

Solution:
- Build-time image analysis to extract dimensions
- Dynamic calculation of image sizes based on aspect ratios
- True masonry layout algorithm that places images in the shortest column

### 2. TidyCal Integration
Challenge: Direct API integration with TidyCal experienced CORS issues.

Solution:
- Server-side API routes to proxy requests
- Improved error handling and debugging
- Client-side state management for booking flow

### 3. Responsive Design
Challenge: Creating a consistent experience across devices while showcasing photography effectively.

Solution:
- Breakpoint-based responsive layouts
- Adaptive component behavior (e.g., varying column counts)
- Mobile-first development approach

## Performance Considerations

### Image Optimization
- Next.js Image component for automatic optimization
- Lazy loading for below-fold content
- Progressive loading with "Load More" functionality

### Code Splitting
- Dynamic imports for larger components
- Page-level code splitting via Next.js

### Rendering Strategy
- Static generation where possible
- Server components for non-interactive content
- Client components only where necessary

## Browser Compatibility

The site is designed to work on:
- Chrome/Edge (latest 2 versions)
- Firefox (latest 2 versions)
- Safari (latest 2 versions)
- iOS Safari and Chrome (latest 2 versions)
- Android Chrome (latest 2 versions)

## Accessibility

The site aims for WCAG 2.1 AA compliance with:
- Semantic HTML
- Proper ARIA attributes
- Keyboard navigation support
- Color contrast compliance
- Screen reader compatibility

## Future Technical Considerations

- Server-side rendering optimization
- Image CDN integration
- Analytics implementation
- A/B testing capabilities
- Internationalization for multi-language support
