import { registerAs } from '@nestjs/config';
import { API_DEFAULT } from '../common/constants';

export default registerAs('app', () => ({
  nodeEnv: process.env.NODE_ENV || 'development',
  port: process.env.PORT ? parseInt(process.env.PORT, 10) : API_DEFAULT.PORT,
  apiPrefix: process.env.API_PREFIX || API_DEFAULT.PREFIX,
  apiVersion: process.env.API_VERSION || API_DEFAULT.VERSION,
})); 