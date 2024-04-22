import { Injectable, Delete } from '@nestjs/common';
import { CreateBoardDto } from './dto/create-board.dto';

@Injectable()
export class BoardService {
    private boards = [
        {
            id: 1,
            title: 'hello world',
            content: 'content 1'
        },
        {
            id: 2,
            title: 'hello world',
            content: 'content 2'
        },
        {
            id: 3,
            title: 'hello world',
            content: 'content 3'
        },
    ]

    // 게시글 전체 찾기
    findAll() {
        return this.boards;
    }
    
    // 상세 게시글 찾기
    find(id: number) {
        const index = this.boards.findIndex((board) => {
         return  board.id === id
        });

        return this.boards[index]
    }


    // 게시글 생성
    create(data: CreateBoardDto) {
        const newBoard = {
            id: this.getNextId(), ...data
        };

        this.boards.push(newBoard);

        return newBoard;
    }

    // 다음 id
    getNextId() {
        const next = this.boards.length + 1;

        return next
    }

    // 게시글 수정
    update(data: CreateBoardDto, id: number) {
        const index = this.boards.findIndex((board) => board.id === id);
    
        if (index !== -1) {
            this.boards[index] = {
                ...this.boards[index], // 기존 요소의 속성을 복사
                ...data // 새로운 데이터를 덮어씀
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
            return '삭제'
        } else {
            return null;
        }

    }
    
}
