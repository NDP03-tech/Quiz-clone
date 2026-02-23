import { Flashcard } from 'src/modules/flashcards/entities/flashcard.entity';
import { User } from 'src/modules/users/entities/user.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
// Không cần import { timestamp } từ 'rxjs';

export enum UserStaus {
  // Nên đổi tên thành ProgressStatus cho rõ ràng
  LEARNING = 'learning',
  MASTERED = 'mastered',
}

@Entity('progresses') // Sửa lỗi chính tả và dùng số nhiều
export class Progress {
  // Sửa lỗi chính tả
  @PrimaryGeneratedColumn('uuid')
  id: string;

  // Khóa ngoại (Dữ liệu thô)
  @Column()
  userId: string;

  // Khóa ngoại (Dữ liệu thô)
  @Column()
  cardId: string;

  // Sửa lỗi cú pháp: Dùng giá trị Enum trực tiếp
  @Column({ type: 'enum', enum: UserStaus, default: UserStaus.LEARNING })
  status: UserStaus;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  // --- QUAN HỆ VỚI USER ---
  // Sửa lỗi tham chiếu: Phải trỏ đến thuộc tính quan hệ (ví dụ: user.progress) trong User Entity
  @ManyToOne(() => User, (user) => user.progress)
  @JoinColumn({ name: 'userId' })
  user: User;

  // --- QUAN HỆ VỚI FLASHCARD ---
  // Sửa lỗi tham chiếu: Phải trỏ đến thuộc tính quan hệ (ví dụ: flashcard.progress) trong Flashcard Entity
  // Sửa lỗi cú pháp: 'cardId' phải là chuỗi
  @ManyToOne(() => Flashcard, (flashcard) => flashcard.progress)
  @JoinColumn({ name: 'cardId' })
  card: Flashcard;
}
