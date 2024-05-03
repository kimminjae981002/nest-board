import { Test, TestingModule } from '@nestjs/testing';
import { BoardService } from './board.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Board } from './entities/board.entity';
import { Repository } from 'typeorm';

describe('BoardService', () => {
  let boardService: BoardService;
  let boardRepository: Repository<Board>;
  // 테스트할 때는 실제 db를 사용하지 않아서 목데이터를 만들어야한다.
  const boardRepositoryToken = getRepositoryToken(Board);

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      // 목데이터 생성
      providers: [
        BoardService,
        {
          provide: boardRepositoryToken,
          useValue: {
            create: jest.fn(),
            save: jest.fn(),
            findOne: jest.fn(),
            findOneBy: jest.fn(),
          },
        },
      ],
    }).compile();

    boardService = module.get<BoardService>(BoardService);
    boardRepository = module.get<Repository<Board>>(boardRepositoryToken);
  });

  it('should be defined', () => {
    expect(boardService).toBeDefined();
  });

  it('boardRepository should be defined', () => {
    expect(boardRepository).toBeDefined();
  });

  describe('게시글 조회', () => {
    // 실제 db를 사용하지 못하기 때문에 데이터를 인위적으로 만들어줘야한다.
    it('9번 게시글의 작성자는 동길홍이다', async () => {
      jest.spyOn(boardRepository, 'findOneBy').mockResolvedValue({
        id: 9,
        userId: 9,
        user: {
          id: 9,
          username: 'wwww',
          name: '동길홍',
        },
        content: 'asdasd',
      } as Board);
      const board = await boardService.getBoardById(9);
      console.log(board);
      expect(board.user.name).toBe('동길홍');
    });
  });
});
