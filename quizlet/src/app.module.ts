// src/app.module.ts (ĐÃ SỬA LỖI)

import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './modules/auth/auth.module';
import { UsersModule } from './modules/users/users.module'; // Giữ lại import này
import { SetsModule } from './modules/sets/sets.module';
import { FlashcardsModule } from './modules/flashcards/flashcards.module';
import { BrowseModule } from './modules/browse/browse.module';
import { ProgressModule } from './modules/progress/progress.module';
// XÓA: import { UsersController } from './users/users.controller';
// XÓA: import { UsersService } from './users/users.service';
import { StudyModesModule } from './modules/study-modes/study-modes.module';
import { QuestionsModule } from './modules/questions/questions.module';
import { RecommendationModule } from './modules/recommendation/recommendation.module';
import { AnalyticsModule } from './modules/analytics/analytics.module';
import { CoreModule } from './core/core.module';

@Module({
  imports: [
    // RẤT QUAN TRỌNG: Bạn cũng cần TypeOrmModule.forRoot() ở đây để cung cấp DataSource
    // Giả sử TypeOrmModule.forRoot đã được cấu hình trong AppModules hoặc ConfigModule
    AuthModule,
    UsersModule, // Đã được import
    SetsModule,
    FlashcardsModule,
    BrowseModule,
    ProgressModule,
    StudyModesModule,
    QuestionsModule,
    RecommendationModule,
    AnalyticsModule,
    CoreModule,
  ],
  // CHỈ GIỮ LẠI CÁC THÀNH PHẦN CỦA APP MODULE
  controllers: [AppController], // <-- XÓA UsersController
  providers: [AppService], // <-- XÓA UsersService
})
export class AppModule {}
