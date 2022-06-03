import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    list: {
        paddingTop: 38,
    },
    slide: {
        overflow: 'hidden',
        borderRadius: 15,
        width: 160,
        height: 160,
        marginBottom: 16,
    },
    gradient: {
        position: 'absolute',
        top: 0, left: 0,
        width: '100%',
        height: '100%',
        justifyContent: 'flex-end',
        opacity: 0.8,
    },
    textWrap: {
        marginTop: 'auto',
        flexDirection: 'row',
        alignItems: 'center',
        marginLeft: 10,
        marginBottom: 16,
    },
    text: {
        marginLeft: 6,
        color: '#fff',
        maxWidth: 100,
        fontFamily: 'PilatExtended-Heavy',
        fontSize: 10,
        textTransform: 'uppercase',
        textAlignVertical: 'bottom',
    },
});