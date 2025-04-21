import { Injectable } from '@nestjs/common';
import { ConfigService as NestConfigService } from '@nestjs/config';

@Injectable()
export class ConfigService {
  constructor(private configService: NestConfigService) {}

  get<T = any>(key: string, defaultValue?: T): T {
    const value = this.configService.get<T>(key);
    return (value !== undefined ? value : defaultValue) as T;
  }

  get nodeEnv(): string {
    return this.get<string>('app.nodeEnv', 'development');
  }

  get isDevelopment(): boolean {
    return this.nodeEnv === 'development';
  }

  get isProduction(): boolean {
    return this.nodeEnv === 'production';
  }

  get isTest(): boolean {
    return this.nodeEnv === 'test';
  }

  get port(): number {
    return this.get<number>('app.port', 3001);
  }

  get apiPrefix(): string {
    return this.get<string>('app.apiPrefix', 'api');
  }

  get apiVersion(): string {
    return this.get<string>('app.apiVersion', 'v1');
  }

  get databaseUrl(): string | undefined {
    return this.get<string>('database.url');
  }

  get databaseHost(): string {
    return this.get<string>('database.host', 'localhost');
  }

  get databasePort(): number {
    return this.get<number>('database.port', 5432);
  }

  get databaseUsername(): string {
    return this.get<string>('database.username', 'postgres');
  }

  get databasePassword(): string {
    return this.get<string>('database.password', 'postgres');
  }

  get databaseName(): string {
    return this.get<string>('database.name', 'confluence');
  }

  get jwtSecret(): string | undefined {
    return this.get<string>('jwt.secret');
  }

  get jwtExpiresIn(): number {
    return this.get<number>('jwt.expiresIn', 3600);
  }
} 