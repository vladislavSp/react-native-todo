import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    slide: {
        width: 160,
        height: 160,
        marginBottom: 17,
        overflow: 'hidden',
        borderRadius: 15,
    },
    gradient: {
        position: 'absolute',
        top: 0, left: 0,
        width: '100%',
        height: '100%',
        opacity: 0.8,
    },
    background: {
        position: 'absolute',
        top: 0, left: 0,
        width: '100%',
        height: '100%',
    },
    textWrap: {
        marginTop: 'auto',
        flexDirection: 'row',
        alignItems: 'center',
        marginLeft: 10,
        marginBottom: 16,
    },
    text: {
        maxWidth: 105,
        marginLeft: 6,
        color: '#fff',
        fontFamily: 'RoadRadioBlack',
        fontSize: 14,
        textTransform: 'uppercase',
        textAlignVertical: 'bottom',
    },
    image: {
        width: 30,
        height: 30,
    }
});