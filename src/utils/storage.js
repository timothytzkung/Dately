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

export const addDatePlan = async (datePlan) => {
    try {
      
      const exists = await doesDatePlanExist(datePlan.id);
      if (exists) {
        return { success: false, reason: "duplicate"};
      }

      const stored = await AsyncStorage.getItem("datePlans");
      const list = stored ? JSON.parse(stored) : [];
  
      list.push(datePlan);
      await AsyncStorage.setItem("datePlans", JSON.stringify(list));
      return { success: true }
    } catch (e) {
      console.error(e);
      return { succss: false }
    }
};

export const getAllDatePlans = async () => {
    try {
      const stored = await AsyncStorage.getItem("datePlans");
      return stored ? JSON.parse(stored) : [];
    } catch (e) {
      console.error(e);
      return [];
    }
};

export const doesDatePlanExist = async(id) => {
    try {
      const stored = await AsyncStorage.getItem("datePlans");
      const plans = stored ? JSON.parse(stored) : [];

      return plans.some((plan) => plan.id === id);
    } catch (e) {
        console.log("Error checking date plan: ", e)
        return false;
    }
}

export const clearAllData = async() => {
    await AsyncStorage.getAllKeys()
        .then(keys => AsyncStorage.multiRemove(keys))
        .then(() => alert('success'));
}