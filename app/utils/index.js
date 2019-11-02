import AsyncStorage from '@react-native-community/async-storage';
import { HOST } from './constants';
const uuidv4 = require('uuid/v4');

export const getAuthor = async () => {
    let author = await getData('author');
    if (!author || author === '') {
        author = uuidv4();
        await setData('author', author);
    };
    return author;
};

export const getPosts = async () => {
    try {
        const response = await fetch(`${HOST}/posts`);
        const posts = await response.json();
        return posts;
    } catch (error) {
        return [];
    }
};

export const getTheme = async () => {
    const theme = await getData('theme');
    if (!theme || theme === '') {
        await setData('theme', 'main');
    };
    return theme;
};

export const newPost = async (payload) => {
    const response = await fetch(`${HOST}/posts`, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json; charset=UTF-8'
        },
        body: JSON.stringify(payload)
    });
    const responseJson = await response.json();
    if (!responseJson.post) throw new Error(responseJson.message);
    return responseJson.post;
};

export const editPost = async (idPost, payload) => {
    const response = await fetch(`${HOST}/posts/${idPost}`, {
        method: 'PUT',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json; charset=UTF-8'
        },
        body: JSON.stringify(payload)
    });
    const responseJson = await response.json();
    if (!responseJson.post) throw new Error(responseJson.message);
    return responseJson.post;
};

export const removePost = async (idPost, payload) => {
    const response = await fetch(`${HOST}/posts/${idPost}`, {
        method: 'DELETE',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json; charset=UTF-8'
        },
        body: JSON.stringify(payload)
    });
    const responseJson = await response.json();
    if (!responseJson.post) throw new Error(responseJson.message);
    return responseJson.post;
};

export const upvote = async (idPost, payload) => {
    const response = await fetch(`${HOST}/posts/${idPost}/upvote`, {
        method: 'PUT',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json; charset=UTF-8'
        },
        body: JSON.stringify(payload)
    });
    const responseJson = await response.json();
    if (!responseJson.post) throw new Error(responseJson.message);
    return responseJson.post;
};

export const removeVote = async (idPost, payload) => {
    const response = await fetch(`${HOST}/posts/${idPost}/upvote`, {
        method: 'DELETE',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json; charset=UTF-8'
        },
        body: JSON.stringify(payload)
    });
    const responseJson = await response.json();
    if (!responseJson.post) throw new Error(responseJson.message);
    return responseJson.post;
};

export const formatDate = (date) => {
    return `${date.getDate()}/${date.getMonth()}/${date.getFullYear()} ${date.getHours()}:${minutesWithLeadingZeros(date)}`;
};

minutesWithLeadingZeros = (date) => {
  return `${date.getMinutes() < 10 ? '0' : ''}${date.getMinutes()}`;
};

setData = async (key, value) => {
    try {
        await AsyncStorage.setItem(key, value);
        return true;
    } catch (error) {
        return false;
    }
}

getData = async (key) => {
    try {
        const value = await AsyncStorage.getItem(key);
        return value;
    } catch (error) {
        return null;
    }
}