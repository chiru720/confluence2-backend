/**
 * Application constants
 */

// These will come from config, defined here only as fallbacks
export const API_DEFAULT = {
  PREFIX: 'api',
  VERSION: 'v1',
  PORT: 3333
};

// JWT constants - only the structure, values come from config
export const JWT_KEYS = {
  SECRET: 'JWT_SECRET',
  EXPIRES_IN: 'JWT_EXPIRES_IN',
  REFRESH_EXPIRES_IN: 'JWT_REFRESH_EXPIRES_IN',
};

// Enums and other constants that don't change with environment
export enum UserRole {
  ADMIN = 'admin',
  EDITOR = 'editor',
  VIEWER = 'viewer',
}

export enum DocumentPermission {
  VIEW = 'view',
  EDIT = 'edit',
  COMMENT = 'comment',
  ADMIN = 'admin',
}

export const DEFAULT_PAGINATION = {
  PAGE: 1,
  LIMIT: 10,
  MAX_LIMIT: 100,
};

export const SWAGGER_CONFIG = {
  TITLE: 'Confluence 2.0 API',
  DESCRIPTION: 'API documentation for Confluence 2.0',
  VERSION: '1.0.0',
  TAG: 'confluence-api',
};

// Auth constants
export const AUTH_CONSTANTS = {
  STRATEGIES: {
    JWT: 'jwt',
    GOOGLE: 'google',
  },
  KEYS: {
    JWT_SECRET: 'JWT_SECRET',
    JWT_EXPIRATION: 'JWT_EXPIRATION',
    GOOGLE_CLIENT_ID: 'GOOGLE_CLIENT_ID',
    GOOGLE_CLIENT_SECRET: 'GOOGLE_CLIENT_SECRET',
    GOOGLE_CALLBACK_URL: 'GOOGLE_CALLBACK_URL',
    FRONTEND_URL: 'FRONTEND_URL',
  },
  ROUTES: {
    GOOGLE_AUTH: 'google',
    GOOGLE_CALLBACK: 'google/callback',
    PROFILE: 'profile',
    CALLBACK_PATH: 'auth/callback',
  },
  META: {
    PUBLIC_KEY: 'isPublic',
    ROLES_KEY: 'roles',
  },
};

// Export database constants
export * from './db.constants'; 