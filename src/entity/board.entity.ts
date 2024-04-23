import { ApiProperty } from '@nestjs/swagger';
import { Column, CreateDateColumn, Entity, PrimaryColumn, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

@Entity() // {name: simple_board} 테이블 명 수정 가능
export class Board {

    @PrimaryGeneratedColumn({name: 'id'}) // 기본키이다. 자동적으로 숫자가 증가한다.
    id: number;

    @ApiProperty({ description: 'user_id' }) // userid 외래키
    @Column() // {name: simple_board} 컬럼 명 수정 가능
    userId: number

    @ApiProperty({description: '게시글 제목', example: '제목입니다.'})
    @Column() // 일반 컬럼
    title: string;

    @ApiProperty({description: '게시글 내용', example: '내용입니다.'})
    @Column() // 일반 컬럼
    content: string;

    @UpdateDateColumn() // 수정됐을 때의 시간
    updateAt: Date;

    @CreateDateColumn() // 생성됐을 떄의 시간
    createdAt: Date;
}