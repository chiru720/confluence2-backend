export interface HealthCheckResult {
  status: string;
  timestamp: string;
  uptime: number;
  version: string;
  environment: string;
  details?: {
    [key: string]: {
      status: string;
      responseTime?: number;
      error?: string;
    };
  };
} 