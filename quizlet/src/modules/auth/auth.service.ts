// src/auth/auth.service.ts
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from 'src/modules/users/users.service';
import { JwtService } from '@nestjs/jwt';
import { User, UserRole } from 'src/modules/users/entities/user.entity'; // Thêm UserRole
import * as bcrypt from 'bcrypt';
// Import DTOs cần thiết (Giả định đã tạo)
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';

const SALT_ROUNDS = 10;

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  // --- HASHING ---
  private async hashPassword(password: string): Promise<string> {
    return await bcrypt.hash(password, SALT_ROUNDS);
  }

  // --- SO SÁNH MẬT KHẨU ---
  private async comparePassword(
    password: string,
    hash: string,
  ): Promise<boolean> {
    return await bcrypt.compare(password, hash);
  }

  // --- TẠO TOKEN ---
  private generateToken(user: User): { accessToken: string } {
    const payload = {
      id: user.id,
      role: user.role,
    };

    return {
      accessToken: this.jwtService.sign(payload, { subject: user.id }),
    };
  }

  // ------------------------------------------
  // 1. CHỨC NĂNG ĐĂNG KÝ (REGISTER)
  // ------------------------------------------
  async register(registerDto: RegisterDto): Promise<User> {
    // 1. Kiểm tra email đã tồn tại chưa
    const existingUser = await this.usersService.findByEmail(registerDto.email);
    if (existingUser) {
      throw new UnauthorizedException('Email đã được sử dụng.');
    }

    // 2. Hash mật khẩu trước khi lưu (NẾU KHÔNG DÙNG ENTITY HOOKS)
    const hashedPassword = await this.hashPassword(registerDto.password);

    // 3. Chuẩn bị dữ liệu cho việc tạo User
    const userData = {
      ...registerDto,
      password: hashedPassword, // Sử dụng mật khẩu đã hash
      role: UserRole.USER, // Mặc định vai trò là User
    };

    // 4. Gọi UsersService để tạo User mới
    return this.usersService.create(userData);
  }

  // ------------------------------------------
  // 2. CHỨC NĂNG ĐĂNG NHẬP (LOGIN)
  // ------------------------------------------
  async login(loginDto: LoginDto): Promise<{ accessToken: string }> {
    // 1. Tìm User bằng EMAIL (cần lấy cả password)
    // Lưu ý: findByEmail trong UsersService phải đảm bảo trả về cả trường password (dù nó select: false)
    const user = await this.usersService.findByEmail(loginDto.email);

    if (!user) {
      throw new UnauthorizedException('Thông tin đăng nhập không hợp lệ.');
    }

    // 2. So sánh mật khẩu
    const isMatch = await this.comparePassword(
      loginDto.password,
      user.password,
    );

    if (!isMatch) {
      throw new UnauthorizedException('Thông tin đăng nhập không hợp lệ.');
    }

    // 3. Tạo token
    return this.generateToken(user);
  }
}
