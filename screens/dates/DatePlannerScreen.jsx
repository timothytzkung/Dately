import React from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import { Calendar, Save } from 'lucide-react-native';
import {
    useNavigation
} from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';

export const DatePlannerScreen = () => {
    const navigation = useNavigation();

    return (
        <SafeAreaView style={s.container}>
            {/* Main Scrollable */}
            <ScrollView style={s.scrollView}>
                <Button onPressIn={() => navigation.navigate('Home')}>
                    Go to Home Screen
                </Button>

                <View style={s.header}>
                    <Text style={s.headerTitle}>Date Planner</Text>
                    <Text style={s.headerSubtitle}>Create your perfect date</Text>
                </View>


            </ScrollView>
        </SafeAreaView>
    )
}