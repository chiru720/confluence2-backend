import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { ConfigModule as AppConfigModule } from '../../config/config.module';
import { ConfigService } from '../../config/config.service';
import { DatabaseService } from './database.service';

@Module({
  imports: [
    AppConfigModule,
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule, AppConfigModule],
      useFactory: async (configService: ConfigService) => {
        const dbService = new DatabaseService(configService);
        const options = dbService.getDatabaseOptions();
        
        // Log whether synchronization is enabled
        if (options.synchronize) {
          console.warn('⚠️ TypeORM synchronization is enabled! This should only be used during development.');
        }
        
        return options;
      },
      inject: [ConfigService],
    }),
  ],
  providers: [DatabaseService],
  exports: [DatabaseService],
})
export class DatabaseModule {} 