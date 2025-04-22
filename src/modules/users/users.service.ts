import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

interface GoogleUserData {
  email: string;
  firstName: string;
  lastName: string;
  profilePicture?: string;
  googleId: string;
}

interface GoogleUpdateData {
  googleId: string;
  profilePicture?: string;
}

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async findAll(): Promise<User[]> {
    return this.usersRepository.find();
  }

  async findOne(id: string): Promise<User> {
    const user = await this.usersRepository.findOneBy({ id });
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    return user;
  }

  async findById(id: string): Promise<User | null> {
    return this.usersRepository.findOneBy({ id });
  }

  async findByEmail(email: string): Promise<User | null> {
    return this.usersRepository.findOneBy({ email });
  }

  async findByGoogleId(googleId: string): Promise<User | null> {
    return this.usersRepository.findOneBy({ googleId });
  }

  async create(createUserDto: CreateUserDto): Promise<User> {
    const user = this.usersRepository.create(createUserDto);
    return this.usersRepository.save(user);
  }

  async createFromGoogle(googleUserData: GoogleUserData): Promise<User> {
    const user = this.usersRepository.create({
      email: googleUserData.email,
      name: `${googleUserData.firstName} ${googleUserData.lastName}`,
      avatarUrl: googleUserData.profilePicture,
      googleId: googleUserData.googleId,
      isActive: true,
    });
    return this.usersRepository.save(user);
  }

  async update(id: string, updateUserDto: UpdateUserDto): Promise<User> {
    await this.usersRepository.update(id, updateUserDto);
    return this.findOne(id);
  }

  async updateGoogleInfo(id: string, data: GoogleUpdateData): Promise<User> {
    await this.usersRepository.update(id, {
      googleId: data.googleId,
      avatarUrl: data.profilePicture || undefined,
    });
    return this.findOne(id);
  }

  async remove(id: string): Promise<void> {
    await this.usersRepository.delete(id);
  }
} 