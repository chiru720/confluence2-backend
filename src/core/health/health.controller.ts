import { Controller, Get } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { HealthService } from './health.service';
import { HealthCheckResult } from './interfaces/health-check-result.interface';
import { SWAGGER_CONFIG } from '../../common/constants';

@ApiTags('Health')
@Controller('health')
export class HealthController {
  constructor(private readonly healthService: HealthService) {}

  @Get()
  @ApiOperation({ summary: 'Get API health status' })
  @ApiResponse({
    status: 200,
    description: 'Health check successful',
    schema: {
      example: {
        status: 'ok',
        timestamp: new Date().toISOString(),
        uptime: 1234,
        version: SWAGGER_CONFIG.VERSION,
        environment: 'development',
        details: {
          api: {
            status: 'up',
            responseTime: 0.45
          },
          database: {
            status: 'up',
            responseTime: 2.21
          }
        }
      }
    }
  })
  async check(): Promise<HealthCheckResult> {
    return this.healthService.check();
  }
} 