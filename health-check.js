#!/usr/bin/env node
/**
 * Health Check Script
 * Verifies server is running and responsive
 */

import http from 'http';

const PORT = process.env.PORT || 5000;
const HOST = process.env.HOST || '0.0.0.0';

const healthCheck = () => {
  const options = {
    host: HOST === '0.0.0.0' ? 'localhost' : HOST,
    port: PORT,
    path: '/health',
    method: 'GET',
    timeout: 5000
  };

  const req = http.request(options, (res) => {
    let data = '';
    
    res.on('data', (chunk) => {
      data += chunk;
    });
    
    res.on('end', () => {
      if (res.statusCode === 200) {
        console.log('✅ Server is healthy');
        console.log(`Response: ${data}`);
        process.exit(0);
      } else {
        console.error(`❌ Server returned status ${res.statusCode}`);
        process.exit(1);
      }
    });
  });

  req.on('error', (err) => {
    console.error('❌ Health check failed:', err.message);
    process.exit(1);
  });

  req.on('timeout', () => {
    console.error('❌ Health check timed out');
    req.abort();
    process.exit(1);
  });

  req.end();
};

console.log(`🏥 Checking server health at ${HOST}:${PORT}/health`);
healthCheck();