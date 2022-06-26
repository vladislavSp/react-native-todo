import { StyleSheet } from 'react-native';
import { FONT_NAMES } from '../../AppStyles';

export const styles = StyleSheet.create({
    tabList: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 28,
    },
    tabBtn: {
        width: '30%',
        height: 43,
    },
    gradient: {
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        height: '100%',
        borderRadius: 6,
    },
    tabText: {
        fontFamily: FONT_NAMES.RRBlack,
        color: '#fff',
        textAlign: 'center',
        opacity: 0.5,
        fontSize: 10,
        maxWidth: 67,
    },
    tabTextActive: {
        opacity: 1,
    },
});

export default styles;
