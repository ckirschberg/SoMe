import { useEffect, useState } from "react";
import { Text, FlatList, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { fetchPosts } from "../api/posts";
import { PostDto } from "../types/postDto";
import { Post } from "../components/post";


export default function Posts() {
    const [posts, setPosts] = useState<PostDto[]>([])
    const [error, setError] = useState<string>("")

    const loadPosts = async () => {
        try {
            const posts = await fetchPosts()
            setPosts(posts);
            console.log(posts)
            setError("")
        } catch (e) {
            console.error(e);
            setError("Could not load posts")
        }

    }
    
    useEffect(() => {
        loadPosts();
    }, [])

    return (
        // SafeAreaView must come from react-native-safe-area-context - the one in
        // react-native is a different component that ignores SafeAreaProvider.
        // edges skips the top: the Stack header already sits under the status bar,
        // so insetting the top again would push the list down twice.
        <SafeAreaView style={styles.container} edges={['bottom', 'left', 'right']}>
            {error ? <Text>{error}</Text> : null}

            <FlatList
                data={posts}
                renderItem={({item}) => <Post title={item.title} body={item.body} author={item.author} />}
                keyExtractor={item => item.id.toString()}
            />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
  container: {
    // deliberately NOT flex: 1 - that would claim all the leftover height and
    // leave a gap under a short list. flexShrink lets the list size to its
    // content, then give way (and scroll internally) once it outgrows the screen
    flexShrink: 1,
    // the parent in index.tsx centres its children, which would shrink this to
    // the width of its content - stretch keeps the list full-width regardless
    alignSelf: 'stretch',
  }
});
