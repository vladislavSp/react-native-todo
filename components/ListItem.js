import React, { useState } from "react";
import { TouchableHighlight, Text, StyleSheet, Button, View } from "react-native";
import Swipeable from 'react-native-gesture-handler/Swipeable';


export default function ListItem({ item, index, row, closeRow, onDelete }) {
    const [check, setCheck] = useState(false);
    const handleCheck = () => setCheck(prev => !prev);

    const renderRightActions = () => {
        return (
            <View style={styles.deleteButton}>
                <Button
                    onPress={onDelete}
                    color="red"
                    title="Удалить"
                >
                </Button>
            </View>
        );
  };

    return (
        <Swipeable
            renderRightActions={renderRightActions}
            onSwipeableOpen={(direction) => {
                console.log(direction);
                closeRow(index);
            }}
            ref={(ref) => (row[index] = ref)}
            rightOpenValue={-150}
            enableTrackpadTwoFingerGesture
            friction={2}
        >
            <TouchableHighlight
                onPress={handleCheck}
                activeOpacity={0.8}
                style={styles.item}
                underlayColor="#E0E0E0"
            >
                <Text style={[styles.text, check ? styles.textCheck : '']}>{item.text}</Text>
            </TouchableHighlight>
        </Swipeable>
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
    },
    deleteButton: {
        margin: 0,
        alignContent: 'center',
        width: 80,
        justifyContent: 'center',
    }
});
