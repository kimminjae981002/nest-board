import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, OneToMany, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';
import { Board } from './board.entity';


@Entity()
export class User{
    
    @PrimaryGeneratedColumn() // 자동적으로 숫자가 증가한다.
    id: number;

    @ApiProperty({description: '유저아이디', example: 'admin'})
    @Column({unique: true})
    username: string;

    @ApiProperty({description: '유저비밀번호', example: 'password'})
    @Column({select:false})
    password: string;

    @ApiProperty({description: '이름', example: '홍길동'})
    @Column()
    name: string;

    @ApiProperty({description: '유저'})
    // 하나의 user는 여러 개의 board를 가질 수 있다.
    @OneToMany(()=> Board, (board)=> board.user)  // board entity에 user와 관계 설정
    boards: Board[] // user entity에 boards 속성 정의 - 배열로 가진다.
}