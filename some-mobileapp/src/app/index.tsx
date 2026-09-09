import { Text, Button, TextInput, View, StyleSheet, Alert } from "react-native";
import { useState, useEffect } from 'react';

export default function Index() {
    const [text, onChangeText] = useState('');
    const [todos, setTodos] = useState([] as string[]);

    const onPress = () => {
      // tilføjer text til array'et
      setTodos((prev) => [...prev, text])
    }

    useEffect(() => {
      console.log(todos);
    }, [todos])

  return (
    <View style={styles.container}>
      <Text>Hello World - Hej allesammen</Text>

      {/* Use flat list to display todo items */}


        <TextInput
          style={styles.input}
          onChangeText={onChangeText}
          value={text}
        />

        <Button
          title="Add todo"
          onPress={onPress}
        />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    width: 200
  },
});
