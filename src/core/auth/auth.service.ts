import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { UsersService } from '../../modules/users/users.service';
import { JwtPayload } from './interfaces/jwt-payload.interface';
import { GoogleUser } from './interfaces/google-user.interface';
import { AUTH_CONSTANTS } from '../../common/constants';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
    private readonly usersService: UsersService,
  ) {}

  /**
   * Validate the Google OAuth user and return a JWT token
   */
  async validateGoogleUser(profile: GoogleUser): Promise<{ token: string; user: any }> {
    // Check if user exists in the database
    let user = await this.usersService.findByEmail(profile.email);

    // If user doesn't exist, create a new one
    if (!user) {
      user = await this.usersService.createFromGoogle({
        email: profile.email,
        firstName: profile.firstName,
        lastName: profile.lastName,
        profilePicture: profile.picture,
        googleId: profile.googleId,
      });
    } else {
      // Update the user's Google information
      user = await this.usersService.updateGoogleInfo(user.id, {
        googleId: profile.googleId,
        profilePicture: profile.picture,
      });
    }

    // Generate JWT token
    const token = this.generateToken(user);

    return { token, user };
  }

  /**
   * Generate a JWT token for the given user
   */
  generateToken(user: any): string {
    const payload: JwtPayload = {
      sub: user.id,
      email: user.email,
    };

    return this.jwtService.sign(payload);
  }

  /**
   * Validate a user from JWT payload
   */
  async validateJwtUser(payload: JwtPayload): Promise<any> {
    // Ensure we're working with a string ID
    const userId = typeof payload.sub === 'string' ? payload.sub : String(payload.sub);
    
    const user = await this.usersService.findById(userId);

    if (!user) {
      throw new UnauthorizedException('User not found');
    }

    return user;
  }
} 