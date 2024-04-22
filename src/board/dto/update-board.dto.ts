import { IsNotEmpty, IsOptional, MaxLength, MinLength } from 'class-validator';

export class UpdateBoardDto {
    @MaxLength(20)
    @MinLength(2)
    @IsOptional()
    title: string;

    @IsOptional()
    content: string;
}