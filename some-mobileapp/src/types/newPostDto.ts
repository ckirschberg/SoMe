import { PostDto } from "./postDto"

export type NewPostDto = Omit<PostDto, "id">