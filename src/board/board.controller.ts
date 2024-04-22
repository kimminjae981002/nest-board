import { BoardService } from './board.service';
import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';

@Controller('board')
export class BoardController {
    constructor(private readonly boardService: BoardService){}
    // board
    @Get()
    findAll() {
        return this.boardService.findAll();
    }

    @Get(':id')
    find(@Param('id')id: number) {
        return `find id: ${id}`
    }

    @Post()
    create(@Body() data) {
        return 'create'
    }

    @Put(':id')
    update(@Body() data, @Param('id')id: number) {
        return 'update'
    }

    @Delete(':id')
    remove(@Param('id') id: number) {
        return 'delete'
    }
}
