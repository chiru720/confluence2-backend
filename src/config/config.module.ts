import { Module, Global } from '@nestjs/common';
import { ConfigModule as NestConfigModule } from '@nestjs/config';
import { ConfigService } from './config.service';
import { validate } from './validation.schema';
import databaseConfig from './database.config';
import jwtConfig from './jwt.config';
import appConfig from './app.config';
import googleConfig from './google.config';
import frontendConfig from './frontend.config';

@Global()
@Module({
  imports: [
    NestConfigModule.forRoot({
      isGlobal: true,
      load: [databaseConfig, jwtConfig, appConfig, googleConfig, frontendConfig],
      validate,
      envFilePath: ['.env', '.env.development', '.env.production'],
    }),
  ],
  providers: [ConfigService],
  exports: [ConfigService],
})
export class ConfigModule {} 