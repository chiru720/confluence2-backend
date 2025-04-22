export interface JwtPayload {
  sub: string | number; // User ID
  email: string;
  iat?: number; // Issued at
  exp?: number; // Expiration time
} 