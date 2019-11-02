import { StyleSheet, Platform } from 'react-native';
import { isIphoneX } from '../../utils/isIphone';

export default class StylesComponent {
    static getSheet(theme) {
        return StyleSheet.create({
            container: {
                flex: 1,
                marginTop: Platform.OS === 'android' ? 12 : isIphoneX ? 50: 12
            },
            title: {
                textAlign:'center',
                fontSize: theme.FONT_SIZE_LARGE,
                fontWeight: 'bold'
            },
            topBar: {
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
                paddingHorizontal: 20
            },
            itemTopBar: {
                flex: 1
            },
            itemRight: {
                alignItems: 'flex-end'
            },
            itemLeft: {
                alignItems: 'flex-start'
            },
            itemCenter: {
                alignItems: 'center'
            },
            buttonText: {
                fontSize: theme.FONT_SIZE_MEDIUM,
                fontWeight: 'bold',
                color: theme.PRIMARY_COLOR
            },
            textAreaContainer: {
                marginTop: 30,
                marginHorizontal: 22,
                borderColor: theme.TEXTAREA_BODER_COLOR,
                borderBottomWidth: 1,
                padding: 5
            },
            inactiveText: {
                color: theme.INACTIVE_TEXT_COLOR
            },
            textArea: {
                borderColor: 'transparent',
                height: 150,
                justifyContent: 'flex-start',
                textAlign: 'justify'
            }
        })
    }
}