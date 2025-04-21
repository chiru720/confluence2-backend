import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from './config/config.module';
import { DatabaseModule } from './core/database/database.module';
import { HealthModule } from './core/health/health.module';
import { DocumentsModule } from './modules/documents/documents.module';

// Import Users module conditionally to prevent errors if it doesn't exist yet
let UsersModule;
try {
  UsersModule = require('./modules/users/users.module').UsersModule;
} catch (e) {
  console.warn('UsersModule not found, skipping import');
}

@Module({
  imports: [
    // Core modules first
    ConfigModule,
    DatabaseModule,
    HealthModule,
    // Feature modules next
    DocumentsModule,
    ...(UsersModule ? [UsersModule] : []),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
