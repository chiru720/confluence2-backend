import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsBoolean, IsOptional, IsString } from 'class-validator';

export class UpdateDocumentDto {
  @ApiProperty({ description: 'Document title', required: false })
  @IsString()
  @IsOptional()
  title?: string;

  @ApiProperty({ description: 'Document content', required: false })
  @IsString()
  @IsOptional()
  content?: string;

  @ApiProperty({ description: 'Document type (e.g., note, wiki, etc.)', required: false })
  @IsString()
  @IsOptional()
  type?: string;

  @ApiProperty({ description: 'List of user IDs who can access this document', required: false })
  @IsArray()
  @IsOptional()
  collaborators?: string[];

  @ApiProperty({ description: 'Tags associated with the document', required: false })
  @IsArray()
  @IsOptional()
  tags?: string[];

  @ApiProperty({ description: 'Whether the document is public or private', required: false })
  @IsBoolean()
  @IsOptional()
  isPublic?: boolean;

  @ApiProperty({ description: 'Parent document ID (for hierarchical structure)', required: false })
  @IsString()
  @IsOptional()
  parentId?: string;

  @ApiProperty({ description: 'Space/project the document belongs to', required: false })
  @IsString()
  @IsOptional()
  spaceId?: string;
}