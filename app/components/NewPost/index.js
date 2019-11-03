import React, { useContext, useEffect, useState } from 'react';
import { View, Modal, Text, Alert, TouchableOpacity, TextInput } from 'react-native';
import i18n from '../../i18n';
import AppContext from '../../AppContext';
import StylesComponent from './style';
import { newPost } from '../../utils';
import { themes } from '../../themes';

export default function NewPost(props) {
    const context = useContext(AppContext);
    const [state, setState] = useState({visible: false, activePublish: false, contentPost: null});
    const styles = StylesComponent.getSheet(themes[context.state.theme]);
    const hideModal = () => {
        props.setVisibleModalNewPost(false);
    };
    const updateContentPost = (contentPost) => {
        setState({...state, contentPost, activePublish: contentPost !== ''});
    };
    const publish = async () => {
        try {
            if (!state.activePublish) return;
            const post = await newPost({ author: context.state.author, text: state.contentPost }, context.state.ws);
            updateContentPost(null);
            context.updateState({ ...context.state, posts: [post, ...context.state.posts]});
            hideModal();
        } catch (error) {
            Alert.alert(i18n.t('error.default', { message: error.message }));
        }
    };
    
    useEffect(() => {
        setState({ ...state, visible: props.visible});
    }, [props.visible]);
    
    return (
        <Modal
            animationType='slide'
            transparent={false}
            visible={state.visible}>
            <View style={styles.container}>
                <View style={styles.topBar}>
                    <View style={[styles.itemTopBar, styles.itemLeft]}>
                        <TouchableOpacity onPress={() => {
                            hideModal();
                        }}>
                            <Text style={styles.buttonText}>{i18n.t('buttonText.cancel')}</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={[styles.itemTopBar, styles.itemCenter]}>
                        <Text style={styles.title}>{i18n.t('label.NewPost.newPost')}</Text>
                    </View>
                    <View style={[styles.itemTopBar, styles.itemRight]}>
                        <TouchableOpacity 
                            disabled={!state.activePublish}
                            onPress={publish}>
                            <Text style={[styles.buttonText, !state.activePublish && styles.inactiveText]}>{i18n.t('buttonText.publish')}</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={styles.textAreaContainer} >
                    <TextInput
                        style={styles.textArea}
                        onChangeText={text => updateContentPost(text)}
                        value={state.contentPost}
                        underlineColorAndroid='transparent'
                        placeholder={i18n.t('inputText.whatOnMind')}
                        placeholderTextColor={styles.inactiveText.color}
                        numberOfLines={10}
                        multiline={true}
                    />
                </View>
            </View>
        </Modal>
    );
}