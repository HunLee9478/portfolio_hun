# LEESEUNGHUN – Content Creator Portfolio

A modern, interactive portfolio website showcasing professional content creation work, featuring advanced scroll-based animations and a comprehensive content management system.

## 🌟 Features

### Interactive Design
- **Cinematic Video Integration**: Scroll-triggered video scaling with GSAP animations
- **Advanced Content Management**: 20-click developer mode activation system
- **Responsive Layout**: Optimized for all device sizes with mobile-first approach
- **Smooth Animations**: Framer Motion and GSAP powered transitions

### Content Showcase
- **Project Portfolio**: Detailed project modals with technical specifications
- **Visual Gallery**: Masonry-style image gallery with lightbox functionality
- **Professional Timeline**: Comprehensive career and education documentation
- **Real-time Editing**: In-browser content editing with font styling options

### Technical Excellence
- **Modern Stack**: React 18, TypeScript, Tailwind CSS
- **Performance Optimized**: Lazy loading, image optimization, smooth scrolling
- **Production Ready**: Clean codebase with organized asset structure
- **Developer Tools**: Advanced editing capabilities for content management

## 🛠 Technology Stack

### Frontend
- **React 18** - Modern React with hooks and concurrent features
- **TypeScript** - Type-safe development experience
- **Tailwind CSS** - Utility-first styling with custom design system
- **Framer Motion** - Smooth animations and transitions
- **GSAP** - Advanced scroll-triggered animations
- **Wouter** - Lightweight routing solution

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Web application framework
- **Static Asset Serving** - Optimized media delivery

### Build Tools
- **Vite** - Fast build tool and development server
- **PostCSS** - CSS processing and optimization
- **ESBuild** - Fast JavaScript bundler

## 📁 Project Structure

```
├── client/                 # Frontend application
│   ├── src/
│   │   ├── components/     # Reusable UI components
│   │   ├── pages/          # Page components
│   │   ├── constants/      # Styling constants and configurations
│   │   └── main.tsx        # Application entry point
│   └── index.html          # HTML template
├── server/                 # Backend application
│   ├── index.ts           # Express server setup
│   ├── routes.ts          # API routes
│   └── vite.ts            # Vite integration
├── shared/                 # Shared types and schemas
│   └── schema.ts          # Database schemas and types
├── assets/                 # Media assets
│   ├── images/            # Project and UI images
│   ├── gallery/           # Gallery images
│   ├── projects/          # Project-specific assets
│   └── videos/            # Video content
├── package.json           # Project dependencies
└── vite.config.ts         # Vite configuration
```

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository
```bash
git clone https://github.com/yourusername/leeseunghun-portfolio.git
cd leeseunghun-portfolio
```

2. Install dependencies
```bash
npm install
```

3. Start the development server
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5000`

### Development Mode Features

The portfolio includes an advanced developer mode that can be activated by clicking 20 times anywhere on the page. This enables:

- **In-place Text Editing**: Edit any text content directly
- **Font Styling Controls**: Adjust letter spacing, line height, and font family
- **Image Management**: Replace and modify images with drag-and-drop functionality
- **Real-time Preview**: See changes instantly without page reload

## 📦 Build and Deployment

### Production Build
```bash
npm run build
```

### Static Export
```bash
npm run build:static
```

### Deployment Options
- **Static Hosting**: Deploy to Netlify, Vercel, or GitHub Pages
- **Server Deployment**: Deploy to any Node.js hosting service
- **Docker**: Container-ready for cloud deployment

## 🎨 Customization

### Styling
- Modify `client/src/constants/styles.ts` for global style constants
- Update `tailwind.config.ts` for design system changes
- Edit `client/src/index.css` for custom CSS

### Content
- Update project data in `client/src/pages/combined-landing-new.tsx`
- Replace assets in the `assets/` directory
- Modify personal information and contact details

### Developer Mode
- Adjust click threshold in the developer mode activation logic
- Customize editing capabilities in `client/src/components/AdvancedEditableText.tsx`

## 🔧 Configuration

### Environment Variables
Create a `.env` file in the root directory:
```env
PORT=5000
NODE_ENV=development
```

### Asset Management
- Place images in `assets/images/` for general use
- Use `assets/projects/` for project-specific content
- Store videos in `assets/videos/`

## 📈 Performance Features

- **Lazy Loading**: Images and components load on demand
- **Code Splitting**: Optimized bundle sizes
- **Asset Optimization**: Compressed images and videos
- **Caching**: Efficient asset caching strategies

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 📞 Contact

**LEESEUNGHUN** - Content Creator & Developer
- Email: buen136003@gmail.com
- Portfolio: [Live Demo](https://your-portfolio-url.com)

---

**Made with ❤️ in Seoul, South Korea**

*Copyright © 2025 LEESEUNGHUN. All rights reserved.*