import { useEffect, useState } from "react";
import { View } from "react-native";
import { fetchPosts } from "../api/posts";

export default function Posts() {
    const [posts, setPosts] = useState([])

    
    
    useEffect(() => {
        fetchPosts()
    }, [])


    return (
        <View>
            
        </View>
    );
}