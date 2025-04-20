import { Controller, Get, Post, Body, Patch, Param, Delete, HttpStatus } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiQuery } from '@nestjs/swagger';
import { DocumentsService } from './documents.service';
import { CreateDocumentDto } from './dto/create-document.dto';
import { UpdateDocumentDto } from './dto/update-document.dto';
import { Document } from './entities/document.entity';

@ApiTags('documents')
@Controller('documents')
export class DocumentsController {
  constructor(private readonly documentsService: DocumentsService) {}

  // For now, we'll use a mock user ID
  private mockUserId = '12345';

  @Post()
  @ApiOperation({ summary: 'Create a new document' })
  @ApiResponse({ status: HttpStatus.CREATED, description: 'Document created successfully', type: Document })
  async create(@Body() createDocumentDto: CreateDocumentDto): Promise<Document> {
    return this.documentsService.create(createDocumentDto, this.mockUserId);
  }

  @Get()
  @ApiOperation({ summary: 'Get all accessible documents' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Returns all accessible documents', type: [Document] })
  async findAll(): Promise<Document[]> {
    return this.documentsService.findAll(this.mockUserId);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get document by ID' })
  @ApiParam({ name: 'id', description: 'Document ID' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Returns the document', type: Document })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'Document not found' })
  async findOne(@Param('id') id: string): Promise<Document> {
    return this.documentsService.findOne(id, this.mockUserId);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a document' })
  @ApiParam({ name: 'id', description: 'Document ID' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Document updated successfully', type: Document })
  async update(
    @Param('id') id: string,
    @Body() updateDocumentDto: UpdateDocumentDto,
  ): Promise<Document> {
    return this.documentsService.update(id, updateDocumentDto, this.mockUserId);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a document' })
  @ApiParam({ name: 'id', description: 'Document ID' })
  @ApiResponse({ status: HttpStatus.NO_CONTENT, description: 'Document deleted successfully' })
  async remove(@Param('id') id: string): Promise<void> {
    return this.documentsService.remove(id, this.mockUserId);
  }
} 