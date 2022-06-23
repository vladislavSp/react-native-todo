import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    input: {
        borderWidth: 1,
        borderColor: 'transparent',
        flexDirection: 'row',
        alignItems: 'center',
        width: 270,
        borderRadius: 12,
        backgroundColor: '#282A31',
    },
    inputField: {
        paddingLeft: 50,
        width: 270,
        height: 47,
        color: '#fff',
        fontFamily: 'RoadRadio',
        fontSize: 14,
        textTransform: 'none',
    },
    icon: {
        position: 'absolute',
        width: 22,
        height: 15,
        marginRight: 11,
        marginLeft: 16,
    },
    inputError: {
        borderColor: 'red',
        borderWidth: 1,
    }
});
