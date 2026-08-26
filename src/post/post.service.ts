import { Injectable } from '@nestjs/common';
import { CreatePostDto } from './dtos/create-post.dto';

@Injectable()
export class PostService {
    private posts = [
        { id: 1, title: 'title1', body: 'body1', created_at: new Date(), author: 'author1'  },
        { id: 2, title: 'title2', body: 'body2', created_at: new Date(), author: 'author2'  }
    ];

    getPosts () {
        return this.posts;
    }

    createPost (dto: CreatePostDto) {
        const newPost = {
            id: this.posts.length + 1,
            ...dto
        }
        newPost.created_at = new Date();

        this.posts.push(newPost);
        console.log(newPost);

        return newPost;
    }
}
