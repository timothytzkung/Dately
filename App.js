if (__DEV__) {
    require("./ReactotronConfig");
}

import Reactotron from "reactotron-react-native"
import {
    NavigationContainer,
    useNavigation
} from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import * as React from 'react';
import { useState, useEffect } from 'react';
import {
    DatePlanScreen, 
    DatePlannerScreen,
    AllowLocationScreen, 
    LoginScreen, 
    RegisterScreen,
    GenerateDateScreen, 
    EditDatePlanScreen,
    SavedDatesScreen,
    ViewAttractionsScreen,
    AddImageScreen,
    ScrapbookCollectionScreen,
    ScrapbookViewScreen,
    OutingTypeScreen,
    MaxBudgetScreen,
    TransportTypeScreen
} from './src/screens';

import {
    ItineraryCard
} from './src/components'

// Auth Firebase
// import { onAuthStateChanged } from 'firebase/auth';
import { firebase_auth } from './src/utils/firebaseConfig';
import { AuthProvider, useAuth } from './src/utils/AuthContext';
import { setData, getData } from './src/utils/storage';

// Icons that are likely needed
import { Camera, Heart, ClipboardList, Home, User, MapPin, Calendar, DollarSign, Save, ImagePlus } from 'lucide-react-native';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

// Date Stack Navigator
const DateStack = () => {
    return (
    <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName="DatePlanner">
        <Stack.Screen name="DatePlanner" component={DatePlannerScreen} />
        <Stack.Screen name="DatePlan" component={DatePlanScreen} />
        <Stack.Screen name="GenerateDate" component={GenerateDateScreen} />
        <Stack.Screen name="SavedDates" component={SavedDatesScreen} />
        <Stack.Screen name="EditDatePlan" component={EditDatePlanScreen} />
        <Stack.Screen name="AddImage" component={AddImageScreen} />
    </Stack.Navigator>
    );
}

// Scrapbook Stack Navigator
const ScrapbookStack = () => {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName="ScrapbookCollection">
            <Stack.Screen name="ScrapbookCollection" component={ScrapbookCollectionScreen} />
            <Stack.Screen name="ScrapbookView" component={ScrapbookViewScreen} />
        </Stack.Navigator>
    );
};
  

// Questionnaire Stack Navigator
const QuestionnaireStack = () => {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName="OutingType">
            <Stack.Screen name="OutingType" component={OutingTypeScreen} />
            <Stack.Screen name="MaxBudget" component={MaxBudgetScreen} />
            <Stack.Screen name="TransportType" component={TransportTypeScreen} />
        </Stack.Navigator>
    );
}

// Main Tabs Navigator
const MainTabs = () => {
    return (
    <Tab.Navigator
        screenOptions={{
            headerShown: false,
            tabBarActiveTintColor: '#E91E63',
            tabBarInactiveTintColor: '#999'
        }}
    >
        <Tab.Screen 
            name="Home"
            component={DateStack}
            options={{
                tabBarIcon: ( { color }) => <Home size={24} color={color} />
            }}
        />
        <Tab.Screen 
            name="Scrapbook"
            component={ScrapbookStack}
            options={{
                tabBarIcon: ( { color }) => <Camera size={24} color={color} />
            }}
        />
        <Tab.Screen 
            name="Questionnaire"
            component={QuestionnaireStack}
            options={{
                tabBarIcon: ( { color }) => <ClipboardList size={24} color={color} />,
                unmountOnBlur: true
            }}
        />

    </Tab.Navigator>
    );
}

// Auth Stack Navigator
const AuthStack = () => {
    return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Register" component={RegisterScreen} />
        <Stack.Screen name="AllowLocation" component={AllowLocationScreen} />
    </Stack.Navigator>
    );
}

// App Navigator
const AppNavigator = () => {
    const { user } = useAuth();

    console.log('AppNavigator - Current user:', user);
    console.log('AppNavigator - Showing:', user ? 'MainTabs' : 'AuthStack');

    return (
        <NavigationContainer>
            {user ? 
            <MainTabs /> 
            :
            <AuthStack />        
        }
        </NavigationContainer>
    )
}


// Main App Component
export default function App() {

    return (
        <AuthProvider>
            <AppNavigator />
        </AuthProvider>
    );
}