import { ApiProperty } from '@nestjs/swagger';
import {
  MaxLength,
  MinLength,
  IsNotEmpty,
  IsEmail,
  IsPhoneNumber,
} from 'class-validator';

export class CreateUserDto {
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
  @MaxLength(10)
  name: string;

  @ApiProperty({
    description: '유저 이메일',
    required: true,
    example: '123@123.com',
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    description: '유저 핸드폰 번호',
    required: true,
    example: '010123123',
  })
  @IsPhoneNumber('KR') // 나라마다 전화번호 형식이 다르기 때문에 설정을 해둔다.
  phoneNumber: string;
}
