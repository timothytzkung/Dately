import {
    NavigationContainer,
    useNavigation
} from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import * as React from 'react';
import {useState } from 'react';
import {
    DetailsScreen, HomeScreen, DatePlannerScreen,
    AllowLocationScreen, LoginScreen, RegisterScreen
} from './src/screens';

// Auth Firebase
// import { onAuthStateChanged } from 'firebase/auth';
import { firebase_auth } from './src/utils/firebaseConfig';
import { AuthProvider } from './src/utils/AuthContext';

// Icons that are likely needed
import { Camera, Heart, ClipboardList, Home, User, MapPin, Calendar, DollarSign, Save, ImagePlus } from 'lucide-react-native';

const ProtectedStack = createNativeStackNavigator();
const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

// Date Stack Navigator
const DateStack = () => {
    return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="DatePlanner" component={DatePlannerScreen} />
        <Stack.Screen name="Home" component={HomeScreen} />
    </Stack.Navigator>
    );
}

// Scrapbook Stack Navigator
const ScrapbookStack = () => {

}

// Questionnaire Stack Navigator
const QuestionnaireStack = () => {

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


// Main App Component
export default function App() {
    const [user, setUser] = useState(null);
    
    return (
        <AuthProvider>
            <NavigationContainer>
                {/* <MainTabs /> */}

                {user ? <Maintabs /> : <AuthStack />}
            </NavigationContainer>
        </AuthProvider>
    );
}