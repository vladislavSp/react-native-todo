import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    wrapper: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#000',
    },
    headerText: {
        fontSize: 34,
        fontFamily: 'RoadRadioBlack',
        color: '#fff',
        marginBottom: 50,
    },
    input: {
        flexDirection: 'row',
        alignItems: 'center',
        width: 265,
        borderRadius: 12,
        backgroundColor: '#282A31',
    },
    inputField: {
        paddingLeft: 50,
        width: 265,
        height: 47,
        color: '#fff',
        fontFamily: 'RoadRadio',
        fontSize: 14,
    },
    icon: {
        position: 'absolute',
        width: 22,
        height: 15,
        marginRight: 11,
        marginLeft: 16,
    },
    iconPass: {
        height: 22,
    },
    iconName: {
        height: 17,
    },
    forgotText: {
        width: 270,
        marginTop: 14,
        marginRight: 12,
        fontFamily: 'RoadRadioLight',
        fontSize: 10,
        lineHeight: 10,
        color: '#fff',
        textAlign: 'right',
    },
    button: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        width: 270,
        marginTop: 45,
        borderRadius: 15,
        height: 58,
        paddingHorizontal: 22,
    },
    buttonText: {
        fontFamily: 'RoadRadioBlack',
        color: '#fff',
        fontSize: 20,
        textTransform: 'uppercase',
    },
    buttonIcon: {
        position: 'absolute',
        right: 22,
    },
    haveAccountText: {
        marginTop: 14,
        marginBottom: 44,
        color: '#fff',
        fontFamily: 'RoadRadioLight',
        fontSize: 10,
    },
    errorText: {
        color: 'red',
        position: 'absolute',
        top: 200,
        left: 100,
    }
});
