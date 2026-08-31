import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { PostService } from './post.service';
import { CreatePostDto } from './dtos/create-post.dto';
import { UpdatePostDto } from './dtos/update-post.dto';

// posts => endpoint name
@Controller('posts')
export class PostController {
    // DI - Dependency Injection
    // Frameworket stiller objekter til rådighed hvis I beder om det.
    constructor(private readonly postService: PostService) {}

    // Methods
    @Get() 
    getPosts() {
        return this.postService.getPosts();
    }

    @Get(':id')
    getPost(@Param('id') id: string) {
        return this.postService.getPost(Number(id));
    }

    @Post() 
    createPost(@Body() dto: CreatePostDto) {
        return this.postService.createPost(dto);
    }

    //Why id: string is the honest annotation: TypeScript types are erased at compile time. 
    //@Param('id') pulls the value out of Express's req.params, and those are always strings
    @Put(':id')
    updatePost(@Param('id') id: string, @Body() dto: UpdatePostDto) {
        return this.postService.updatePost(Number(id), dto);
    }

    @Delete(':id')
    deletePost(@Param('id') id: string) {
        return this.postService.deletePost(Number(id));
    }
}
