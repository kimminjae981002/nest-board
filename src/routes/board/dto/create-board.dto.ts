import { ApiProperty } from '@nestjs/swagger';
import {
  MaxLength,
  MinLength,
  IsNotEmpty,
  isNotEmpty,
  IsNumber,
} from 'class-validator';

export class CreateBoardDto {
  @IsNumber()
  @IsNotEmpty()
  @ApiProperty({
    description: '작성자 아이디',
    required: true,
    example: '1',
  })
  userId: number;

  @ApiProperty({
    description: '제목',
    required: true,
    example: '제목을 입력해주세요.',
  })
  @IsNotEmpty()
  @MinLength(2)
  @MaxLength(20)
  title: string;

  @ApiProperty({
    description: '내용',
    required: true,
    example: '내용을 입력해주세요.',
  })
  @IsNotEmpty()
  content: string;
}
