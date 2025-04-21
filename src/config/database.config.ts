import { registerAs } from '@nestjs/config';
import { DATABASE_DEFAULT } from '../common/constants/db.constants';

export default registerAs('database', () => {
  // Parse synchronize with a strict check to default to false
  const synchronize = process.env.DATABASE_SYNCHRONIZE === 'true';
  
  return {
    url: process.env.DATABASE_URL,
    host: process.env.DATABASE_HOST || DATABASE_DEFAULT.HOST,
    port: process.env.DATABASE_PORT ? parseInt(process.env.DATABASE_PORT, 10) : DATABASE_DEFAULT.PORT,
    username: process.env.DATABASE_USERNAME || DATABASE_DEFAULT.USERNAME,
    password: process.env.DATABASE_PASSWORD || DATABASE_DEFAULT.PASSWORD,
    name: process.env.DATABASE_NAME || DATABASE_DEFAULT.NAME,
    synchronize, // Use the parsed value
    logging: process.env.DATABASE_LOGGING === 'true',
  };
}); 