import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Post } from './entities/post.entity';
import { CreatePostDto } from './dtos/create-post.dto';
import { UpdatePostDto } from './dtos/update-post.dto';

@Injectable()
export class PostService {
    // The repository replaces the private array. Same method names as the
    // in-memory version - only the storage behind them changed. Nest builds
    // the repository from the entity registered with forFeature in the module;
    // there is no `new`, and no connection code here.
    constructor(
        @InjectRepository(Post)
        private readonly posts: Repository<Post>,
    ) {}

    getPosts () {
        return this.posts.find();
    }

    async getPost (id: number) {
        const post = await this.posts.findOneBy({ id });
        if (!post) {
            throw new NotFoundException(`Post with id ${id} not found`);
        }

        return post;
    }

    createPost (dto: CreatePostDto) {
        // id and created_at are filled in by the database, not by us
        return this.posts.save(dto);
    }

    async updatePost (id: number, dto: UpdatePostDto) {
        // read first so an unknown id is a 404 rather than a silent insert -
        // save() with an id that does not exist would happily create a row
        const post = await this.getPost(id);

        Object.assign(post, dto);

        return this.posts.save(post);
    }

    async deletePost (id: number) {
        // read it before deleting so we can still return what was removed
        const post = await this.getPost(id);

        await this.posts.delete(id);

        return post;
    }
}
