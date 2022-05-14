import React, { useState } from "react";
import { storeData } from '../utils/storeUtils';
import { StyleSheet, View, Text, TextInput, KeyboardAvoidingView, Platform, TouchableOpacity } from "react-native";

export default function Form({ setTasks }) {
    const [value, setValue] = useState('');

    const handleAddValue = () => {
        if (value.length > 0) {
            const newValue = { text: value };
            setTasks(prev => ([
                ...prev,
                newValue,
            ]), (nextState) => storeData(nextState, 'taskList'));
            setValue('');
        } else {
            // добавить обработчик для пустого значения
        }
    }

    return (
        <KeyboardAvoidingView
            style={styles.writeWrapper}
            behavior={Platform.OS === 'ios' ? "padding" : "height" }
        >
            <TextInput
                value={value}
                style={styles.input}
                onChangeText={text => setValue(text)}
                placeholder="Введите текст..."
                placeholderTextColor={"#fff"}
            />
            <TouchableOpacity onPress={handleAddValue}>
                <View style={styles.addWrapper}>
                    <Text style={styles.addText}>+</Text>
                </View>
            </TouchableOpacity>
        </KeyboardAvoidingView>
    )
};

const styles = StyleSheet.create({
    writeWrapper: {
        position: 'absolute',
        paddingHorizontal: 24,
        width: '100%',
        bottom: 60,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    input: {
        width: 250,
        paddingVertical: 15,
        paddingHorizontal: 15,
        color: '#fff',
        backgroundColor: '#33CC99',
        borderRadius: 60,
        textAlign: 'center',
    },
    addWrapper: {
        alignItems: 'center',
        justifyContent: 'center',
        width: 60,
        height: 60,
        borderRadius: 60,
        backgroundColor: '#33CC99',
    },
    addText: {
        color: '#FFF',
    }
});
