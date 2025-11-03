import React from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import { Calendar, Save } from 'lucide-react-native';
import {
    useNavigation
} from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';


export const DatePlannerScreen = () => {
    const navigation = useNavigation();
    const brandColour = "#E91E63"

    return (
        <SafeAreaView style={styles.container}>
            {/* Main Scrollable */}
            <ScrollView style={styles.scrollView}>
                <View style={styles.header}>
                    <Text style={styles.headerTitle}>Date Planner</Text>
                    <Text style={styles.headerSubtitle}>Create your perfect date</Text>
                </View>

                {/* Card 1 - Generate Date */}
                <TouchableOpacity 
                    style={styles.card} 
                    onPress={() => navigation.navigate("GenerateDate")}
                >
                    <View style={styles.cardIcon}>
                        <Calendar size={32} color={brandColour} />
                    </View>
                    <View style={styles.cardContent}>
                        <Text style={styles.cardTitle}>Generate New Date</Text>
                        <Text style={styles.cardDescription}>Create a personalized date itinerary</Text>
                    </View>
                </TouchableOpacity>

                {/* Card 2 - View Saved Dates */}
                <TouchableOpacity 
                    style={styles.card}
                    onPress={() => navigation.navigate('SavedDates')}
                    >
                    <View style={styles.cardIcon}>
                        <Save size={32} color="#E91E63" />
                    </View>
                    <View style={styles.cardContent}>
                        <Text style={styles.cardTitle}>Saved Dates</Text>
                        <Text style={styles.cardDescription}>View your saved date plans</Text>
                    </View>
                </TouchableOpacity>

                {/* Section - Update Preferences / Data */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Quick Preferences</Text>
                    <TouchableOpacity 
                        style={styles.preferenceButton}
                        onPress={() => navigation.navigate('Questionnaire', { screen: 'OutingType' })}
                    >
                        <Text style={styles.preferenceButtonText}>Update Date Preferences</Text>
                    </TouchableOpacity>
                </View>


            </ScrollView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff'
    },
    scrollView: {
        flex: 1,
        padding: 20
    },
    headerTitle: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 4,
    },
    headerSubtitle: {
        fontSize: 16,
        color: '#676',
    },
    card: {
        backgroundColor: '#fff',
        borderRadius: 12,
        padding: 16,
        marginTop: 16,
        marginBottom: 0,
        flexDirection: 'row',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    cardIcon: {
        marginRight: 16
    },
    cardContent: {
        flex: 1
    },
    cardTitle: {
        fontSize: 18,
        fontWeight: '600',
        color: '#333',
        marginBottom: 4,
    },
    cardDescription: {
        fontSize: 14,
        color: '#666',
    },
    section: {
        marginTop: 24,
        marginBottom : 24
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: '600',
        marginBottom: 12,
        color: '#333',
    },
    preferenceButton: {
        backgroundColor: '#f5f5f5',
        padding: 16,
        borderRadius: 8,
        alignItems: 'center',
    },
    preferenceButtonText: {
        color: '#E91E63',
        fontSize: 16,
        fontWeight: '600',
    },


})