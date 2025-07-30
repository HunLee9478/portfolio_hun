/**
 * Production Configuration
 * This file contains production-ready settings for deployment
 */

export const productionConfig = {
  // Server settings
  port: process.env.PORT || 5000,
  host: process.env.HOST || '0.0.0.0',
  
  // Environment
  nodeEnv: 'production',
  
  // Build settings
  buildDir: 'dist',
  clientBuildDir: 'dist/client',
  
  // Deployment commands
  commands: {
    build: 'node build.js',
    start: 'node start.js',
    healthCheck: 'node health-check.js'
  },
  
  // Replit deployment configuration
  replit: {
    deploymentTarget: 'autoscale',
    buildCommand: ['sh', '-c', 'node build.js'],
    runCommand: ['sh', '-c', 'node start.js'],
    port: 5000,
    externalPort: 80
  }
};

export default productionConfig;