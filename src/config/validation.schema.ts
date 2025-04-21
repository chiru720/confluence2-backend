import * as Joi from 'joi';
import { API_DEFAULT, DATABASE_DEFAULT } from '../common/constants';

export const validate = (config: Record<string, unknown>) => {
  const schema = Joi.object({
    NODE_ENV: Joi.string()
      .valid('development', 'production', 'test')
      .default('development'),
    PORT: Joi.number().default(API_DEFAULT.PORT),
    
    // Database
    DATABASE_URL: Joi.string().optional(),
    DATABASE_HOST: Joi.string().default(DATABASE_DEFAULT.HOST),
    DATABASE_PORT: Joi.number().default(DATABASE_DEFAULT.PORT),
    DATABASE_USERNAME: Joi.string().default(DATABASE_DEFAULT.USERNAME),
    DATABASE_PASSWORD: Joi.string().default(DATABASE_DEFAULT.PASSWORD),
    DATABASE_NAME: Joi.string().default(DATABASE_DEFAULT.NAME),
    DATABASE_SYNCHRONIZE: Joi.boolean().default(DATABASE_DEFAULT.SYNCHRONIZE),
    DATABASE_LOGGING: Joi.boolean().default(DATABASE_DEFAULT.LOGGING),
    
    // JWT
    JWT_SECRET: Joi.string().default('development_secret_key_replace_in_production'),
    JWT_EXPIRES_IN: Joi.string().default('1d'),
    JWT_REFRESH_EXPIRES_IN: Joi.string().default('7d'),
    
    // API
    API_PREFIX: Joi.string().default(API_DEFAULT.PREFIX),
    API_VERSION: Joi.string().default(API_DEFAULT.VERSION),
  });

  const { error, value } = schema.validate(config, {
    allowUnknown: true,
    abortEarly: false,
  });

  if (error) {
    throw new Error(`Validation error: ${error.message}`);
  }

  return value;
}; 