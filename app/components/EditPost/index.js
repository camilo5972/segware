import React, { useContext, useEffect, useState } from 'react';
import { View, Modal, Text, Alert, TouchableOpacity, TextInput } from 'react-native';
import i18n from '../../i18n';
import AppContext from '../../AppContext';
import StylesComponent from './style';
import { editPost } from '../../utils';

export default function EditPost(props) {
    const context = useContext(AppContext);
    const { post, setVisibleModalEditPost } = props;
    const [state, setState] = useState({visible: false, activeEdit: false, contentPost: post.text });
    const styles = StylesComponent.getSheet();
    const hideModal = () => {
        setVisibleModalEditPost(false);
    };
    const updateContentPost = (contentPost) => {
        setState({...state, contentPost, activeEdit: contentPost !== ''});
    };
    const update = async () => {
        try {
            if (!state.activeEdit) return;
            const updatedPost = await editPost(post._id, { author: context.state.author, text: state.contentPost });
            const listUpdated = context.state.posts.map((item) => {
                if (item._id !== post._id) return item;
                return updatedPost;
            });
            context.updateState({ ...context.state, posts: listUpdated});
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
                        <Text style={styles.title}>{i18n.t('label.EditPost.editPost')}</Text>
                    </View>
                    <View style={[styles.itemTopBar, styles.itemRight]}>
                        <TouchableOpacity 
                            disabled={!state.activeEdit}
                            onPress={update}>
                            <Text style={[styles.buttonText, !state.activeEdit && styles.inactiveText]}>{i18n.t('buttonText.edit')}</Text>
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
                        placeholderTextColor='grey'
                        numberOfLines={10}
                        multiline={true}
                    />
                </View>
            </View>
        </Modal>
    );
}