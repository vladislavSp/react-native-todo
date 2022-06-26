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
    matchesGrid: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 24,
    },
    matchBlock: {
        height: 60,
        paddingTop: 18,
        paddingHorizontal: 10,
        paddingBottom: 14,
        borderRadius: 6,
        width: '48%',
        backgroundColor: '#282A31',
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
    teams: {
        height: '100%',
        justifyContent: 'space-between',
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
