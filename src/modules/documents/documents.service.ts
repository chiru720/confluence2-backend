import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { Document } from './entities/document.entity';
import { CreateDocumentDto } from './dto/create-document.dto';
import { UpdateDocumentDto } from './dto/update-document.dto';

@Injectable()
export class DocumentsService {
  // Mock data to simulate database storage
  private documents: Document[] = [];

  async create(createDocumentDto: CreateDocumentDto, userId: string): Promise<Document> {
    const newDocument: Document = {
      id: Date.now().toString(),
      title: createDocumentDto.title,
      content: createDocumentDto.content,
      type: createDocumentDto.type,
      ownerId: userId,
      collaborators: createDocumentDto.collaborators || [],
      tags: createDocumentDto.tags || [],
      isPublic: createDocumentDto.isPublic || false,
      parentId: createDocumentDto.parentId,
      spaceId: createDocumentDto.spaceId,
      createdAt: new Date(),
      updatedAt: new Date(),
      version: 1
    };

    this.documents.push(newDocument);
    return newDocument;
  }

  async findAll(userId: string): Promise<Document[]> {
    // Return documents that the user has access to (owned, collaborator, or public)
    return this.documents.filter(doc => 
      doc.ownerId === userId || 
      doc.collaborators?.includes(userId) || 
      doc.isPublic
    );
  }

  async findOne(id: string, userId: string): Promise<Document> {
    const document = this.documents.find(doc => doc.id === id);
    
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
    const documentIndex = this.documents.findIndex(doc => doc.id === id);
    
    if (documentIndex === -1) {
      throw new NotFoundException(`Document with ID ${id} not found`);
    }

    const document = this.documents[documentIndex];

    // Only owner can update the document
    if (document.ownerId !== userId) {
      throw new ForbiddenException('Only the owner can update this document');
    }

    const updatedDocument = {
      ...document,
      ...updateDocumentDto,
      updatedAt: new Date(),
      version: document.version + 1
    };

    this.documents[documentIndex] = updatedDocument;
    return updatedDocument;
  }

  async remove(id: string, userId: string): Promise<void> {
    const documentIndex = this.documents.findIndex(doc => doc.id === id);
    
    if (documentIndex === -1) {
      throw new NotFoundException(`Document with ID ${id} not found`);
    }

    const document = this.documents[documentIndex];

    // Only owner can delete the document
    if (document.ownerId !== userId) {
      throw new ForbiddenException('Only the owner can delete this document');
    }

    this.documents.splice(documentIndex, 1);
  }

  async findByTags(tags: string[], userId: string): Promise<Document[]> {
    // Find documents that have at least one of the specified tags
    // and that the user has access to
    return this.documents.filter(doc => 
      (doc.tags?.some(tag => tags.includes(tag))) && 
      (doc.ownerId === userId || doc.collaborators?.includes(userId) || doc.isPublic)
    );
  }
} 