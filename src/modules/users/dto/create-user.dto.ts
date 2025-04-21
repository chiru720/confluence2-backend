import { IsEmail, IsEnum, IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { UserRole } from '../entities/user.entity';

export class CreateUserDto {
  @ApiProperty({ description: 'User\'s email address' })
  @IsEmail()
  email: string;

  @ApiProperty({ description: 'User\'s full name' })
  @IsString()
  name: string;

  @ApiProperty({ description: 'User\'s profile picture URL', required: false })
  @IsString()
  @IsOptional()
  avatarUrl?: string;

  @ApiProperty({ description: 'User\'s role', enum: UserRole, default: UserRole.VIEWER })
  @IsEnum(UserRole)
  @IsOptional()
  role?: UserRole;

  @ApiProperty({ description: 'Google ID for OAuth login', required: false })
  @IsString()
  @IsOptional()
  googleId?: string;
}