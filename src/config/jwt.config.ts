import { registerAs } from '@nestjs/config';

export default registerAs('jwt', () => ({
  secret: process.env.JWT_SECRET || 'development_secret_key_replace_in_production',
  expiresIn: process.env.JWT_EXPIRES_IN || '1d', // Default: 1 day (string format for flexibility)
  refreshExpiresIn: process.env.JWT_REFRESH_EXPIRES_IN || '7d', // Default: 7 days
})); 