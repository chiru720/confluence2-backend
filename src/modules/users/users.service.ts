import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  // Mock data to simulate database storage
  private users: User[] = [];

  async create(createUserDto: CreateUserDto): Promise<User> {
    const newUser: User = {
      id: Date.now().toString(),
      firstName: createUserDto.firstName,
      lastName: createUserDto.lastName,
      email: createUserDto.email,
      password: createUserDto.password, // Note: In a real app, this would be hashed
      profilePicture: createUserDto.profilePicture,
      role: 'user', // Default role
      createdAt: new Date(),
      updatedAt: new Date(),
      isActive: true,
    };

    this.users.push(newUser);
    return this.sanitizeUser(newUser);
  }

  async findAll(): Promise<User[]> {
    return this.users.map(user => this.sanitizeUser(user));
  }

  async findOne(id: string): Promise<User> {
    const user = this.users.find(user => user.id === id);
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    return this.sanitizeUser(user);
  }

  async findByEmail(email: string): Promise<User | null> {
    const user = this.users.find(user => user.email === email);
    return user ? this.sanitizeUser(user) : null;
  }

  async update(id: string, updateUserDto: UpdateUserDto): Promise<User> {
    const userIndex = this.users.findIndex(user => user.id === id);
    if (userIndex === -1) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }

    const updatedUser = {
      ...this.users[userIndex],
      ...updateUserDto,
      updatedAt: new Date(),
    };

    this.users[userIndex] = updatedUser;
    return this.sanitizeUser(updatedUser);
  }

  async remove(id: string): Promise<void> {
    const userIndex = this.users.findIndex(user => user.id === id);
    if (userIndex === -1) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }

    this.users.splice(userIndex, 1);
  }

  // Remove sensitive information before returning user data
  private sanitizeUser(user: User): User {
    const { password, ...result } = user;
    return result as User;
  }
} 