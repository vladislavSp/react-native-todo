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
        resizeMode: 'contain',
    },
    textUpdate: {
        color: '#fff',
        fontFamily: 'RoadRadioBlack',
        fontSize: 18,
        lineHeight: 24,
        textAlign: 'center',
        maxWidth: 320,
    },
    updateBtn: {
        marginTop: 10,
        padding: 8,
        paddingVertical: 10,
        fontFamily: 'RoadRadioBlack',
        backgroundColor: '#282A31',
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
    }
});