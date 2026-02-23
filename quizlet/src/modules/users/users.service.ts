import { User, UserRole } from './entities/user.entity';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

// --- ĐỊNH NGHĨA DTOS NGAY TRONG FILE SERVICE ---

// 🎯 DTO cho việc tạo mới User
interface CreateUserDto {
  email: string;
  password: string;
  role?: UserRole;
}

// 🎯 DTO cho việc cập nhật User
interface UpdateUserDto {
  email?: string;
  password?: string;
  // Thêm các trường khác có thể cập nhật
}

// ----------------------------------------------

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepo: Repository<User>,
  ) {}

  async findAll(): Promise<User[]> {
    return this.userRepo.find();
  }

  async findByEmail(email: string): Promise<User | null> {
    return this.userRepo.findOne({
      where: { email },
      select: ['id', 'email', 'password', 'role', 'createdAt'],
    });
  }

  // SỬA: Dùng CreateUserDto đã định nghĩa
  async create(createUserDto: CreateUserDto): Promise<User> {
    const existingUser = await this.findByEmail(createUserDto.email);

    if (existingUser) {
      throw new Error('Email da duoc su dung');
    }

    try {
      const newUser = this.userRepo.create(createUserDto);
      return this.userRepo.save(newUser);
    } catch (error) {
      console.error('Lỗi khi tạo user:', error);
      throw new Error('Không thể tạo người dùng do lỗi hệ thống.');
    }
  }

  async findById(id: string): Promise<User> {
    const user = await this.userRepo.findOne({ where: { id } });
    if (!user) {
      throw new NotFoundException(`User with ID:${id} can't found`);
    }
    return user;
  }

  async getProfile(id: string): Promise<User> {
    return this.findById(id);
  }

  // SỬA: Dùng UpdateUserDto đã định nghĩa
  async updateProfile(id: string, updateDto: UpdateUserDto): Promise<User> {
    const user = await this.findById(id);

    this.userRepo.merge(user, updateDto);
    return this.userRepo.save(user);
  }

  async updateRole(id: string, newRole: UserRole): Promise<User> {
    const user = await this.findById(id);

    user.role = newRole;
    return this.userRepo.save(user);
  }
}
