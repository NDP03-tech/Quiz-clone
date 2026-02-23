// src/auth/guards/jwt-auth.guard.ts
import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

// Kế thừa AuthGuard và chỉ định sử dụng strategy có tên là 'jwt'
@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {}
