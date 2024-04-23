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
import { User } from '../user/entities/user.entity';
import { Board } from './entities/board.entity';

@Injectable()
export class BoardService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(Board)
    private boardRepository: Repository<Board>,
  ) {}

  private boards = [
    {
      id: 1,
      title: 'hello world',
      content: 'content 1',
    },
    {
      id: 2,
      title: 'hello world',
      content: 'content 2',
    },
    {
      id: 3,
      title: 'hello world',
      content: 'content 3',
    },
  ];

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

  // 다음 id
  getNextId() {
    const next = this.boards.length + 1;

    return next;
  }

  // 게시글 수정
  update(data: UpdateBoardDto, id: number) {
    const index = this.boards.findIndex((board) => board.id === id);

    if (index !== -1) {
      this.boards[index] = {
        ...this.boards[index], // 기존 요소의 속성을 복사
        ...data, // 새로운 데이터를 덮어씀
      };
      return this.boards[index];
    } else {
      return null; // 해당 id를 가진 요소를 찾지 못한 경우 null 반환 또는 에러 처리
    }
  }

  // 게시글 삭제
  delete(id: number) {
    const index = this.boards.findIndex((board) => board.id === id);

    if (index !== -1) {
      this.boards.splice(index, 1);
      return '삭제';
    } else {
      return null;
    }
  }
}
