import { ApiProperty } from '@nestjs/swagger';
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Board } from '../../board/entities/board.entity';

@Entity({ name: 'user' })
export class User {
  @PrimaryGeneratedColumn() // 자동적으로 숫자가 증가한다.
  id: number;

  @ApiProperty({ description: '유저아이디', example: 'admin' })
  @Column({ unique: true })
  username: string;

  @ApiProperty({ description: '유저비밀번호', example: 'password' })
  @Column() // {select: false} select로 가져올 수 없음
  password: string;

  @ApiProperty({ description: '이름', example: '홍길동' })
  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  phoneNumber: string;

  @UpdateDateColumn() // 수정됐을 때의 시간
  updatedAt: Date;

  @CreateDateColumn() // 생성됐을 떄의 시간
  createdAt: Date;

  @ApiProperty({ description: '유저' })
  // 하나의 user는 여러 개의 board를 가질 수 있다.
  @OneToMany(() => Board, (board) => board.user) // board entity에 user와 관계 설정
  boards: Board[]; // user entity에 boards 속성 정의 - 배열로 가진다.

  // sql 쿼리문을 이용해서 컬럼 설정
  @Column({ select: false, nullable: true, insert: false, update: false })
  boardCount?: number;
}
