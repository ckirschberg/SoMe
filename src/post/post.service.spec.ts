import { Test, TestingModule } from '@nestjs/testing';
import { BadRequestException, NotFoundException } from '@nestjs/common';
import { PostService } from './post.service';

describe('PostService', () => {
  let service: PostService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PostService],
    }).compile();

    service = module.get<PostService>(PostService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('updatePost', () => {
    it('replaces the editable fields and keeps id and created_at', () => {
      const before = service.getPost(1);
      const createdAt = before.created_at;

      const updated = service.updatePost(1, {
        title: 'new title',
        body: 'new body',
        author: 'new author',
      });

      expect(updated).toMatchObject({
        id: 1,
        title: 'new title',
        body: 'new body',
        author: 'new author',
      });
      expect(updated.created_at).toBe(createdAt);
    });

    it('rejects a partial body instead of blanking fields', () => {
      expect(() =>
        service.updatePost(1, { title: 'only a title' } as any),
      ).toThrow(BadRequestException);

      expect(service.getPost(1).body).toBe('body1');
    });

    it('throws for an unknown id', () => {
      expect(() =>
        service.updatePost(99, { title: 't', body: 'b', author: 'a' }),
      ).toThrow(NotFoundException);
    });
  });

  describe('deletePost', () => {
    it('removes the post and returns it', () => {
      const deleted = service.deletePost(1);

      expect(deleted).toMatchObject({ id: 1 });
      expect(service.getPosts()).toHaveLength(1);
    });

    it('throws for an unknown id', () => {
      expect(() => service.deletePost(99)).toThrow(NotFoundException);
    });
  });

  it('does not reuse the id of a deleted post', () => {
    service.deletePost(2);

    const created = service.createPost({
      title: 'title3',
      body: 'body3',
      author: 'author3',
    });

    expect(created.id).toBe(3);
    expect(service.getPosts().map((post) => post.id)).toEqual([1, 3]);
  });
});
