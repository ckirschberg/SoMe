import { Test, TestingModule } from '@nestjs/testing';
import { NotFoundException } from '@nestjs/common';
import { getRepositoryToken } from '@nestjs/typeorm';
import { PostService } from './post.service';
import { Post } from './entities/post.entity';

describe('PostService', () => {
  let service: PostService;
  let repo: Record<string, jest.Mock>;

  const existing: Post = {
    id: 1,
    title: 'title1',
    body: 'body1',
    author: 'author1',
    created_at: new Date(),
  };

  beforeEach(async () => {
    // The repository is mocked, so these tests need no database. They check
    // that the service asks the repository for the right thing.
    repo = {
      find: jest.fn(),
      findOneBy: jest.fn(),
      create: jest.fn(),
      save: jest.fn(),
      delete: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PostService,
        { provide: getRepositoryToken(Post), useValue: repo },
      ],
    }).compile();

    service = module.get<PostService>(PostService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('getPosts asks the repository for every row', async () => {
    repo.find.mockResolvedValue([existing]);

    await expect(service.getPosts()).resolves.toEqual([existing]);
    expect(repo.find).toHaveBeenCalled();
  });

  describe('getPost', () => {
    it('returns the row when it exists', async () => {
      repo.findOneBy.mockResolvedValue(existing);

      await expect(service.getPost(1)).resolves.toEqual(existing);
      expect(repo.findOneBy).toHaveBeenCalledWith({ id: 1 });
    });

    it('throws 404 when it does not', async () => {
      repo.findOneBy.mockResolvedValue(null);

      await expect(service.getPost(99)).rejects.toThrow(NotFoundException);
    });
  });

  it('createPost saves the dto and lets the database fill in id/created_at', async () => {
    const dto = { title: 'title3', body: 'body3', author: 'author3' };
    repo.create.mockReturnValue(dto);
    repo.save.mockResolvedValue({ id: 3, ...dto, created_at: new Date() });

    const created = await service.createPost(dto);

    expect(repo.create).toHaveBeenCalledWith(dto);
    expect(repo.save).toHaveBeenCalledWith(dto);
    expect(created).toMatchObject({ id: 3, title: 'title3' });
  });

  describe('updatePost', () => {
    it('merges the dto onto the existing row and saves it', async () => {
      repo.findOneBy.mockResolvedValue({ ...existing });
      repo.save.mockImplementation((post) => Promise.resolve(post));

      const updated = await service.updatePost(1, {
        title: 'new title',
        body: 'new body',
        author: 'new author',
      });

      expect(updated).toMatchObject({ id: 1, title: 'new title', author: 'new author' });
      // created_at survives an update - it is not in the DTO
      expect(updated.created_at).toEqual(existing.created_at);
    });

    it('throws 404 rather than inserting a new row for an unknown id', async () => {
      repo.findOneBy.mockResolvedValue(null);

      await expect(
        service.updatePost(99, { title: 't', body: 'b', author: 'a' }),
      ).rejects.toThrow(NotFoundException);
      expect(repo.save).not.toHaveBeenCalled();
    });
  });

  describe('deletePost', () => {
    it('deletes the row and returns what was removed', async () => {
      repo.findOneBy.mockResolvedValue(existing);
      repo.delete.mockResolvedValue({ affected: 1 });

      await expect(service.deletePost(1)).resolves.toEqual(existing);
      expect(repo.delete).toHaveBeenCalledWith(1);
    });

    it('throws 404 for an unknown id', async () => {
      repo.findOneBy.mockResolvedValue(null);

      await expect(service.deletePost(99)).rejects.toThrow(NotFoundException);
      expect(repo.delete).not.toHaveBeenCalled();
    });
  });
});
