import { IsBoolean, IsEmail, IsEnum, IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { UserRole } from '../entities/user.entity';

export class UpdateUserDto {
  @ApiProperty({ description: 'User\'s email address', required: false })
  @IsEmail()
  @IsOptional()
  email?: string;

  @ApiProperty({ description: 'User\'s full name', required: false })
  @IsString()
  @IsOptional()
  name?: string;

  @ApiProperty({ description: 'User\'s profile picture URL', required: false })
  @IsString()
  @IsOptional()
  avatarUrl?: string;

  @ApiProperty({ description: 'User\'s role', enum: UserRole, required: false })
  @IsEnum(UserRole)
  @IsOptional()
  role?: UserRole;

  @ApiProperty({ description: 'Whether the user is active', required: false })
  @IsBoolean()
  @IsOptional()
  isActive?: boolean;
} 