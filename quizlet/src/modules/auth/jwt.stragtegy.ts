// src/auth/jwt.strategy.ts

import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt'; // <-- LỖI 1: Thêm import Strategy và ExtractJwt
import { UsersService } from 'src/modules/users/users.service'; // <-- LỖI 2: Sửa đường dẫn gốc (Nếu UsersModule được export đúng)

export interface JwtPayload {
  id: string;
  role: string;
}

@Injectable()
// Sử dụng Strategy đã import
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private usersService: UsersService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.JWT_SECRET || 'YOUR_STRONG_SECRET',
      ignoreExpiration: false,
    });
  }

  async validate(payload: JwtPayload): Promise<any> {
    const user = await this.usersService.findById(payload.id);

    if (!user) {
      // Lỗi 3: Nếu user không tồn tại, throw UnauthorizedException
      throw new UnauthorizedException('Token is valid but user was not found');
    }
    return {
      id: user.id,
      email: user.email,
      role: user.role,
    };
  }
}
