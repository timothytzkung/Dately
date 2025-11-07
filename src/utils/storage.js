// Manage storage
import AsyncStorage from '@react-native-async-storage/async-storage';
// import Alert from 'react-native'

// Setter function db
export const setData = async(key, val) => {
    try {
        await AsyncStorage.setItem(key, JSON.stringify(value));
    } catch(e) {
        console.log("Error saving data", e);
    }
}

// Getter function db
export const getData = async(key) => {
    try {
        const val = await AsyncStorage.getItem(key);
        return val != null ? JSON.parse(val) : null;
    } catch (e) {
        console.log("Error fetching data", e);
    }
}

// Remover function db
export const removeData = async(key) => {
    try {
        await AsyncStorage.removeItem(key);
    } catch(e) {
        console.error("Error deleting data", e);
    }
}