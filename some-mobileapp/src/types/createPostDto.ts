import { PostDto } from "./postDto";

export type CreatePostDto = Omit<PostDto, "id">