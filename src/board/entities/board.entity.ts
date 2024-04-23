import { ApiProperty } from '@nestjs/swagger';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { User } from '../../user/entities/user.entity';

@Entity() // {name: simple_board} 테이블 명 수정 가능
export class Board {
  @PrimaryGeneratedColumn({ name: 'id' }) // 기본키이다. 자동적으로 숫자가 증가한다.
  id: number;

  @ApiProperty({ description: 'user_id' }) // userid 외래키
  @Column() // {name: simple_board} 컬럼 명 수정 가능
  userId: number;

  @ApiProperty({ description: '게시글 제목', example: '제목입니다.' })
  @Column() // 일반 컬럼
  title: string;

  @ApiProperty({ description: '게시글 내용', example: '내용입니다.' })
  @Column() // 일반 컬럼
  content: string;

  @UpdateDateColumn() // 수정됐을 때의 시간
  updateAt: Date;

  @CreateDateColumn() // 생성됐을 떄의 시간
  createdAt: Date;

  @ApiProperty({ description: '작성한 게시글' })
  // 여러 개의 board는 하나의 user를 받는다.
  @ManyToOne(() => User)
  @JoinColumn({ name: 'userId' }) // userId를 이용해 join을 해준다. board의 userId와 user의
  user: User; // user는 User entity
}
