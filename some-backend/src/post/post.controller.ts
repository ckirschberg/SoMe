import { Body, Controller, Get, Post } from '@nestjs/common';
import { PostService } from './post.service';
import { CreatePostDto } from './dtos/create-post.dto';

@Controller('posts')
export class PostController {
    // DI - Dependency Injection
    constructor(private readonly postService: PostService) {}

    @Get() 
    getPosts() {
        return this.postService.getPosts();
    }

    @Post() 
    createPost(@Body() dto: CreatePostDto) {
        return this.postService.createPost(dto);
    }
}
