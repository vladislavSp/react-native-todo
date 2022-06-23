import React from 'react';
import { View, StyleSheet } from 'react-native';

const MainBg = ({ children }) => (
    <View style={styles.wrapper}>
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
