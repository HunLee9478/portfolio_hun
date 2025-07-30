/**
 * Production Configuration
 * Environment-specific settings for production deployment
 */

export const productionConfig = {
  // Server configuration
  server: {
    port: process.env.PORT || 5000,
    host: process.env.HOST || '0.0.0.0',
    nodeEnv: 'production'
  },

  // Build configuration
  build: {
    target: 'production',
    minify: true,
    sourcemap: false,
    outDir: 'dist'
  },

  // Security configuration
  security: {
    cors: {
      origin: process.env.CORS_ORIGIN || false,
      credentials: true
    },
    helmet: true,
    compression: true
  },

  // Database configuration
  database: {
    url: process.env.DATABASE_URL,
    ssl: process.env.NODE_ENV === 'production'
  },

  // Logging configuration
  logging: {
    level: 'info',
    format: 'combined',
    errorLog: 'logs/error.log',
    accessLog: 'logs/access.log'
  }
};

export default productionConfig;