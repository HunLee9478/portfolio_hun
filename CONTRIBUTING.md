# Contributing to LEESEUNGHUN Portfolio

Thank you for your interest in contributing to this project! This document provides guidelines for contributing to the LEESEUNGHUN Portfolio website.

## 🤝 How to Contribute

### Reporting Issues
- Use the GitHub issue tracker to report bugs or suggest features
- Check if the issue already exists before creating a new one
- Provide detailed information about the problem or suggestion

### Development Process
1. Fork the repository
2. Create a feature branch from `main`
3. Make your changes
4. Test your changes thoroughly
5. Submit a pull request

### Code Style
- Follow the existing code style and conventions
- Use TypeScript for type safety
- Follow React best practices
- Use meaningful variable and function names
- Add comments for complex logic

### Commit Messages
Use clear and descriptive commit messages:
```
feat: add new portfolio project modal
fix: resolve scroll animation timing issue
docs: update README with deployment instructions
style: improve responsive design for mobile devices
```

### Pull Request Process
1. Update the README.md with details of changes if needed
2. Update the CHANGELOG.md with notable changes
3. Ensure all tests pass
4. Request review from maintainers

## 🛠 Development Setup

### Prerequisites
- Node.js 18+
- npm or yarn

### Local Development
```bash
# Clone your fork
git clone https://github.com/yourusername/leeseunghun-portfolio.git

# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

### Project Structure
```
├── client/          # Frontend React application
├── server/          # Express backend
├── shared/          # Shared types and schemas
├── assets/          # Static assets
└── docs/            # Documentation
```

## 📝 Code Guidelines

### TypeScript
- Use strict mode
- Define proper types for all props and functions
- Avoid `any` type - use specific types instead

### React Components
- Use functional components with hooks
- Keep components small and focused
- Use proper prop validation
- Implement proper error boundaries

### Styling
- Use Tailwind CSS for styling
- Follow the existing design system
- Ensure responsive design
- Test on multiple screen sizes

### Performance
- Optimize images and assets
- Use lazy loading where appropriate
- Minimize bundle size
- Follow React performance best practices

## 🧪 Testing

### Running Tests
```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage
npm run test:coverage
```

### Writing Tests
- Write unit tests for utility functions
- Write integration tests for components
- Test user interactions
- Test responsive behavior

## 📚 Documentation

### Code Documentation
- Add JSDoc comments for functions
- Document complex algorithms
- Explain business logic
- Update README for new features

### API Documentation
- Document all API endpoints
- Include request/response examples
- Document error codes
- Update OpenAPI/Swagger specs

## 🎨 Design Guidelines

### UI/UX
- Follow accessibility best practices
- Ensure keyboard navigation
- Test with screen readers
- Maintain consistent design language

### Animations
- Use smooth, purposeful animations
- Respect user's motion preferences
- Optimize for performance
- Test on various devices

## 🚀 Deployment

### Before Deployment
- Test all functionality
- Check responsive design
- Validate performance
- Update documentation

### Production Checklist
- [ ] All tests passing
- [ ] No console errors
- [ ] Responsive design verified
- [ ] Performance optimized
- [ ] Documentation updated

## 📞 Getting Help

- Check the documentation in `/docs`
- Search existing issues
- Ask questions in discussions
- Contact maintainers directly

## 📄 License

By contributing to this project, you agree that your contributions will be licensed under the MIT License.

---

Thank you for contributing to make this project better! 🙏