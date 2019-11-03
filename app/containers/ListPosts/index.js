import React, { useContext, useState, useCallback, Fragment } from 'react';
import { ScrollView, RefreshControl, View, TouchableOpacity, Text } from 'react-native';
import AppContext from '../../AppContext';
import StylesComponent from './style';
import { getPosts } from '../../utils';
import { Icon } from 'react-native-elements';
import Post from '../../components/Post';
import NewPost from '../../components/NewPost';
import { themes } from '../../themes';

export default function ListPosts() {
    const context = useContext(AppContext);
    const styles = StylesComponent.getSheet(themes[context.state.theme]);
    const [refresh, setRefresh] = useState(false);
    const [visibleModalNewPost, setVisibleModalNewPost] = useState(false);
    const posts = () => context.state.posts.map((post) => <Post key={post._id} post={post} />);
    const onRefresh = useCallback(async () => {
        setRefresh(true);
        const posts = await getPosts();
        await context.updateState({ ...context.state, posts });
        setRefresh(false);
    }, [refresh]);
    
    return (
        <Fragment>
            <NewPost visible={visibleModalNewPost} setVisibleModalNewPost={setVisibleModalNewPost} />
            <View style={styles.header}>
                <View style={{flex: 1}}></View>
                <View style={styles.title}>
                    <Text style={styles.textHeader}>Posts</Text>
                </View>
                <View style={styles.containerButtonNewPost}>
                    <TouchableOpacity onPress={() => setVisibleModalNewPost(true)}>
                        <Icon
                            size={25}
                            color={styles.icon.color}
                            name='clipboard-pencil'
                            type='foundation' />
                    </TouchableOpacity>
                </View>
            </View>
            <ScrollView 
                contentContainerStyle={styles.container}
                refreshControl={
                    <RefreshControl refreshing={refresh} onRefresh={onRefresh} />
                }>
                    { posts() }
            </ScrollView>
        </Fragment>
    );
}