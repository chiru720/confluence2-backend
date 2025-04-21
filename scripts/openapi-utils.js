#!/usr/bin/env node

/**
 * Utility functions for OpenAPI scripts
 */

const fs = require('fs');
const path = require('path');

/**
 * Simple logging utility
 */
const log = {
  info: (message, ...args) => console.log(`\x1b[36m[INFO]\x1b[0m ${message}`, ...args),
  success: (message, ...args) => console.log(`\x1b[32m[SUCCESS]\x1b[0m ${message}`, ...args),
  warn: (message, ...args) => console.log(`\x1b[33m[WARNING]\x1b[0m ${message}`, ...args),
  error: (message, ...args) => console.error(`\x1b[31m[ERROR]\x1b[0m ${message}`, ...args),
};

/**
 * Returns the path where the OpenAPI specification will be saved
 */
function getOpenApiPath() {
  return path.resolve(process.cwd(), 'openapi.json');
}

/**
 * Ensures a directory exists, creating it if it doesn't
 */
function ensureDirectoryExists(dirPath) {
  if (!fs.existsSync(dirPath)) {
    log.info(`Creating directory: ${dirPath}`);
    fs.mkdirSync(dirPath, { recursive: true });
    return true;
  }
  return false;
}

/**
 * Returns the path to the frontend directory
 */
function getFrontendDir() {
  return path.resolve(process.cwd(), '..', 'conf-2');
}

/**
 * Returns the path for the target OpenAPI specification in the frontend
 */
function getFrontendOpenApiPath() {
  const frontendDir = getFrontendDir();
  return path.join(frontendDir, 'api-docs', 'openapi.json');
}

/**
 * Checks if the OpenAPI specification exists at the expected location
 * @returns {boolean} Whether the OpenAPI spec exists
 */
function openApiSpecExists() {
  const openApiPath = getOpenApiPath();
  return fs.existsSync(openApiPath);
}

/**
 * Verifies if the OpenAPI specification exists at the expected location
 * @returns {boolean} Whether the OpenAPI spec exists
 */
function verifyOpenApiSpecExists() {
  const exists = openApiSpecExists();
  if (!exists) {
    log.error(`OpenAPI specification not found at: ${getOpenApiPath()}`);
    log.info('Run the generate-openapi script first.');
  }
  return exists;
}

/**
 * Reads the OpenAPI specification from the file
 * @returns {Object|null} The parsed OpenAPI spec or null if there was an error
 */
function readOpenApiSpec() {
  const openApiPath = getOpenApiPath();
  try {
    const content = fs.readFileSync(openApiPath, 'utf8');
    return JSON.parse(content);
  } catch (error) {
    log.error(`Failed to read OpenAPI specification: ${error.message}`);
    return null;
  }
}

module.exports = {
  log,
  getOpenApiPath,
  ensureDirectoryExists,
  getFrontendDir,
  getFrontendOpenApiPath,
  openApiSpecExists,
  verifyOpenApiSpecExists,
  readOpenApiSpec,
}; 