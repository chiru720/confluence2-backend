import 'dotenv/config';
import { DataSource, DataSourceOptions } from 'typeorm';
import { join } from 'path';
import { DATABASE_DEFAULT } from '../../common/constants/db.constants';

// Load environment variables with fallbacks
const envVars = {
  database: {
    url: process.env.DATABASE_URL,
    host: process.env.DATABASE_HOST || DATABASE_DEFAULT.HOST,
    port: process.env.DATABASE_PORT ? parseInt(process.env.DATABASE_PORT) : DATABASE_DEFAULT.PORT,
    username: process.env.DATABASE_USERNAME || DATABASE_DEFAULT.USERNAME,
    password: process.env.DATABASE_PASSWORD || DATABASE_DEFAULT.PASSWORD,
    name: process.env.DATABASE_NAME || DATABASE_DEFAULT.NAME,
    synchronize: false,
    logging: process.env.DATABASE_LOGGING === 'true',
  },
};

export const dataSourceOptions: DataSourceOptions = {
  type: 'postgres',
  host: envVars.database.host,
  port: envVars.database.port,
  username: envVars.database.username,
  password: envVars.database.password,
  database: envVars.database.name,
  entities: [join(__dirname, '../../**/*.entity{.ts,.js}')],
  migrations: [join(__dirname, './migrations/**/*{.ts,.js}')],
  synchronize: false,
  logging: envVars.database.logging,
};

// Use URL connection if provided
if (envVars.database.url) {
  Object.assign(dataSourceOptions, {
    url: envVars.database.url,
    host: undefined,
    port: undefined,
    username: undefined,
    password: undefined,
    database: undefined,
  });
}

const dataSource = new DataSource(dataSourceOptions);

export default dataSource; 