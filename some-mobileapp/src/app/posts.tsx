import { useEffect, useState } from "react";
import { View } from "react-native";
import { fetchPosts } from "../api/posts";
import { PostDto } from "../types/postDto";

export default function Posts() {
    const [posts, setPosts] = useState<PostDto[]>([])
    const [error, setError] = useState<string>("")

    const loadPosts = async () => {
        try {
            const posts = await fetchPosts()
            setPosts(posts);
        } catch (e) {
            setError(e.message)
        }

    }
    
    useEffect(() => {
        
    }, [])


    return (
        <View>
            
        </View>
    );
}