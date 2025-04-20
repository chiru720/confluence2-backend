import { ApiProperty } from '@nestjs/swagger';

export class User {
  @ApiProperty({ description: 'Unique identifier' })
  id: string;

  @ApiProperty({ description: 'User\'s first name' })
  firstName: string;

  @ApiProperty({ description: 'User\'s last name' })
  lastName: string;

  @ApiProperty({ description: 'User\'s email address' })
  email: string;

  @ApiProperty({ description: 'User\'s password (hashed)' })
  password?: string;

  @ApiProperty({ description: 'User\'s profile picture URL' })
  profilePicture?: string;

  @ApiProperty({ description: 'User\'s role (admin, user)' })
  role: string;

  @ApiProperty({ description: 'When the user was created' })
  createdAt: Date;

  @ApiProperty({ description: 'When the user was last updated' })
  updatedAt: Date;

  @ApiProperty({ description: 'When the user last logged in' })
  lastLoginAt?: Date;

  @ApiProperty({ description: 'Whether the user is active' })
  isActive: boolean;

  // For OAuth
  @ApiProperty({ description: 'Google ID for OAuth' })
  googleId?: string;
} 