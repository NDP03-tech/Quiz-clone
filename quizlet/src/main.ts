import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
// 1. Import ValidationPipe
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // 2. Kích hoạt Global Validation Pipe
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true, // Tự động chuyển đổi kiểu dữ liệu DTO
      whitelist: true, // Loại bỏ các thuộc tính không định nghĩa trong DTO
      // forbidNonWhitelisted: true, // (Tùy chọn) Báo lỗi nếu client gửi trường lạ
    }),
  );

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
