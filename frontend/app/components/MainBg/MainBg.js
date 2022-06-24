import React from 'react';
import { View, StyleSheet, StatusBar } from 'react-native';

const MainBg = ({ children, style = 'light-content' }) => (
    <View style={styles.wrapper}>
        <StatusBar barStyle={style} backgroundColor="#282A31" />
        { children }
    </View>
);

const styles = StyleSheet.create({
    wrapper: {
        color: 'white',
        flex: 1,
        backgroundColor: '#000000',
    },
});

export default MainBg;
