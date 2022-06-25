import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    tabList: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 28,
    },
    tab: {
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 6,
        width: '30%',
        height: 43,
    },
    tabText: {
        fontFamily: 'RoadRadioBlack',
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
