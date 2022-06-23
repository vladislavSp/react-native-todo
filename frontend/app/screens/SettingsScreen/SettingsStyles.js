import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    wrapper: {
        alignItems: 'center',
        paddingTop: 38,
        flex: 1,
    },
    avatar: {
        width: 162,
        height: 162,
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
        marginBottom: 40,
        borderColor: '#282A31',
        borderWidth: 8,
        borderRadius: 82,
        overflow: 'hidden',
    },
    gradient: {
        position: 'absolute',
        top: 0, left: 0,
        width: '100%',
        height: '100%',
    },
    text: {
        color: '#fff',
    },
    avatarText: {
        fontFamily: 'RoadRadioBlack',
        fontSize: 68,
    },
    nameWrap: {
        marginBottom: 20,
        alignItems: 'center',
    },
    name: {
        width: 260,
        height: 48,
        fontFamily: 'RoadRadioBlack',
        fontSize: 20,
        lineHeight: 20,
        borderRadius: 12,
        backgroundColor: 'rgba(40, 42, 49, 0.4)',
    },
    changeNameBtn: {
        width: 48,
        paddingVertical: 6,
        color: '#fff',
        fontFamily: 'RoadRadioLight',
        fontSize: 12,
        textAlign: 'center',
    },
    sexSection: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 32,
    },
    sexWrap: {
        flexDirection: 'row',
        alignItems: 'center',
        marginRight: 15,
    },
    sexImg: {
        width: 21,
        height: 21,
        marginRight: 8,
    },
    sexText: {
        fontSize: 12,
        fontFamily: 'RoadRadioLight',
    },
    sexBtn: {
        width: 91,
        height: 35,
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        backgroundColor: '#282A31',
        borderRadius: 7,
    },
    sexBtnFirst: {
        marginRight: 9,
    },
    navSection: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 40,
    },
    linkView: {
        alignItems: 'center',
        justifyContent: 'center',
        width: 124,
        height: 96,
        borderRadius: 12,
        overflow: 'hidden',
    },
    linkViewFirst: {
        marginRight: 17,
    },
    linkInside: {
        alignItems: 'center',
    },
    imgLink: {
        marginBottom: 11,
    },
    linkText: {
        fontFamily: 'RoadRadio',
    },
    logoutBtn: {
        alignItems: 'center',
        justifyContent: 'center',
        width: 145, height: 38,
        backgroundColor: '#282A31',
        borderRadius: 10,
    },
    logoutBtnText: {
        fontSize: 15,
        fontFamily: 'RoadRadio',
    }
});
