import { useCallback, useState } from "react";
import { Text, FlatList, StyleSheet, Button, View } from "react-native";
import { useFocusEffect, useRouter } from "expo-router";
import { fetchPosts } from "../../../api/posts";
import { PostDto } from "../../../types/postDto";
import { Post } from "../../../components/post";


export default function Feed() {
    const [posts, setPosts] = useState<PostDto[]>([])
    const [error, setError] = useState<string>("")
    const router = useRouter();

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

    // the original mount-only load, kept for reference:
    // useEffect(() => {
    //     loadPosts();
    // }, [])

    // useFocusEffect, not useEffect: this screen stays mounted while newPost is
    // pushed on top of it, so a mount-only effect would never run again and a
    // post you just saved would be missing from the list
    useFocusEffect(
        useCallback(() => {
            loadPosts();
        }, [])
    );

    return (
        // no SafeAreaView needed any more: the feed stack's header covers the top
        // inset and the tab bar covers the bottom one
        <View style={styles.container}>
            <Button title="New post" onPress={() => router.push("/newPost")} />

            {error ? <Text>{error}</Text> : null}

            <FlatList
                data={posts}
                renderItem={({item}) => <Post title={item.title} body={item.body} author={item.author} />}
                keyExtractor={item => item.id.toString()}
            />
        </View>
    );
}

const styles = StyleSheet.create({
  container: {
    // the feed owns the whole screen now, so it can claim the leftover height
    flex: 1,
  }
});
