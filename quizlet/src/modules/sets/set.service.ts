import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Set } from './entities/set.entity';
import { Repository } from 'typeorm';
import { CreateSetDto } from './dto/create-set.dto';
import { UpdateSetDto } from './dto/update-set.dto';

@Injectable()
export class SetService {
  constructor(
    @InjectRepository(Set)
    private setRepo: Repository<Set>,
  ) {}

  async findAllSet(): Promise<Set[]> {
    return await this.setRepo.find();
  }
  async findByTitle(title: string): Promise<Set | null> {
    return await this.setRepo.findOne({ where: { title } });
  }
  async createSet(createDto: CreateSetDto): Promise<Set> {
    const existingTitle = await this.findByTitle(createDto.title);
    if (existingTitle) {
      throw new Error('Title da duoc dat ');
    }
    try {
      const newUser = this.setRepo.create(createDto);
      return this.setRepo.save(newUser);
    } catch (error) {
      console.error('Lỗi khi tạo set:', error);
      throw new Error('Không thể tạo set do lỗi hệ thống.');
    }
  }

  async updateSet(updateDto: UpdateSetDto, id: string): Promise<Set | null> {
    const existingSet = await this.setRepo.findOne({ where: { id } });
    if (!existingSet) {
      throw new NotFoundException(`Không tìm thấy Set với ID ${id}`);
    }

    // 2. Nếu có title mới trong updateDto, kiểm tra xem title đó
    // có bị trùng với title của Set KHÁC hay không
    if (updateDto.title && updateDto.title !== existingSet.title) {
      const titleExists = await this.setRepo.findOne({
        where: { title: updateDto.title },
      });
      if (titleExists) {
        throw new ConflictException(
          `Title '${updateDto.title}' đã được sử dụng bởi Set khác.`,
        );
      }
    }

    // 3. Cập nhật dữ liệu
    // TypeORM merge() giúp gộp dữ liệu updateDto vào existingSet
    this.setRepo.merge(existingSet, updateDto);

    // 4. Lưu thay đổi vào DB và trả về Set đã cập nhật
    return this.setRepo.save(existingSet);
  }

  async delete(id: string): Promise<void> {
    const existingSet = await this.setRepo.findOne({ where: { id } });
    if (!existingSet) {
      throw new ConflictException('Khong tim thay Set');
    }
    try {
      this.setRepo.delete(id);
      console.log('====================================');
      console.log(`Da xoa thanh cong {$id}`);
      console.log('====================================');
    } catch (error) {
      console.error('Lỗi khi tạo set:', error);
    }
  }
}
