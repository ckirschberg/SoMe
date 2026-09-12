import { Platform } from "react-native"
import { NewPostDto } from "../types/newPostDto";
import { PostDto } from "../types/postDto";

const baseUrl = Platform.OS === 'ios' ? 'localhost:3006' : '10.0.2.2:3006';

export async function fetchPosts(): Promise<PostDto[]> {
    var result = await fetch(baseUrl + '/posts');

    if (!result.ok) {
        throw new Error("Error fetching posts");
    }

    return result.json();
}

export async function addPost(dto: NewPostDto): Promise<PostDto> {
    var result = await fetch(baseUrl + "/posts", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(dto)
    });

    if (!result.ok) {
        throw new Error("Error saving post");
    }

    return result.json();
}
