import { Platform } from "react-native"

const baseUrl = Platform.OS === 'ios' ? 'localhost:3006' : '10.0.2.2:3006';

export default async function fetchPosts() {
    var result = await fetch(baseUrl + '/posts');

    

    return result.json();
}