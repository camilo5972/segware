import React, { useContext, useState, useEffect, useRef } from 'react';
import { Text, View, TouchableOpacity, Alert } from 'react-native';
import AppContext from '../../AppContext';
import StylesComponent from './style';
import { Card, Icon } from 'react-native-elements';
import OptionsMenu from 'react-native-options-menu';
import * as Animatable from 'react-native-animatable';
import i18n from '../../i18n';
import { formatDate, upvote, removeVote, removePost } from '../../utils';
const AnimatedButton = Animatable.createAnimatableComponent(TouchableOpacity);

export default function Post(props) {
    const buttonHeartRef = useRef(null);
    const [post, setPost] = useState(props.post);
    const context = useContext(AppContext);
    const styles = StylesComponent.getSheet();
    const dateCreated = formatDate(new Date(post.dateCreated));
    const onPressVote = async () => {
        try {
            buttonHeartRef.current.stopAnimation();
            const {author: upvoter} = context.state;
            const postUpdated = isAuthorUpvoter() ? await removeVote(post._id, { upvoter }) : await upvote(post._id, { upvoter });
            setPost(postUpdated);
            buttonHeartRef.current.swing(1000);
        } catch (error) {
            Alert.alert(i18n.t('error.default', { message: error.message }));
        }
    };
    const editPost = () => {};
    const deletePost = async () => {
        try {
            const postRemoved = await removePost(post._id, { author: context.state.author });
            const posts = context.state.posts.filter((item) => item._id !== postRemoved._id );
            context.updateState({ ...context.state, posts });
        } catch (error) {
            Alert.alert(i18n.t('error.default', { message: error.message }));
        }
    };
    const confirmDeletePost = () => {
        Alert.alert(
            '',
            i18n.t('alert.deletePost'),
            [
                { text: i18n.t('buttonText.delete'), onPress: () => deletePost() },
                { text: i18n.t('buttonText.cancel'), onPress: () => console.log('Cancel Pressed'), style: 'cancel' }
            ],
            {cancelable: false},
        );
    };
    const isAuthorUpvoter = () => {
        return post.upvoters.includes(context.state.author);
    };
    const isAuthorOwnerPost = () => {
        return post.author === context.state.author;
    };
    const verifyUpvote = () => {
        return isAuthorUpvoter () ? 'heart': 'hearto';
    };

    useEffect(() => {
        setPost(props.post);
    }, [context.state.posts]);

    return (
        <Card containerStyle={styles.card}>
            <View style={styles.row}>
                {
                    isAuthorOwnerPost() &&
                    <View style={styles.dots}>
                        <OptionsMenu
                            customButton={(
                                <Icon
                                    color='#65b9bd'
                                    name='dots-three-horizontal'
                                    type='entypo' />
                            )}
                            destructiveIndex={1}
                            options={[i18n.t('buttonText.edit'), i18n.t('buttonText.delete'), i18n.t('buttonText.cancel')]}
                            actions={[editPost, confirmDeletePost, () => {}]}
                        />
                    </View>
                }
            </View>
            <Text style={styles.text}>{post.text}</Text>
            <View style={styles.row}>
                <View style={styles.containerButtonUpvote}>
                    <AnimatedButton ref={buttonHeartRef} style={styles.buttonUpvote} onPress={onPressVote}>
                        <Icon
                            size={21}
                            color='#fa4259'
                            name={verifyUpvote()}
                            type='antdesign' />
                        <Text style={styles.textTotalUpvoters}>{post.upvoters.length}</Text>
                    </AnimatedButton>
                </View>
                <View style={styles.containerDate}>
                    <Text style={styles.dateCreated}>{dateCreated}</Text>
                </View>
            </View>
        </Card>
    );
}