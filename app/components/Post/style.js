import { StyleSheet } from 'react-native';

export default class StylesComponent {
    static getSheet() {
        return StyleSheet.create({
            card: {
                borderRadius: 5,
                shadowColor: '#000',
                shadowOpacity: 0.1
            },
            text: {
                textAlign: 'justify',
                marginTop: 10,
                marginBottom: 22
            },
            row: {
                flexDirection: 'row',
                alignItems: 'center'
            },
            dots: {
                alignItems: 'flex-end',
                flex: 1
            },
            containerDate: {
                alignItems: 'flex-end',
                flex: 1
            },
            dateCreated: {
                color: '#bababa'
            },
            containerButtonUpvote: {
                flex: 1,
                alignItems: 'flex-start'
            },
            buttonUpvote: {
                flexDirection: 'row'
            },
            textTotalUpvoters: {
                marginLeft: 10,
                color: '#7e7e7e'
            }
        })
    }
}