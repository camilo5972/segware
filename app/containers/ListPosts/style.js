import { StyleSheet } from 'react-native';

export default class StylesComponent {
    static getSheet(theme) {
        return StyleSheet.create({
            container: {
                flexGrow: 1,
                paddingBottom: 12
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
                fontSize: theme.FONT_SIZE_LARGE,
                fontWeight: 'bold'
            },
            containerButtonNewPost: {
                flex: 1,
                alignItems: 'flex-end'
            },
            icon: {
                color: theme.PRIMARY_COLOR
            }
        })
    }
}