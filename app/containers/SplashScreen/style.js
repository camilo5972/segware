import { StyleSheet } from 'react-native';

export default class StylesComponent {
    static getSheet() {
        return StyleSheet.create({
            safeArea: {
                flex: 1
            },
            container: {
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center'
            },
            logo: {
                width: 100,
                height: 100
            }
        })
    }
}