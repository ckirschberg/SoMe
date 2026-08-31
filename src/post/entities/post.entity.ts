import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from 'typeorm';

// The model of MVC: this class IS the table. @Entity names it, @Column marks
// the fields TypeORM maps, and synchronize creates it from what it reads here.
//
// Careful: this class is called Post, and so is the @Post() route decorator in
// @nestjs/common. They never meet - the controller imports the decorator, the
// service imports the entity - but a file needing both must alias one of them.
@Entity('posts')
export class Post {
    // the database hands out ids now, so the old nextId counter is gone
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @Column()
    body: string;

    @Column()
    author: string;

    // set by the database on insert - the service never assigns it
    @CreateDateColumn()
    created_at: Date;
}
