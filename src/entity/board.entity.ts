import { Column, CreateDateColumn, Entity, PrimaryColumn, UpdateDateColumn } from 'typeorm';

@Entity()
export class Board {

    @PrimaryColumn({name: 'id'}) // 기본키이다.
    id: number;

    @Column() // 일반 컬럼
    title: string;

    @Column() // 일반 컬럼
    content: string;

    @UpdateDateColumn() // 수정됐을 때의 시간
    updateAt: Date;

    @CreateDateColumn() // 생성됐을 떄의 시간
    createdAt: Date;
}