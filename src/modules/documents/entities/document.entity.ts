import { ApiProperty } from '@nestjs/swagger';

export class Document {
  @ApiProperty({ description: 'Unique identifier for the document' })
  id: string;

  @ApiProperty({ description: 'Document title' })
  title: string;

  @ApiProperty({ description: 'Document content' })
  content: string;

  @ApiProperty({ description: 'Document type (e.g., note, wiki, etc.)' })
  type: string;

  @ApiProperty({ description: 'Owner/creator of the document' })
  ownerId: string;

  @ApiProperty({ description: 'When the document was created' })
  createdAt: Date;

  @ApiProperty({ description: 'When the document was last updated' })
  updatedAt: Date;

  @ApiProperty({ description: 'List of user IDs who can access this document' })
  collaborators?: string[];

  @ApiProperty({ description: 'Tags associated with the document' })
  tags?: string[];

  @ApiProperty({ description: 'Whether the document is public or private' })
  isPublic: boolean;

  @ApiProperty({ description: 'Parent document ID (for hierarchical structure)' })
  parentId?: string;

  @ApiProperty({ description: 'Space/project the document belongs to' })
  spaceId?: string;

  @ApiProperty({ description: 'Document version number' })
  version: number;
}