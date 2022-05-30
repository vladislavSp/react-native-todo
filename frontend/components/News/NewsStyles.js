import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    wrapper: {
        flex: 1,
        backgroundColor: '#000000',
    },
    container: {
        flex: 1,
        paddingTop: 38,
        paddingHorizontal: 25,
    },
    slide: {
        borderRadius: 15,
        width: 160,
        height: 160,
        justifyContent: 'flex-end',
        marginBottom: 16,
    },
    textWrap: {
        flexDirection: 'row',
        alignItems: 'center',
        marginLeft: 10,
        marginBottom: 24,
    },
    text: {
        marginLeft: 6,
        color: '#fff',
        maxWidth: 100,
        fontFamily: 'PilatExtended-Heavy',
        fontSize: 12,
        textTransform: 'uppercase',
        textAlignVertical: 'bottom',
    },
});