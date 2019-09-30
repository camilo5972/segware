import React, { useContext, useEffect, useState } from 'react';
import { View, Modal, Text, TouchableHighlight } from 'react-native';
import AppContext from '../../AppContext';
import StylesComponent from './style';
import { isIphoneX } from '../../utils/isIphone';

export default function NewPost(props) {
    const context = useContext(AppContext);
    const styles = StylesComponent.getSheet();
    useEffect(() => {
        props.setVisibleModalNewPost(props.visible);
    });
    
    return (
        <Modal
            animationType="slide"
            transparent={false}
            visible={props.visible}
            onRequestClose={() => {
                Alert.alert('Modal has been closed.');
            }}>
            <View style={{marginTop: isIphoneX ? 40: 22}}>
                <View>
                    <Text>Hello World!</Text>
                    <TouchableHighlight
                        onPress={() => {
                            props.setVisibleModalNewPost(false);
                        }}>
                        <Text>Hide Modal</Text>
                    </TouchableHighlight>
                </View>
            </View>
        </Modal>
    );
}