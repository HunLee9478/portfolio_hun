# Architecture Documentation

This document describes the technical architecture of the LEESEUNGHUN Portfolio website.

## 🏗️ System Overview

The portfolio is built as a modern full-stack web application with a clean separation between frontend and backend concerns.

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   Frontend      │    │   Backend       │    │   Assets        │
│   (React SPA)   │◄──►│   (Express.js)  │◄──►│   (Static)      │
└─────────────────┘    └─────────────────┘    └─────────────────┘
```

## 🎯 Architecture Principles

### 1. Separation of Concerns
- **Frontend**: Handles UI/UX, user interactions, and presentation logic
- **Backend**: Manages API endpoints, static file serving, and server-side logic
- **Assets**: Organized media files with optimized delivery

### 2. Component-Based Architecture
- **Reusable Components**: Modular UI components with single responsibility
- **Composition over Inheritance**: Components built through composition
- **Props-Based Configuration**: Flexible component configuration

### 3. Type Safety
- **TypeScript**: End-to-end type safety from frontend to backend
- **Shared Types**: Common type definitions in shared directory
- **Schema Validation**: Runtime validation with Zod

## 🔧 Frontend Architecture

### Technology Stack
```
React 18
├── TypeScript        # Type safety
├── Tailwind CSS      # Styling
├── Framer Motion     # Animations
├── GSAP             # Advanced animations
├── Wouter           # Routing
└── TanStack Query   # Server state management
```

### Directory Structure
```
client/
├── src/
│   ├── components/          # Reusable UI components
│   │   ├── ui/             # Base UI components (shadcn/ui)
│   │   └── AdvancedEditableText.tsx
│   ├── pages/              # Page components
│   │   └── combined-landing-new.tsx
│   ├── constants/          # Application constants
│   │   └── styles.ts
│   ├── hooks/              # Custom React hooks
│   ├── utils/              # Utility functions
│   └── main.tsx            # Application entry point
├── public/                 # Static assets
└── index.html              # HTML template
```

### Component Hierarchy
```
App
├── Navigation
├── HeroSection
│   ├── VideoAnimation
│   └── ScrollIndicator
├── AboutSection
├── WorkSection
│   ├── ProjectGrid
│   └── ProjectModal
│       ├── ProjectDetails
│       └── ImageGallery
├── GallerySection
├── ContactSection
└── Footer
```

### State Management
- **Local State**: React hooks for component-level state
- **Global State**: Context API for application-wide state
- **Server State**: TanStack Query for API data management
- **Developer Mode**: Local storage for editor state persistence

## 🖥️ Backend Architecture

### Technology Stack
```
Node.js + Express.js
├── TypeScript        # Type safety
├── Static Serving    # Asset delivery
├── Hot Reloading     # Development experience
└── Error Handling    # Robust error management
```

### Directory Structure
```
server/
├── index.ts          # Server entry point
├── routes.ts         # API route definitions
├── vite.ts          # Vite integration
└── storage.ts       # Storage interface
```

### Request Flow
```
Client Request
│
├── Static Assets ──► Express Static Middleware
│
├── API Routes ────► Route Handlers
│                    │
│                    ├── Validation
│                    ├── Business Logic
│                    └── Response
│
└── SPA Routes ────► Vite Dev Server (dev)
                     Static Files (prod)
```

## 🎨 Design System

### Styling Architecture
```
Tailwind CSS
├── Base Styles       # Global styles
├── Components        # Component styles
├── Utilities         # Utility classes
└── Custom Classes    # Project-specific styles
```

### Color System
```css
:root {
  --primary: #ff6b6b;
  --secondary: #282623;
  --accent: #58534e;
  --background: #ffffff;
  --text: #000000;
}
```

### Typography Scale
```javascript
const FONT_SIZES = {
  hero: '62px',
  section: 'text-4xl lg:text-5xl',
  heading: 'text-xl lg:text-2xl',
  body: 'text-base',
  small: 'text-sm',
  tiny: 'text-xs'
};
```

## 🎭 Animation System

### GSAP Integration
- **ScrollTrigger**: Scroll-based animations
- **Timeline**: Complex animation sequences
- **Performance**: GPU-accelerated animations

### Framer Motion
- **Page Transitions**: Smooth page navigation
- **Component Animations**: Hover and interaction effects
- **Layout Animations**: Dynamic layout changes

### Animation Hierarchy
```
Global Animations
├── Scroll Animations (GSAP)
│   ├── Video Scaling
│   ├── Section Reveals
│   └── Parallax Effects
├── Interaction Animations (Framer Motion)
│   ├── Button Hovers
│   ├── Image Galleries
│   └── Modal Transitions
└── Layout Animations
    ├── Grid Transitions
    ├── Text Reveals
    └── Loading States
```

## 🔧 Developer Mode Architecture

### Activation System
```javascript
// 20-click activation
let clickCount = 0;
const ACTIVATION_THRESHOLD = 20;

document.addEventListener('click', () => {
  clickCount++;
  if (clickCount >= ACTIVATION_THRESHOLD) {
    activateDeveloperMode();
  }
});
```

### Component Enhancement
```typescript
interface AdvancedEditableTextProps {
  textKey: string;
  isImageEditable?: boolean;
  imageSrc?: string;
  onImageChange?: (newSrc: string) => void;
  children: React.ReactNode;
}
```

### State Management
```javascript
// Developer mode state
const developerModeState = {
  isActive: false,
  editingKey: null,
  changes: {},
  history: []
};
```

## 📦 Build System

### Vite Configuration
```javascript
// Development
- Hot Module Replacement
- Fast build times
- TypeScript support
- Asset processing

// Production
- Code splitting
- Tree shaking
- Asset optimization
- Bundle analysis
```

### Build Process
```
Source Code
│
├── TypeScript Compilation
├── Asset Processing
├── Code Splitting
├── Optimization
└── Output
    ├── dist/public/  # Static assets
    └── dist/index.js # Server bundle
```

## 🔒 Security Architecture

### Input Validation
```typescript
// Zod schema validation
const ProjectSchema = z.object({
  title: z.string().min(1).max(100),
  description: z.string().min(1).max(1000),
  images: z.array(z.string().url()).optional()
});
```

### Content Security
- **XSS Prevention**: Input sanitization
- **CSRF Protection**: Token-based protection
- **File Upload Security**: Type and size validation

## 📊 Performance Architecture

### Frontend Optimization
- **Code Splitting**: Route-based splitting
- **Lazy Loading**: Component and image lazy loading
- **Memoization**: React.memo and useMemo
- **Bundle Size**: Tree shaking and dead code elimination

### Asset Optimization
- **Image Optimization**: WebP format, responsive images
- **Video Optimization**: Compressed formats, lazy loading
- **Font Loading**: Optimal font loading strategies

### Caching Strategy
```javascript
// Static assets
Cache-Control: public, max-age=31536000

// API responses
Cache-Control: private, max-age=300

// HTML pages
Cache-Control: no-cache
```

## 🌐 Deployment Architecture

### Static Deployment
```
Build Process
│
├── Client Build ──► Static Files
├── Asset Optimization
└── CDN Distribution
```

### Server Deployment
```
Build Process
│
├── Client Build ──► Static Files
├── Server Bundle ──► Node.js App
└── Container ──► Cloud Platform
```

## 📈 Monitoring & Analytics

### Performance Monitoring
- **Core Web Vitals**: LCP, FID, CLS tracking
- **Bundle Analysis**: Size and performance metrics
- **Error Tracking**: Runtime error monitoring

### User Analytics
- **Page Views**: Navigation tracking
- **User Interactions**: Click and scroll tracking
- **Performance Metrics**: Load time analysis

## 🔮 Future Considerations

### Scalability
- **Database Integration**: PostgreSQL with Drizzle ORM
- **API Expansion**: RESTful API development
- **Microservices**: Service decomposition

### Enhancement Opportunities
- **Progressive Web App**: PWA features
- **Offline Support**: Service worker implementation
- **Internationalization**: Multi-language support

---

*This architecture document is maintained alongside the codebase and should be updated as the system evolves.*