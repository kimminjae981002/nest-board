import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';


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
}