import {
  Injectable,
  Delete,
  Inject,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { CreateBoardDto } from './dto/create-board.dto';
import { UpdateBoardDto } from './dto/update-board.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Board } from './entities/board.entity';

@Injectable()
export class BoardService {
  constructor(
    @InjectRepository(Board)
    private boardRepository: Repository<Board>,
  ) {}
  // 게시글 전체 찾기
  async findAll() {
    const boards = await this.boardRepository.find({
      //   where: {}, // 조건
      //   select: {}, // 데이터 필드 선택 조건
      // relations: {user: true}, // join할 수 있따.
    });

    if (!boards) {
      throw new HttpException('NotFound', HttpStatus.NOT_FOUND);
    }

    return boards;
  }

  // 상세 게시글 찾기
  async find(id: number) {
    // findOne은 where이 필요하다.
    // findOneBy는 where이 포함되어있다.
    const board = await this.boardRepository.findOne({
      where: { id },
      relations: { user: true },
    });

    if (!board) {
      throw new HttpException('NotFound', HttpStatus.NOT_FOUND);
    }

    return board;
  }

  // 게시글 생성
  async create(data: CreateBoardDto) {
    // 인스턴스만 생성하고 db에 저장하지는 않는다.
    const board = await this.boardRepository.create(data);

    // 실제 db에 저장한다.
    await this.boardRepository.save(board);

    return board;
  }

  // 게시글 수정
  async update(data: UpdateBoardDto, id: number) {
    const board = await this.boardRepository.findOneBy({ id });

    if (!board) {
      throw new HttpException('NotFound', HttpStatus.NOT_FOUND);
    }

    await this.boardRepository.update(id, { ...data });
  }

  // 게시글 삭제
  async delete(id: number) {
    const board = await this.boardRepository.findOneBy({ id });

    if (!board) {
      throw new HttpException('NotFound', HttpStatus.NOT_FOUND);
    }

    await this.boardRepository.delete({ id });
  }

  async getBoardById(id: number) {
    return this.boardRepository.findOneBy({
      id,
    });
  }
}
