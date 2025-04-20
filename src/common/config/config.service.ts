import { Injectable } from '@nestjs/common';
import { ConfigService as NestConfigService } from '@nestjs/config';

@Injectable()
export class ConfigService {
  constructor(private configService: NestConfigService) {}

  get nodeEnv(): string {
    return this.configService.get<string>('NODE_ENV') || 'development';
  }

  get port(): number {
    return parseInt(this.configService.get<string>('PORT') || '3333', 10);
  }

  get apiPrefix(): string {
    return this.configService.get<string>('API_PREFIX') || 'api';
  }

  get apiVersion(): string {
    return this.configService.get<string>('API_VERSION') || 'v1';
  }

  get jwtSecret(): string {
    return this.configService.get<string>('JWT_SECRET') || 'default_jwt_secret';
  }

  get jwtExpiresIn(): string {
    return this.configService.get<string>('JWT_EXPIRES_IN') || '1d';
  }

  get jwtRefreshExpiresIn(): string {
    return this.configService.get<string>('JWT_REFRESH_EXPIRES_IN') || '7d';
  }

  // Add more getters for other environment variables as needed

  get isDevelopment(): boolean {
    return this.nodeEnv === 'development';
  }

  get isProduction(): boolean {
    return this.nodeEnv === 'production';
  }

  get isTest(): boolean {
    return this.nodeEnv === 'test';
  }
} 