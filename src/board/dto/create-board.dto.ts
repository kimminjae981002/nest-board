import { MaxLength, MinLength, IsNotEmpty } from 'class-validator';

export class CreateBoardDto {
    
    @IsNotEmpty()
    @MinLength(2)
    @MaxLength(20)
    title: string;
    content: string;
}