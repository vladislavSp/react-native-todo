import AsyncStorage from '@react-native-async-storage/async-storage';
import * as SecureStore from 'expo-secure-store';

export const storeData = async (value, stringName, isToken) => {
    try {
        const stringValue = typeof value === 'string' ? value : JSON.stringify(value);
        await AsyncStorage.setItem(stringName, stringValue);
    } catch (error) { // log error
        console.log(error);
    }
};

export const getData = async (key) => {
    try {
        const jsonValue = await AsyncStorage.getItem(key);
        return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch (error) { // log error
        console.log(error);
    }
};

export const removeDataItem = async (key) => {
    try {
        await AsyncStorage.removeItem(key);
    } catch (error) {
        console.log(error);
    }
};

export const clearAll = async () => {
    try {
        await AsyncStorage.clear();
    } catch (error) { // error
        console.log(error);
    }
};

export const savePrivateKey =  async (key, value) => {
    await SecureStore.setItemAsync(key, value);
};

export const getPrivateKey = async (key) => {
    let result = await SecureStore.getItemAsync(key);

    if (result) {
        return result;
    }

    console.log(`Private key: ${key} not found`);
};

export const deletePrivateKey = async (key) => {
    await SecureStore.deleteItemAsync(key);
};
