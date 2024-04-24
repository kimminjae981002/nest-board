import { ApiProperty } from '@nestjs/swagger';
import { MaxLength, MinLength, IsNotEmpty } from 'class-validator';

export class SigninUserDto {
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
}
