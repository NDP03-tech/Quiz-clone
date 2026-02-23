import { IsString, IsNotEmpty, MaxLength } from 'class-validator';

export class CreateSetDto {
  @IsString({ message: 'Title phải là chuỗi' })
  @IsNotEmpty({ message: 'Title không được để trống' })
  @MaxLength(255, { message: 'Title không được vượt quá 255 ký tự' })
  title: string;
  @IsString({ message: 'Description phải là chuỗi' })
  @IsNotEmpty({ message: 'Description không được để trống' })
  description: string;
}
