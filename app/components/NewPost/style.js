import { StyleSheet } from 'react-native';

export default class StylesComponent {
    static getSheet() {
        return StyleSheet.create({
            container: {
                flex: 1
            }
        })
    }
}