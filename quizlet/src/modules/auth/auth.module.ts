import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersModule } from 'src/modules/users/users.module';

@Module({
  imports: [
    // ... TypeORM config,
    UsersModule, // Đăng ký Users Module
  ],
  providers: [AuthService],
  controllers: [AuthController],
})
export class AuthModule {}
