import React from 'react';
import { View, StyleSheet } from 'react-native';

const Padding = ({ children }) => (
    <View style={styles.container}>
        { children }
    </View>
);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 25,
    },
});

export default Padding;
