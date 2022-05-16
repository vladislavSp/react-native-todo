import React, { useState } from "react";
import { TouchableHighlight, Text, StyleSheet, Button, View } from "react-native";
import Swipeable from 'react-native-gesture-handler/Swipeable';
import { RectButton } from 'react-native-gesture-handler';

export default function ListItem({ item, index, row, closeRow, onDelete }) {
    const [check, setCheck] = useState(false);
    const [swipeOpen, setSwipeOpen] = useState(false);
    const handleCheck = () => setCheck(prev => !prev);

    const renderRightActions = () => {
        return (
            <RectButton style={styles.deleteBtn} onPress={onDelete}>
                <Text style={styles.deleteBtnText}>Удалить</Text>
            </RectButton>
        );
  };

    return (
        <Swipeable
            renderRightActions={renderRightActions}
            onSwipeableOpen={() => closeRow(index)}
            ref={(ref) => (row[index] = ref)}
            rightOpenValue={-150}
            enableTrackpadTwoFingerGesture
            friction={2}
        >
            <TouchableHighlight
                onPress={handleCheck}
                activeOpacity={0.8}
                style={[styles.item, swipeOpen ? styles.itemSwipe : '']}
                underlayColor="#E0E0E0"
            >
                <Text style={[styles.text, check ? styles.textCheck : '']}>{item.text}</Text>
            </TouchableHighlight>
        </Swipeable>
    )
};

const styles = StyleSheet.create({

    item: {
        margin: 6,
        paddingLeft: 24,
        overflow: 'hidden',
        borderRadius: 16,
    },
    itemSwipe: {
        borderTopRightRadius: 0,
        borderBottomRightRadius: 0,
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
    deleteBtn: {
        margin: 0,
        alignItems: 'center',
        justifyContent: 'center',
        width: 80,
        borderRadius: 16,
    },
    deleteBtnText: {
        color: '#FF0000',
        textAlign: 'center',
    }
});
