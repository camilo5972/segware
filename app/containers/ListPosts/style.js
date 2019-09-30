import { StyleSheet } from 'react-native';

export default class StylesComponent {
    static getSheet() {
        return StyleSheet.create({
            container: {
                flex: 1
            },
            title: {
                flex: 1
            },
            header: {
                flexDirection: 'row',
                paddingTop: 12,
                paddingHorizontal: 20,
                marginBottom: 12,
                justifyContent: 'space-between'
            },
            textHeader: {
                textAlign:'center',
                fontSize: 18,
                fontWeight: 'bold'
            },
            containerButtonNewPost: {
                flex: 1,
                alignItems: 'flex-end'
            }
        })
    }
}