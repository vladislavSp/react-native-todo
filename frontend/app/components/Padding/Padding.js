import React from 'react';
import { View, StyleSheet } from 'react-native';

const Padding = ({ children, top }) => (
    <View style={[styles.container, styles.top(top)]}>
        { children }
    </View>
);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 25,
    },
    top(value = 0) {
        return {
            paddingTop: value,
        }
    },
});

export default Padding;
