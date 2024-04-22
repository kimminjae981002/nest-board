import { ApiTags } from '@nestjs/swagger';
import { BoardService } from './board.service';
import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, ValidationPipe } from '@nestjs/common';
import { CreateBoardDto } from './dto/create-board.dto';
import { UpdateBoardDto } from './dto/update-board.dto';

@Controller('board')
@ApiTags('board')
export class BoardController {
    constructor(private readonly boardService: BoardService){}
    // board
    @Get()
    findAll() {
        return this.boardService.findAll();
    }

    @Get(':id')
    find(@Param('id', ParseIntPipe )id: number) {
        return this.boardService.find(id);
    }

    @Post()
    create(@Body(new ValidationPipe()) data: CreateBoardDto) {
        return this.boardService.create(data);
    }

    @Put(':id')
    update(@Body(new ValidationPipe()) data: UpdateBoardDto, @Param('id', ParseIntPipe)id: number) {
        return this.boardService.update(data,id)
    }

    @Delete(':id')
    remove(@Param('id', ParseIntPipe) id: number) {
        return this.boardService.delete(id)
    }
}
