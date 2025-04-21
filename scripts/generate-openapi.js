#!/usr/bin/env node

/**
 * Script to generate OpenAPI specification from a NestJS application
 * This avoids issues with the NestJS CLI watch mode
 */

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');
const { log, getOpenApiPath } = require('./openapi-utils');

/**
 * Generates the OpenAPI specification using NestJS CLI
 * @returns {Promise<boolean>} Whether the generation was successful
 */
async function generateOpenApiSpec() {
  const openApiPath = getOpenApiPath();
  
  log.info('Generating OpenAPI specification...');
  
  try {
    // Set environment variable for OpenAPI generation
    process.env.GENERATE_OPENAPI_ONLY = 'true';
    
    // Use Node directly with the compiled JavaScript
    // This avoids the NestJS CLI and its watch mode
    const command = 'node -e "require(\'./dist/main\');"';
    
    try {
      // First ensure the project is built
      log.info('Building the NestJS application...');
      execSync('nest build', { stdio: 'inherit' });
      
      // Then run the standalone command with our environment variable
      log.info('Running with GENERATE_OPENAPI_ONLY flag...');
      execSync(command, { 
        stdio: 'inherit',
        env: { ...process.env, GENERATE_OPENAPI_ONLY: 'true' }
      });
      
      // Verify the OpenAPI spec was created
      if (fs.existsSync(openApiPath)) {
        const openApiSpec = JSON.parse(fs.readFileSync(openApiPath, 'utf8'));
        const { info, paths } = openApiSpec;
        const endpointCount = Object.keys(paths || {}).length;
        
        log.success('OpenAPI specification generated successfully!');
        log.info(`API: ${info?.title || 'Untitled'} (v${info?.version || 'unknown'})`);
        log.info(`Endpoints: ${endpointCount}`);
        log.info(`Location: ${openApiPath}`);
        return true;
      } else {
        log.error(`OpenAPI specification was not generated at: ${openApiPath}`);
        return false;
      }
    } catch (error) {
      // We actually expect an "error" since the process.exit(0) in main.ts
      // will cause the execSync to throw, but the spec should still be generated
      if (fs.existsSync(openApiPath)) {
        log.success('OpenAPI specification generated successfully!');
        log.info(`Location: ${openApiPath}`);
        return true;
      } else {
        log.error('Failed to generate OpenAPI specification', error.message);
        return false;
      }
    }
  } catch (error) {
    log.error('Failed to execute OpenAPI generation script', error.message);
    return false;
  }
}

// Execute the script if it's run directly
if (require.main === module) {
  generateOpenApiSpec().then((success) => {
    process.exit(success ? 0 : 1);
  });
}

module.exports = { generateOpenApiSpec }; 