import { ApiProperty } from '@nestjs/swagger';
import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { DocumentPermission } from '../../../common/constants';

@Entity('documents')
export class Document {
  @ApiProperty({ description: 'Unique identifier for the document' })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({ description: 'Document title' })
  @Column()
  title: string;

  @ApiProperty({ description: 'Document content' })
  @Column({ type: 'text' })
  content: string;

  @ApiProperty({ description: 'Document type (e.g., note, wiki, etc.)' })
  @Column()
  type: string;

  @ApiProperty({ description: 'Owner/creator of the document' })
  @Column({ name: 'owner_id' })
  ownerId: string;

  @ApiProperty({ description: 'When the document was created' })
  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @ApiProperty({ description: 'When the document was last updated' })
  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @ApiProperty({ description: 'List of user IDs who can access this document' })
  @Column({ type: 'simple-array', nullable: true })
  collaborators?: string[];

  @ApiProperty({ description: 'Tags associated with the document' })
  @Column({ type: 'simple-array', nullable: true })
  tags?: string[];

  @ApiProperty({ description: 'Whether the document is public or private' })
  @Column({ name: 'is_public', default: false })
  isPublic: boolean;

  @ApiProperty({ description: 'Parent document ID (for hierarchical structure)' })
  @Column({ name: 'parent_id', nullable: true })
  parentId?: string;

  @ApiProperty({ description: 'Space/project the document belongs to' })
  @Column({ name: 'space_id', nullable: true })
  spaceId?: string;

  @ApiProperty({ description: 'Document version number' })
  @Column({ default: 1 })
  version: number;
}