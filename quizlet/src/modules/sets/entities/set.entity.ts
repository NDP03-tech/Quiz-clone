// src/sets/entities/set.entity.ts
import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm';
import { User } from 'src/modules/users/entities/user.entity'; // Cần import User Entity
import { Flashcard } from 'src/modules/flashcards/entities/flashcard.entity';

@Entity('sets') // Nên dùng số nhiều và viết thường cho tên bảng
export class Set {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  // Tiêu đề Set: Bắt buộc và giới hạn độ dài
  @Column({ length: 255 })
  title: string;

  // Mô tả Set: Bắt buộc
  @Column()
  description: string;

  // Khóa ngoại đến User (Admin đã tạo Set này)
  @Column()
  creatorId: string; // Đây vẫn là cột lưu trữ ID

  // --- QUAN HỆ CỦA SET ---

  // Quan hệ: Nhiều Set thuộc về MỘT User (Người tạo)
  // Đây là cách đúng để định nghĩa Foreign Key trong TypeORM
  @ManyToOne(() => User, (user) => user.sets)
  @JoinColumn({ name: 'creatorId' })
  creator: User;

  // Quan hệ: MỘT Set có nhiều Flashcard
  @OneToMany(() => Flashcard, (flashcard) => flashcard.set)
  flashcards: Flashcard[];

  // Thời gian tạo
  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;
}
