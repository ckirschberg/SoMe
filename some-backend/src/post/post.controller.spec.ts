import { Test, TestingModule } from '@nestjs/testing';
import { NotFoundException } from '@nestjs/common';
import { PostController } from './post.controller';
import { PostService } from './post.service';

describe('PostController', () => {
  let controller: PostController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PostController],
      providers: [PostService],
    }).compile();

    controller = module.get<PostController>(PostController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('updates an existing post', () => {
    const updated = controller.updatePost('1', {
      title: 'new title',
      body: 'new body',
      author: 'new author',
    });

    expect(updated).toMatchObject({ id: 1, title: 'new title', author: 'new author' });
    expect(controller.getPost('1')).toMatchObject({ title: 'new title' });
  });

  it('deletes an existing post', () => {
    controller.deletePost('1');

    expect(controller.getPosts()).toHaveLength(1);
    expect(() => controller.getPost('1')).toThrow(NotFoundException);
  });
});
