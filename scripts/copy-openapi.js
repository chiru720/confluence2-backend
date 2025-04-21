#!/usr/bin/env node

/**
 * Script to copy the OpenAPI specification to the frontend
 */

const fs = require('fs');
const path = require('path');
const { 
  log, 
  getOpenApiPath, 
  verifyOpenApiSpecExists, 
  getFrontendOpenApiPath,
  ensureDirectoryExists 
} = require('./openapi-utils');
const { generateOpenApiSpec } = require('./generate-openapi');

/**
 * Copies the OpenAPI specification to the frontend project
 * @param {boolean} generateIfMissing Whether to generate the spec if it's missing
 * @returns {Promise<boolean>} Whether the copy was successful
 */
async function copyOpenApiToFrontend(generateIfMissing = true) {
  log.info('Copying OpenAPI specification to frontend...');
  
  const sourceFile = getOpenApiPath();
  
  // Check if the OpenAPI specification exists
  if (!fs.existsSync(sourceFile)) {
    log.error('OpenAPI specification not found.');
    
    // Generate the spec if asked to do so
    if (generateIfMissing) {
      log.info('Attempting to generate the OpenAPI specification...');
      const generated = await generateOpenApiSpec();
      if (!generated) {
        log.error('Could not generate the OpenAPI specification');
        return false;
      }
    } else {
      log.info('Run the generate-openapi script first: npm run openapi:generate');
      return false;
    }
  }
  
  const targetFile = getFrontendOpenApiPath();
  
  // Ensure the target directory exists
  const targetDir = path.dirname(targetFile);
  ensureDirectoryExists(targetDir);
  
  try {
    // Copy the file
    fs.copyFileSync(sourceFile, targetFile);
    log.success(`✓ OpenAPI specification copied to: ${targetFile}`);
    return true;
  } catch (error) {
    log.error('Failed to copy OpenAPI specification to frontend', error.message);
    return false;
  }
}

// Execute the script if it's run directly
if (require.main === module) {
  copyOpenApiToFrontend().then((success) => {
    process.exit(success ? 0 : 1);
  });
}

module.exports = { copyOpenApiToFrontend }; 