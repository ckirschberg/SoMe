import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreatePostDto } from './dtos/create-post.dto';
import { UpdatePostDto } from './dtos/update-post.dto';

@Injectable()
export class PostService {
    private posts = [
        { id: 1, title: 'title1', body: 'body1', created_at: new Date(), author: 'author1'  },
        { id: 2, title: 'title2', body: 'body2', created_at: new Date(), author: 'author2'  }
    ];

    // ids must never be reused, so count up instead of deriving from posts.length
    private nextId = this.posts.length + 1;

    getPosts () {
        return this.posts;
    }

    getPost (id: number) {
        return this.findPost(id);
    }

    createPost (dto: CreatePostDto) {
        const newPost = {
            id: this.nextId++,
            ...dto,
            created_at: new Date()
        }

        this.posts.push(newPost);

        return newPost;
    }

    updatePost (id: number, dto: UpdatePostDto) {
        if (!dto.title || !dto.body || !dto.author) {
            throw new BadRequestException('title, body and author are all required');
        }

        const post = this.findPost(id);

        post.title = dto.title;
        post.body = dto.body;
        post.author = dto.author;

        return post;
    }

    deletePost (id: number) {
        const index = this.posts.findIndex(post => post.id === id);
        if (index === -1) {
            throw new NotFoundException(`Post with id ${id} not found`);
        }

        const [deleted] = this.posts.splice(index, 1);

        return deleted;
    }

    private findPost (id: number) {
        const post = this.posts.find(post => post.id === id);
        if (!post) {
            throw new NotFoundException(`Post with id ${id} not found`);
        }

        return post;
    }
}
