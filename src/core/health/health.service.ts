import { Injectable } from '@nestjs/common';
import { HealthCheckResult } from './interfaces/health-check-result.interface';
import { InjectDataSource } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { ConfigService } from '../../config/config.service';

@Injectable()
export class HealthService {
  constructor(
    @InjectDataSource() private dataSource: DataSource,
    private configService: ConfigService
  ) {}

  async check(): Promise<HealthCheckResult> {
    const startTime = performance.now();
    const version = process.env.npm_package_version || this.configService.get('SWAGGER_CONFIG.VERSION', '1.0.0');
    const environment = this.configService.nodeEnv;
    const uptime = process.uptime();

    // Check database connection
    let dbStatus: 'up' | 'down' = 'down';
    let dbResponseTime = 0;
    
    try {
      if (this.dataSource && this.dataSource.isInitialized) {
        const dbStartTime = performance.now();
        await this.dataSource.query('SELECT 1');
        dbResponseTime = this.calculateResponseTime(dbStartTime);
        dbStatus = 'up';
      } else {
        console.warn('Database connection is not initialized');
      }
    } catch (error) {
      console.error('Database health check failed:', error);
    }

    return {
      status: dbStatus === 'up' ? 'ok' : 'error',
      timestamp: new Date().toISOString(),
      uptime,
      version,
      environment,
      details: {
        api: {
          status: 'up',
          responseTime: this.calculateResponseTime(startTime)
        },
        database: {
          status: dbStatus,
          responseTime: dbResponseTime
        }
      }
    };
  }

  private calculateResponseTime(startTime: number): number {
    return parseFloat((performance.now() - startTime).toFixed(2));
  }
} 