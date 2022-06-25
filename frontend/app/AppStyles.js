import { StyleSheet } from 'react-native';

export const FONT_NAMES = {
    RRRegular: 'RoadRadio',
    RRBlack: 'RoadRadioBlack',
    RRBold: 'RoadRadioBold',
    RRLight: 'RoadRadioLight',
    RRThin: 'RoadRadioThin',
};

const styles = StyleSheet.create({
    header: {
        backgroundColor: '#282A31',
        height: 110,
        borderBottomWidth: 0,
    },
    headerText: {
        paddingBottom: 20,
        textTransform: 'uppercase',
        color: '#fff',
        fontSize: 34,
        fontWeight: '700',
        fontFamily: 'RoadRadioBlack',
    },
    tabBar: {
        paddingTop: 27,
        height: 85,
        backgroundColor: '#282A31',
        borderTopColor: '#282A31',
    },
    indicatorScreen: {
        backgroundColor: '#000',
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    }
});

export default styles;
