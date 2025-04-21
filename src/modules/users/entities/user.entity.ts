import { Column, Entity } from 'typeorm';
import { BaseEntity } from '../../../core/database/entities/base.entity';

export enum UserRole {
  ADMIN = 'admin',
  EDITOR = 'editor',
  VIEWER = 'viewer',
}

@Entity('users')
export class User extends BaseEntity {
  @Column({ unique: true })
  email: string;

  @Column()
  name: string;

  @Column({ nullable: true })
  avatarUrl?: string;

  @Column({
    type: 'enum',
    enum: UserRole,
    default: UserRole.VIEWER,
  })
  role: UserRole;

  @Column({ default: false })
  isActive: boolean;

  @Column({ nullable: true })
  googleId?: string;
} 