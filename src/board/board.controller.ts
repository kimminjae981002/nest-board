import { Controller, Get, Param } from '@nestjs/common';

@Controller('board')
export class BoardController {

    // board
    @Get()
    findAll() {
        return 'findAll'
    }

    @Get(':id')
    find(@Param('id')id: string): string {
        return `${id}`
    }
}
