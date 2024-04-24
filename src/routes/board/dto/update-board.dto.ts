import { PartialType, PickType } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, MaxLength, MinLength } from 'class-validator';
import { CreateBoardDto } from './create-board.dto';

export class UpdateBoardDto {
    @MaxLength(20)
    @MinLength(2)
    @IsOptional()
    title: string;

    @IsOptional()
    content: string;
}


// createboarddto에 상속한다. class-validator까지 상속받음
// export class UpdateBoardDto extends PartialType(CreateBoardDto) {
//     @MaxLength(20)
//     @MinLength(2)
//     @IsOptional()
//     title: string;

//     @IsOptional()
//     content: string;
// }


// name필드만 받아온다.
// export class UpdateBoardDto extends PickType(CreateBoardDto,['name']) {
    //     @MaxLength(20)
    //     @MinLength(2)
    //     @IsOptional()
    //     title: string;
    
    //     @IsOptional()
    //     content: string;
// }
    
// name필드만 제거하고 나머지를 가져온다.
// export class UpdateBoardDto extends OmitType(CreateBoardDto,['name']) {
    //     @MaxLength(20)
    //     @MinLength(2)
    //     @IsOptional()
    //     title: string;
    
    //     @IsOptional()
    //     content: string;
    // }