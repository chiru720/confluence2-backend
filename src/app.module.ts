import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from './config/config.module';
import { DatabaseModule } from './core/database/database.module';
import { HealthModule } from './core/health/health.module';
import { DocumentsModule } from './modules/documents/documents.module';
import { UsersModule } from './modules/users/users.module';

// Import Auth module conditionally to prevent errors if it doesn't exist yet
let AuthModule;
try {
  AuthModule = require('./core/auth/auth.module').AuthModule;
} catch (e) {
  console.warn('AuthModule not found, skipping import');
}

@Module({
  imports: [
    // Core modules first
    ConfigModule,
    DatabaseModule,
    HealthModule,
    // Feature modules next
    DocumentsModule,
    UsersModule,
    ...(AuthModule ? [AuthModule] : []),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
