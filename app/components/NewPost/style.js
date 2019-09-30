import { StyleSheet } from 'react-native';
import { isIphoneX } from '../../utils/isIphone';

export default class StylesComponent {
    static getSheet() {
        return StyleSheet.create({
            container: {
                flex: 1,
                marginTop: isIphoneX ? 50: 22
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
                marginHorizontal: 22,
                borderColor: '#d7d9da',
                borderLeftColor: 'transparent',
                borderRightColor: 'transparent',
                borderTopColor: 'transparent',
                borderWidth: 1,
                padding: 5
            },
            inactiveText: {
                color: 'grey'
            },
            textArea: {
                marginTop: 22,
                height: 150,
                justifyContent: 'flex-start'
            }
        })
    }
}