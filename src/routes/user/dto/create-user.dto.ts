import { ApiProperty } from '@nestjs/swagger';
import { MaxLength, MinLength, IsNotEmpty, IsNumber } from 'class-validator';

export class CreateUserDto {
  @IsNumber()
  @IsNotEmpty()
  @ApiProperty({
    description: 'DB 유저 아이디',
    required: true,
    example: '1',
  })
  id: number;

  @ApiProperty({
    description: '유저 ID',
    required: true,
    example: 'ididid',
  })
  @IsNotEmpty()
  @MinLength(4)
  @MaxLength(20)
  username: string;

  @ApiProperty({
    description: '비밀번호',
    required: true,
    example: '123123',
  })
  @IsNotEmpty()
  @MinLength(6)
  @MaxLength(20)
  password: string;

  @ApiProperty({
    description: '유저 이름',
    required: true,
    example: '홍길동',
  })
  @IsNotEmpty()
  @MinLength(2)
  @MaxLength(4)
  name: string;
}
