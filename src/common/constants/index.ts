/**
 * Application constants
 */

export const API_PREFIX = 'api';
export const API_VERSION = 'v1';
export const DEFAULT_PORT = 3333;

export const JWT = {
  SECRET: 'jwt-secret',
  EXPIRES_IN: '1d',
  REFRESH_EXPIRES_IN: '7d',
};

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