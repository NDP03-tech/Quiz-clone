/* eslint-disable @typescript-eslint/no-unsafe-call */
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm'; // Thêm OneToMany
import { Set } from 'src/modules/sets/entities/set.entity'; // Cần import Entity Set
import { Progress } from 'src/modules/progress/entities/progress.entity';

export enum UserRole {
  ADMIN = 'admin',
  USER = 'user',
}

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true, length: 100 })
  email: string;

  @Column({ select: false })
  password: string;

  @Column({ type: 'enum', enum: UserRole, default: UserRole.USER })
  role: UserRole;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @OneToMany(() => Set, (set) => set.creator) // set.creator là thuộc tính trong Set Entity
  sets: Set[];

  // 2. Quan hệ với Progress (User có nhiều bản ghi tiến độ)
  @OneToMany(() => Progress, (progress) => progress.user) // progress.user là thuộc tính trong Progress Entity
  progress: Progress[];
}
