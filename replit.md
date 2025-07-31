# LEESEUNGHUN – Content Creator Portfolio

## Overview
This is a Korean content creator portfolio website showcasing video production, content creation, and educational work. Built with React, TypeScript, and Express.js, it features a clean, professional design, a unique 20-click developer mode, and advanced CMS-like editing capabilities. The project's vision is to provide a modern, interactive platform for content creators to present their work and engage with their audience.

## User Preferences
Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend
- **Framework**: React 18 with TypeScript
- **Routing**: Wouter
- **Styling**: Tailwind CSS with shadcn/ui
- **State Management**: TanStack Query
- **Build Tool**: Vite
- **Animation**: Framer Motion
- **Form Handling**: React Hook Form with Zod validation
- **UI/UX Decisions**: Responsive design with a mobile-first approach, clean professional design, smooth animations, customized typography with specific font choices (e.g., Nanum Square, Inter, Playfair Display) and consistent sizing. Integration of custom fonts like Recia Serif Display Bold. Use of consistent color scheme across components.

### Backend
- **Runtime**: Node.js with Express.js
- **Language**: TypeScript with ES modules
- **Database**: Drizzle ORM with PostgreSQL (Neon serverless)
- **Session Management**: Express sessions with PostgreSQL storage
- **Development**: Hot reloading with Vite integration
- **Storage Layer**: Abstracted interface with in-memory implementation for development
- **Security**: Environment variable setup for production, health monitoring, error handling.

### Data Storage
- **Database**: PostgreSQL via Neon serverless
- **ORM**: Drizzle ORM
- **Schema**: `/shared/schema.ts`
- **Migrations**: Drizzle Kit

### Key Features & Design Patterns
- **20-click developer mode**: Activates comprehensive CMS-like editing capabilities.
- **Advanced EditableText component**: Inline text editing with font styling options.
- **Dynamic Content Management**: Supports editing of titles, descriptions, and images.
- **Scroll-triggered Animations**: Utilizes GSAP ScrollTrigger for complex video scaling and section transitions, including a cinematic video showreel.
- **Modular Component Design**: UI components from shadcn/ui, responsive layouts, and animated elements.
- **Image Optimization**: CSS aspect-ratio for perfect image fit, lazy loading support.
- **Project Modals**: Detailed project modals with horizontal scrolling galleries and dynamic image sizing.
- **Unified Styling**: Centralized constants for typography (FONT_SIZES, TYPOGRAPHY) and colors (COLORS) for consistent theming.

## External Dependencies

### Core
- **@neondatabase/serverless**: PostgreSQL database connection
- **@radix-ui/***: Headless UI components
- **@tanstack/react-query**: Server state management
- **drizzle-orm**: Type-safe database ORM
- **framer-motion**: Animation library
- **wouter**: Lightweight routing
- **Pexels**: (Previously used for stock video, now replaced with custom showreel)
- **Unsplash**: (Used for some professional workspace images)
- **GSAP (GreenSock Animation Platform)**: Specifically ScrollTrigger for complex scroll-based animations.

### Development & Utilities
- **Vite**: Build tool and development server
- **TypeScript**: Static type checking
- **Tailwind CSS**: Utility-first CSS framework
- **ESBuild**: Fast JavaScript bundler
- **React Hook Form**: Form management
- **Zod**: Schema validation
- **PM2**: Node.js process manager (for production)
- **Docker**: Containerization (for production)
- **Nginx**: Reverse proxy (for production)