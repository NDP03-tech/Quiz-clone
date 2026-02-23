import { PartialType } from '@nestjs/mapped-types';
import { CreateSetDto } from './create-set.dto';
import { IsString, MaxLength } from 'class-validator';

// PartialType biến tất cả các trường trong CreateSetDto thành optional
export class UpdateSetDto extends PartialType(CreateSetDto) {
  // Có thể thêm các rules override nếu cần
  @IsString()
  @MaxLength(255)
  // title đã kế thừa các validator từ CreateSetDto nhưng trở thành optional
  title?: string;
  @IsString()
  // description đã kế thừa các validator từ CreateSetDto nhưng trở thành optional
  description?: string;
}
