// src/flashcards/entities/flashcard.entity.ts
import { Set } from 'src/modules/sets/entities/set.entity';
import { Progress } from 'src/modules/progress/entities/progress.entity'; // Cần thêm Progress
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  OneToMany,
} from 'typeorm';

@Entity('flashcards')
export class Flashcard {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  // Khóa ngoại (cột dữ liệu)
  @Column()
  setId: string;

  // Nội dung cốt lõi, bắt buộc phải có
  @Column({ nullable: false, length: 500 })
  term: string;

  // Nội dung cốt lõi, bắt buộc phải có
  @Column({ nullable: false, length: 500 })
  definition: string;

  // Thứ tự hiển thị thẻ
  @Column({ default: 0 })
  order: number;

  // --- QUAN HỆ VỚI SET ---
  // Many Flashcards thuộc về ONE Set
  @ManyToOne(() => Set, (set) => set.flashcards)
  @JoinColumn({ name: 'setId' }) // Sửa lỗi cú pháp, dùng { name: 'setId' }
  set: Set; // Đổi tên thành 'set' thay vì 'sets' để phản ánh mối quan hệ Many-to-One

  // --- QUAN HỆ VỚI PROGRESS ---
  // ONE Flashcard có nhiều bản ghi Progress từ nhiều người dùng
  @OneToMany(() => Progress, (progress) => progress.card)
  progress: Progress[];
}
