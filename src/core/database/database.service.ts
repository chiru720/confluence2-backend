import { Injectable } from '@nestjs/common';
import { ConfigService } from '../../config/config.service';

@Injectable()
export class DatabaseService {
  constructor(private configService: ConfigService) {}

  /**
   * Get database connection options as an object
   */
  getDatabaseOptions() {
    const dbUrl = this.configService.databaseUrl;
    const nodeEnv = this.configService.nodeEnv;
    
    // Force synchronize to false in production
    const shouldSynchronize = 
      nodeEnv !== 'production' && 
      this.configService.get('database.synchronize', false);
    
    const baseOptions = {
      type: 'postgres' as const,
      entities: [__dirname + '/../../**/*.entity{.ts,.js}'],
      migrations: [__dirname + '/migrations/**/*{.ts,.js}'],
      migrationsRun: false, // We'll run migrations manually with migration:run script
      synchronize: shouldSynchronize, // Explicitly set based on environment
      logging: this.configService.get('database.logging', false),
    };

    // If URL is provided, use it, otherwise use individual config parameters
    if (dbUrl) {
      return { 
        ...baseOptions,
        url: dbUrl 
      };
    }

    return {
      ...baseOptions,
      host: this.configService.databaseHost,
      port: this.configService.databasePort,
      username: this.configService.databaseUsername,
      password: this.configService.databasePassword,
      database: this.configService.databaseName,
    };
  }
} 