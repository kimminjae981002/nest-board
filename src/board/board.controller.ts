import { ApiTags } from '@nestjs/swagger';
import { BoardService } from './board.service';
import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { CreateBoardDto } from './dto/create-board.dto';

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
    find(@Param('id', )id: number) {
        return this.boardService.find(+id);
    }

    @Post()
    create(@Body() data: CreateBoardDto) {
        return this.boardService.create(data);
    }

    @Put(':id')
    update(@Body() data: CreateBoardDto, @Param('id')id: number) {
        return this.boardService.update(data,+id)
    }

    @Delete(':id')
    remove(@Param('id') id: number) {
        return this.boardService.delete(+id)
    }
}
