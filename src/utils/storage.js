// Manage storage
import AsyncStorage from '@react-native-async-storage/async-storage';
// import Alert from 'react-native'

// Setter function db
export const setData = async(key, val) => {
    console.log("Set data called")
    try {
        await AsyncStorage.setItem(key, JSON.stringify(val));
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

export const saveUserPreferences = async(dateType, budget, transportType="driving") => {
    try {
        await setData("userPreferences", {
            DateType: dateType,
            Budget: budget,
            TransportType: transportType
        });
    } catch(e) {
        console.log("Issue in savings preferences");
    }
}

export const loadUserPreferences = async() => {
    try {
        const userPreferences = await(getData("userPreferences"));
        return userPreferences;
    } catch(e) {
        console.log("Issue fetching preferences")
        return null;
    }

}
