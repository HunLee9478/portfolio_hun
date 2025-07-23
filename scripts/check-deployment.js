#!/usr/bin/env node
/**
 * Deployment Readiness Check
 * Verifies all deployment requirements are met
 */

import { existsSync, readFileSync } from 'fs';
import { execSync } from 'child_process';
import path from 'path';

const checks = [
  {
    name: 'Environment File',
    check: () => existsSync('.env') || existsSync('.env.example'),
    message: 'Create .env file for environment variables'
  },
  {
    name: 'Build Directory',
    check: () => existsSync('dist'),
    message: 'Run: node build.js'
  },
  {
    name: 'Client Build',
    check: () => existsSync('dist/public'),
    message: 'Client build missing - run: node build.js'
  },
  {
    name: 'Server Build',
    check: () => existsSync('dist/index.js'),
    message: 'Server build missing - run: node build.js'
  },
  {
    name: 'Assets',
    check: () => existsSync('dist/assets'),
    message: 'Assets missing - ensure assets are copied during build'
  },
  {
    name: 'Node Version',
    check: () => {
      try {
        const version = process.version;
        const major = parseInt(version.split('.')[0].substring(1));
        return major >= 18;
      } catch {
        return false;
      }
    },
    message: 'Node.js 18+ required'
  },
  {
    name: 'Port Environment',
    check: () => process.env.PORT || process.env.NODE_ENV === 'development',
    message: 'Set PORT environment variable for production'
  }
];

console.log('🔍 Checking deployment readiness...\n');

let passed = 0;
let failed = 0;

checks.forEach(({ name, check, message }) => {
  try {
    if (check()) {
      console.log(`✅ ${name}`);
      passed++;
    } else {
      console.log(`❌ ${name} - ${message}`);
      failed++;
    }
  } catch (error) {
    console.log(`❌ ${name} - Error: ${error.message}`);
    failed++;
  }
});

console.log(`\n📊 Results: ${passed} passed, ${failed} failed`);

if (failed > 0) {
  console.log('\n🔧 Fix the issues above before deploying');
  process.exit(1);
} else {
  console.log('\n✅ Ready for deployment!');
  
  console.log('\n🚀 Deployment options:');
  console.log('- Static: DEPLOYMENT_TYPE=static node deploy.js');
  console.log('- Vercel: DEPLOYMENT_TYPE=vercel node deploy.js');
  console.log('- Netlify: DEPLOYMENT_TYPE=netlify node deploy.js');
  console.log('- Docker: docker build -t portfolio .');
  console.log('- PM2: pm2 start ecosystem.config.js --env production');
  
  process.exit(0);
}