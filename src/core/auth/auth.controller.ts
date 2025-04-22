import { Controller, Get, Req, Res, UseGuards, Logger } from '@nestjs/common';
import { Response } from 'express';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { ConfigService } from '@nestjs/config';
import { AuthService } from './auth.service';
import { AUTH_CONSTANTS } from '../../common/constants';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  private readonly logger = new Logger(AuthController.name);

  constructor(
    private readonly authService: AuthService,
    private readonly configService: ConfigService,
  ) {}

  @ApiOperation({ summary: 'Initiate Google OAuth login' })
  @ApiResponse({ status: 302, description: 'Redirect to Google authentication page' })
  @Get(AUTH_CONSTANTS.ROUTES.GOOGLE_AUTH)
  @UseGuards(AuthGuard(AUTH_CONSTANTS.STRATEGIES.GOOGLE))
  googleAuth() {
    // This route initiates the Google OAuth flow
    // The actual redirect happens in the AuthGuard
    return { message: 'Google authentication initiated' };
  }

  @ApiOperation({ summary: 'Google OAuth callback' })
  @ApiResponse({ status: 302, description: 'Redirect to frontend with authentication token' })
  @Get(AUTH_CONSTANTS.ROUTES.GOOGLE_CALLBACK)
  @UseGuards(AuthGuard(AUTH_CONSTANTS.STRATEGIES.GOOGLE))
  googleAuthCallback(@Req() req: any, @Res() res: Response) {
    try {
      if (!req.user) {
        this.logger.error('No user data received from Google OAuth');
        return res.redirect(`${this.configService.get('frontend.url')}/auth/error?message=Authentication failed`);
      }

      const { user, token } = req.user;
      const frontendUrl = this.configService.get<string>('frontend.url');
      
      if (!frontendUrl) {
        this.logger.error('Frontend URL is not configured');
        return res.status(500).json({ message: 'Server configuration error' });
      }
      
      // Redirect to frontend with the token
      this.logger.log(`Redirecting to: ${frontendUrl}/${AUTH_CONSTANTS.ROUTES.CALLBACK_PATH}?token=${token}`);
      return res.redirect(`${frontendUrl}/${AUTH_CONSTANTS.ROUTES.CALLBACK_PATH}?token=${token}`);
    } catch (error) {
      this.logger.error(`Error in Google callback: ${error.message}`, error.stack);
      const frontendUrl = this.configService.get<string>('frontend.url', 'http://localhost:3000');
      return res.redirect(`${frontendUrl}/auth/error?message=Authentication failed`);
    }
  }

  @ApiOperation({ summary: 'Get current user profile' })
  @ApiResponse({ 
    status: 200, 
    description: 'Returns the current authenticated user profile' 
  })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @Get(AUTH_CONSTANTS.ROUTES.PROFILE)
  @UseGuards(AuthGuard(AUTH_CONSTANTS.STRATEGIES.JWT))
  getProfile(@Req() req: any) {
    // The user is automatically added to the request by the JwtStrategy
    return req.user;
  }
} 