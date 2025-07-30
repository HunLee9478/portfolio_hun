#!/usr/bin/env node

/**
 * Health Check Script
 * Verifies that the production server is running and responsive
 */

import http from 'http';

const PORT = process.env.PORT || 5000;
const HOST = process.env.HOST || '0.0.0.0';

console.log('🏥 Running health check...');

const options = {
  hostname: HOST === '0.0.0.0' ? 'localhost' : HOST,
  port: PORT,
  path: '/',
  method: 'GET',
  timeout: 5000
};

const req = http.request(options, (res) => {
  if (res.statusCode === 200) {
    console.log('✅ Health check passed - Server is running');
    console.log(`📡 Server responding at http://${options.hostname}:${PORT}`);
    process.exit(0);
  } else {
    console.error(`❌ Health check failed - Server returned status ${res.statusCode}`);
    process.exit(1);
  }
});

req.on('error', (error) => {
  console.error('❌ Health check failed - Server not responding:', error.message);
  process.exit(1);
});

req.on('timeout', () => {
  console.error('❌ Health check failed - Request timeout');
  req.destroy();
  process.exit(1);
});

req.end();