import { useState } from "react";
import { Button, TextInput, View } from "react-native";
import { useRouter } from "expo-router";
import { addPost } from "../../../api/posts";
import { NewPostDto } from "../../../types/newPostDto";

export default function NewPost() {
    const [title, setTitle] = useState("");
    const [body, setBody] = useState("");
    const [author, setAuthor] = useState("");
    const router = useRouter();

    const handleNewPost = async () => {
        try {
            const newPost = await addPost({title, body, author} as NewPostDto);
            console.log(newPost);
            // back to the feed, which reloads on focus and picks up the new post
            router.back();
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <View>
            <TextInput onChangeText={setTitle} value={title} placeholder="Title"/>
            <TextInput onChangeText={setBody} value={body} multiline={true} numberOfLines={4} placeholder="Body"/>
            <TextInput onChangeText={setAuthor} value={author} placeholder="Author"/>
            <Button onPress={handleNewPost} title="Save Post"/>
        </View>
    )
}
