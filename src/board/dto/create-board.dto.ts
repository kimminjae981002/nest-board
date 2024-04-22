import { ApiProperty } from '@nestjs/swagger';
import { MaxLength, MinLength, IsNotEmpty, isNotEmpty } from 'class-validator';

export class CreateBoardDto {
    
    @ApiProperty({
        description: '제목',
        required: true,
        example: '제목을 입력해주세요.'
    })
    @IsNotEmpty()
    @MinLength(2)
    @MaxLength(20)
    title: string;

    @ApiProperty({
        description: '내용',
        required: true,
        example: '내용을 입력해주세요.'
    })
    @IsNotEmpty()
    content: string;
}