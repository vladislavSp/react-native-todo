import { StyleSheet } from 'react-native';
import { FONT_NAMES } from '../../../AppStyles';

export const styles = StyleSheet.create({
    dateBlock: {
        flex: 1,
        marginBottom: 4,
    },
    title: {
        marginBottom: 26,
        fontFamily: FONT_NAMES.RRBlack,
        fontSize: 15,
        lineHeight: 15,
        color: '#fff',
    },
    matchList: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
    },
    matchBlock: {
        justifyContent: 'space-between',
        width: 160,
        minHeight: 60,
        paddingTop: 20,
        paddingHorizontal: 10,
        paddingBottom: 14,
        backgroundColor: '#282A31',
        borderRadius: 6,
        marginBottom: 12,
    },
    clock: {
        position: 'absolute',
        top: -10,
        left: 8,
        width: 40,
        height: 20,
        borderRadius: 40,
        alignItems: 'center',
        justifyContent: 'center',
    },
    clockText: {
        fontFamily: FONT_NAMES.RRBlack,
        fontSize: 10,
        color: '#fff',
    },
    team: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    teamText: {
        fontFamily: FONT_NAMES.RRRegular,
        fontSize: 10,
        color: '#fff',
    }
});
