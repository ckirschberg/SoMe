import { Test, TestingModule } from '@nestjs/testing';
import { PostController } from './post.controller';
import { PostService } from './post.service';

describe('PostController', () => {
  let controller: PostController;
  let service: Record<string, jest.Mock>;

  beforeEach(async () => {
    // The service is mocked here: the controller's only job is to take the
    // request apart and delegate, so that is all these tests check.
    service = {
      getPosts: jest.fn(),
      getPost: jest.fn(),
      createPost: jest.fn(),
      updatePost: jest.fn(),
      deletePost: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [PostController],
      providers: [{ provide: PostService, useValue: service }],
    }).compile();

    controller = module.get<PostController>(PostController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('converts the string route param to a number before delegating', () => {
    controller.getPost('1');
    controller.deletePost('2');

    expect(service.getPost).toHaveBeenCalledWith(1);
    expect(service.deletePost).toHaveBeenCalledWith(2);
  });

  it('passes the body straight through to the service', () => {
    const dto = { title: 'new title', body: 'new body', author: 'new author' };

    controller.createPost(dto);
    controller.updatePost('1', dto);

    expect(service.createPost).toHaveBeenCalledWith(dto);
    expect(service.updatePost).toHaveBeenCalledWith(1, dto);
  });
});
