import { StyleSheet } from 'react-native';

export default class StylesComponent {
    static getSheet(theme) {
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
                color: theme.TEXT_DATE_COLOR
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
                color: theme.TEXT_UPVOTERS_COLOR
            },
            icon: {
                color: theme.PRIMARY_COLOR
            }
        })
    }
}