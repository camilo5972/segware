import { StyleSheet, Platform } from 'react-native';
import { isIphoneX } from '../../utils/isIphone';

export default class StylesComponent {
    static getSheet() {
        return StyleSheet.create({
            container: {
                flex: 1,
                marginTop: Platform.OS === 'android' ? 12 : isIphoneX ? 50: 12
            },
            title: {
                textAlign:'center',
                fontSize: 18,
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
                fontSize: 16,
                fontWeight: 'bold',
                color: '#65b9bd'
            },
            textAreaContainer: {
                marginTop: 30,
                marginHorizontal: 22,
                borderColor: '#d7d9da',
                borderBottomWidth: 1,
                padding: 5
            },
            inactiveText: {
                color: 'grey'
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