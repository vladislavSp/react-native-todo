import React, { useState } from "react";
import { TouchableHighlight, Text, StyleSheet } from "react-native";

export default function ListItem({ item }) {
    const [check, setCheck] = useState(false);
    const handleCheck = () => setCheck(prev => !prev);

    return (
        <TouchableHighlight
            onPress={handleCheck}
            activeOpacity={0.8}
            style={styles.item}
            underlayColor="#E0E0E0"
        >
            <Text style={[styles.text, check ? styles.textCheck : '']}>{item.text}</Text>
        </TouchableHighlight>
    )
};

const styles = StyleSheet.create({
    item: {
        overflow: 'hidden',
        marginBottom: 16,
        borderRadius: 16,
    },
    text: {
        padding: 20,
        overflow: 'hidden',
        backgroundColor: "#fff",
        borderRadius: 16,
        color: "#000",
        fontSize: 18,
    },
    textCheck: {
        backgroundColor: 'rgba(51, 204, 153, 0.5)',
        textDecorationLine: 'line-through',
    }
});
