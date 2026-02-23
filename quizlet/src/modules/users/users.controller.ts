// src/users/users.controller.ts
import { Controller, Get, UseGuards, Request, Body, Put } from '@nestjs/common';
import { UsersService } from './users.service';
import { JwtAuthGuard } from 'src/modules/auth/jwt-auth.guard'; // Giả định đã tạo guard
import { User } from './entities/user.entity';

@Controller('users')
// Áp dụng bảo vệ chung: Mọi request trong controller này đều cần đăng nhập
@UseGuards(JwtAuthGuard)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('me')
  async getProfile(@Request() req): Promise<User> {
    const userId = req.user.id;
    // Gọi Service để lấy thông tin chi tiết
    return this.usersService.getProfile(userId);
  }

  /**
   * Endpoint 2: Cập nhật hồ sơ của người dùng hiện tại
   * PUT /users/me
   */
  @Put('me')
  async updateProfile(
    @Request() req,
    @Body() updateDto: any, // Thay 'any' bằng UpdateUserDto
  ): Promise<User> {
    const userId = req.user.id;

    // Gọi Service để cập nhật
    return this.usersService.updateProfile(userId, updateDto);
  }
}
