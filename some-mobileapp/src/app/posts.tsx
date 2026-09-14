import { FlatList, View, Text, SafeAreaView, StyleSheet, StatusBar } from "react-native";
import { fetchPosts } from "../api/posts";
import { useEffect, useState } from "react";
import { CreatePostDto } from "../types/createPostDto";
import { PostDto } from "../types/postDto";
import { SafeAreaProvider } from "react-native-safe-area-context";

export default function Posts() {
    const [posts, setPosts] = useState<PostDto[]>([]);

    const loadPosts = async () => {
        const postsResult = await fetchPosts();
        setPosts(postsResult);
        console.log(postsResult);
    }

    useEffect(() => {
        loadPosts();
    }, [])


    return (
        <View>
            <SafeAreaProvider>
                <SafeAreaView style={styles.container}>
                <FlatList
                    data={posts}
                    renderItem={({item}) => {
                        return (
                            <View>
                                <Text>{item.title}</Text>
                                <Text>{item.body}</Text>
                                <Text>{item.author}</Text>
                            </View>
                        )
                    }}
                    keyExtractor={item => item.id.toString()}
                />
                </SafeAreaView>
            </SafeAreaProvider>
        </View>    
    )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 70,
    //marginTop: StatusBar.currentHeight || 0,
  }
});