import { Module } from '@nestjs/common';
import { SetController } from './set.controller';
import { SetService } from './set.service';
import { Set } from './entities/set.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Set])],
  controllers: [SetController],
  providers: [SetService],
})
export class SetsModule {}
