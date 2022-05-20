import AsyncStorage from '@react-native-async-storage/async-storage';

export const storeData = async (value, stringName) => {
    try {
        const stringValue = typeof value === 'string' ? value : JSON.stringify(value);
        await AsyncStorage.setItem(stringName, stringValue);
    } catch (error) {
        // log error
        console.log(error);
    }
};

export const getData = async (value) => {
    try {
        const jsonValue = await AsyncStorage.getItem(value);
        return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch (error) {
        // log error
        console.log(error);
    }
};

export const clearAll = async () => {
    try {
        await AsyncStorage.clear();
    } catch (error) {
        // error
        console.log(error);
    }
};
