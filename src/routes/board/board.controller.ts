import { ApiTags } from '@nestjs/swagger';
import { BoardService } from './board.service';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { CreateBoardDto } from './dto/create-board.dto';
import { UpdateBoardDto } from './dto/update-board.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { UserInfo } from 'src/decorators/user-info.decorator';

@Controller('board')
@ApiTags('board')
export class BoardController {
  constructor(private readonly boardService: BoardService) {}
  // board
  @Get()
  findAll() {
    return this.boardService.findAll();
  }

  @Get(':id')
  find(@Param('id', ParseIntPipe) id: number) {
    return this.boardService.find(id);
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@UserInfo() userInfo, @Body('content') content, @Body('title') title) {
    console.log(userInfo);
    return this.boardService.create({
      content,
      title,
      userId: userInfo.id,
    });
  }

  @UseGuards(JwtAuthGuard)
  @Put(':id')
  async update(
    @UserInfo() userInfo,
    @Body(new ValidationPipe()) data: UpdateBoardDto,
    @Param('id', ParseIntPipe) id: number,
  ) {
    console.log(userInfo);
    const board = await this.boardService.find(id);
    if (userInfo.id !== board.userId) {
      return '주인이 아닙니다.';
    }
    return this.boardService.update(data, id);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async remove(@UserInfo() userInfo, @Param('id', ParseIntPipe) id: number) {
    const board = await this.boardService.find(id);
    if (userInfo.id !== board.userId) {
      return '주인이 아닙니다.';
    }
    return this.boardService.delete(id);
  }
}
