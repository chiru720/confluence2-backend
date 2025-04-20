/**
 * Common utility functions
 */

import { DEFAULT_PAGINATION } from '../constants';

/**
 * Parse pagination params from query parameters
 */
export function parsePaginationParams(
  page?: string | number,
  limit?: string | number,
): { skip: number; take: number; page: number } {
  const parsedPage = Math.max(
    Number(page) || DEFAULT_PAGINATION.PAGE,
    DEFAULT_PAGINATION.PAGE,
  );
  
  const parsedLimit = Math.min(
    Math.max(Number(limit) || DEFAULT_PAGINATION.LIMIT, 1),
    DEFAULT_PAGINATION.MAX_LIMIT,
  );

  return {
    skip: (parsedPage - 1) * parsedLimit,
    take: parsedLimit,
    page: parsedPage,
  };
}

/**
 * Format pagination response with metadata
 */
export function formatPaginationResponse<T>(
  data: T[],
  count: number,
  page: number,
  limit: number,
) {
  return {
    data,
    meta: {
      total: count,
      page,
      limit,
      totalPages: Math.ceil(count / limit),
      hasNextPage: page * limit < count,
      hasPreviousPage: page > 1,
    },
  };
}

/**
 * Generate a random string
 */
export function generateRandomString(length = 10) {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  
  return result;
}

/**
 * Remove sensitive fields from user object
 */
export function sanitizeUser(user: any) {
  const { password, ...sanitizedUser } = user;
  return sanitizedUser;
} 