import { Platform } from "react-native";
import { NewPostDto } from "../types/newPostDto";
import { PostDto } from "../types/postDto";

// code by platform - 
// Platform.OS returns which operating system I am on
const baseUrl = Platform.OS === "ios" ? 
    "http://localhost:3006" : "http://10.0.2.2:3006"; 


export async function fetchPosts(): Promise<PostDto[]> {
    const result = await fetch(baseUrl + "/posts")

    if (!result.ok) {
        throw new Error("Could not fetch posts");
    }

    return result.json()
}

export async function addPost(post: NewPostDto): Promise<PostDto> {
    const result = await fetch(baseUrl+ "/posts", {
        method: "POST",
        body: JSON.stringify(post),
        headers: { "Content-Type": "application/json" }
    });

    if (!result.ok) {
        throw new Error("Could not save post");
    }
    return result.json();
}