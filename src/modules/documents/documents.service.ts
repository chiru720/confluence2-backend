import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, In } from 'typeorm';
import { Document } from './entities/document.entity';
import { CreateDocumentDto } from './dto/create-document.dto';
import { UpdateDocumentDto } from './dto/update-document.dto';

@Injectable()
export class DocumentsService {
  constructor(
    @InjectRepository(Document)
    private documentRepository: Repository<Document>
  ) {}

  async create(createDocumentDto: CreateDocumentDto, userId: string): Promise<Document> {
    const newDocument = this.documentRepository.create({
      ...createDocumentDto,
      ownerId: userId,
      version: 1
    });

    return this.documentRepository.save(newDocument);
  }

  async findAll(userId: string): Promise<Document[]> {
    // Return documents that the user has access to (owned, collaborator, or public)
    return this.documentRepository.find({
      where: [
        { ownerId: userId },
        { collaborators: userId },
        { isPublic: true }
      ]
    });
  }

  async findOne(id: string, userId: string): Promise<Document> {
    const document = await this.documentRepository.findOne({
      where: { id }
    });
    
    if (!document) {
      throw new NotFoundException(`Document with ID ${id} not found`);
    }

    // Check if user has access to this document
    if (document.ownerId !== userId && 
        !document.collaborators?.includes(userId) && 
        !document.isPublic) {
      throw new ForbiddenException('You do not have access to this document');
    }

    return document;
  }

  async update(id: string, updateDocumentDto: UpdateDocumentDto, userId: string): Promise<Document> {
    const document = await this.findOne(id, userId);

    // Only owner can update the document
    if (document.ownerId !== userId) {
      throw new ForbiddenException('Only the owner can update this document');
    }

    const updatedDocument = {
      ...document,
      ...updateDocumentDto,
      version: document.version + 1
    };

    return this.documentRepository.save(updatedDocument);
  }

  async remove(id: string, userId: string): Promise<void> {
    const document = await this.findOne(id, userId);

    // Only owner can delete the document
    if (document.ownerId !== userId) {
      throw new ForbiddenException('Only the owner can delete this document');
    }

    await this.documentRepository.remove(document);
  }

  async findByTags(tags: string[], userId: string): Promise<Document[]> {
    // Find documents that have at least one of the specified tags
    // and that the user has access to
    return this.documentRepository
      .createQueryBuilder('document')
      .where('document.ownerId = :userId', { userId })
      .orWhere('document.collaborators LIKE :userId', { userId: `%${userId}%` })
      .orWhere('document.isPublic = :isPublic', { isPublic: true })
      .andWhere(qb => {
        const conditions = tags.map((tag, index) => {
          return `document.tags LIKE :tag${index}`;
        });
        return conditions.join(' OR ');
      })
      .setParameters(
        tags.reduce((params, tag, index) => {
          params[`tag${index}`] = `%${tag}%`;
          return params;
        }, {})
      )
      .getMany();
  }
} 