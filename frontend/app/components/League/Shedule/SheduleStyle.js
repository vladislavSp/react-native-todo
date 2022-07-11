import { StyleSheet } from 'react-native';
import { FONT_NAMES } from '../../../AppStyles';

export const styles = StyleSheet.create({
    title: {
        marginBottom: 20,
        fontFamily: FONT_NAMES.RRBlack,
        fontSize: 15,
        lineHeight: 15,
        color: '#fff',
    },
    matchBlock: {
        justifyContent: 'space-between',
        width: '100%',
        minHeight: 60,
        marginBottom: 24,
        paddingTop: 20,
        paddingHorizontal: 10,
        paddingBottom: 14,
        backgroundColor: '#282A31',
        borderRadius: 6,
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
