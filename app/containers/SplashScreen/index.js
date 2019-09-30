import React from 'react';
import { View, SafeAreaView, Animated } from 'react-native';
import StylesComponent from './style';

export default function SplashScreen() {
    const scale = new Animated.Value(1);
    const styles = StylesComponent.getSheet();
    const animateLogo = () => {
        Animated.loop(
            Animated.sequence([
                Animated.delay(500),
                Animated.timing(scale, {
                    toValue: 1.3,
                    duration: 1000,
                    useNativeDriver: true
                }),
                Animated.timing(scale, {
                    toValue: 1,
                    duration: 1000,
                    useNativeDriver: true
                })
            ])
        ).start();
    };
    animateLogo();
    return (
        <SafeAreaView style={styles.safeArea}>
            <View style={styles.container}>
                <Animated.Image style={[styles.logo, {transform: [{ scale }]}]} source={require('../../assets/images/segware.png')}/>
            </View>
        </SafeAreaView>
    );
}