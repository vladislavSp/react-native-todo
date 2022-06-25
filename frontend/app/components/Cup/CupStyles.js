import { StyleSheet } from 'react-native';
import { FONT_NAMES } from '../../AppStyles';

export const styles = StyleSheet.create({
    groupBlock: {
        minHeight: 110,
        paddingTop: 11,
        paddingHorizontal: 13,
        paddingBottom: 13,
        backgroundColor: '#282A31',
        borderRadius: 6,
        justifyContent: 'space-between',
        marginBottom: 16,
    },
    statsHeader: {
        marginBottom: 8,
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    headerGroup: {
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'row',
        width: 140,
    },
    stats: {
        flexDirection: 'row',
        width: 140,
        justifyContent: 'space-between',
        marginLeft: 'auto',
    },
    groupTitle: {
        fontFamily: 'RoadRadioBlack',
        fontSize: 9,
        color: '#fff',
    },
    groupRow: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    numberTeam: {
        width: 16,
        fontFamily: 'RoadRadioBlack',
        fontSize: 11,
        color: '#fff',
    },
    nameTeam: {
        fontFamily: FONT_NAMES.RRBlack,
        fontSize: 12,
        lineHeight: 15,
        color: '#fff',
        width: 150,
    },
    statBigText: {
        fontFamily: FONT_NAMES.RRBlack,
        fontSize: 15,
        color: '#fff',
    },
    statText: {
        fontFamily: FONT_NAMES.RRRegular,
        fontSize: 10,
        lineHeight: 15,
        color: '#fff',
    },
    firstHeaderText: {
        width: 43,
        textAlign: 'center',
    },
    lastHeaderText: {
        width: 43,
        textAlign: 'center',
    },
    winText: {
        width: 15,
        textAlign: 'center',
    },
    drawText: {
        width: 15,
        textAlign: 'center',
    },
    loseText: {
        width: 15,
        textAlign: 'center',
    },
});
