/**
 * PM2 Configuration for Production Deployment
 * Handles process management, clustering, and monitoring
 */

module.exports = {
  apps: [
    {
      name: 'leeseunghun-portfolio',
      script: 'dist/index.js',
      instances: 'max',
      exec_mode: 'cluster',
      env: {
        NODE_ENV: 'development',
        PORT: 5000
      },
      env_production: {
        NODE_ENV: 'production',
        PORT: process.env.PORT || 5000
      },
      // Logging
      log_file: './logs/combined.log',
      out_file: './logs/out.log',
      error_file: './logs/error.log',
      log_date_format: 'YYYY-MM-DD HH:mm Z',
      
      // Restart policy
      restart_delay: 1000,
      max_restarts: 10,
      min_uptime: '10s',
      
      // Memory management
      max_memory_restart: '1G',
      
      // Monitoring
      monitoring: false,
      
      // Health check
      health_check: {
        url: 'http://localhost:5000/health',
        interval: 30000,
        timeout: 5000
      }
    }
  ]
};