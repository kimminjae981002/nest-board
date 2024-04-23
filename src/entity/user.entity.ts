import { Column, Entity, PrimaryColumn } from 'typeorm';


@Entity()
export class User{
    
    @PrimaryColumn()
    id: number;

    @Column({unique: true})
    username: string;

    @Column({select:false})
    password: string;

    @Column()
    name: string;
}