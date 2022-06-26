import { StyleSheet } from 'react-native';
import { FONT_NAMES } from '../../../AppStyles';

export const styles = StyleSheet.create({
    headerTable: {
       height: 24,
       flexDirection: 'row',
   },
    tableText: {
       fontFamily: FONT_NAMES.RRBlack,
       fontSize: 15,
       color: '#fff',
   },
   tableTextFirst: {
       marginLeft: 3,
       marginRight: 14,
   },
   tableRow: {
       flexDirection: 'row',
       alignItems: 'center',
       justifyContent: 'flex-start',
       backgroundColor: '#333333',
       height: 21,
       marginBottom: 4,
       borderRadius: 6,
       lineHeight: 11,
   },
   substrate: {
        justifyContent: 'center',
        alignItems: 'center',
        width: 21,
        height: 21,
        borderRadius: 6,
        marginRight: 10,
    },
   tableRowText: {
       fontFamily: FONT_NAMES.RRBlack,
       fontSize: 11,
       lineHeight: 11,
       color: '#fff',
   },
   tableRowName: {
        width: 134,
        maxWidth: 134,
    },
    tableRowSmallText: {
       fontSize: 9,
       width: 12,
       textAlign: 'center',
   },
    tableRowGame: {
        marginLeft: 27
        },
    tableRowWon: {
        marginLeft: 27,
    },
    tableRowDraw: {
        marginLeft: 9,
    },
    tableRowLost: {
        marginLeft: 9,
    },
    tableRowPoints: {
        width: 18,
        marginRight: 12,
        marginLeft: 'auto',
        textAlign: 'center',
    },
});
