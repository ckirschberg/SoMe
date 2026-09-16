import { View, Text } from "react-native";

type PostProps = {title: string, body: string, author: string};

export const Post = ({title, body, author}: PostProps) => (
  <View >
    <Text>{title}</Text>
    <Text>{body}</Text>
    <Text>{author}</Text>
  </View>
);