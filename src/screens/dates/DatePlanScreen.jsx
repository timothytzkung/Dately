import React from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import { Calendar, Save } from 'lucide-react-native';
import {
    useNavigation
} from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { globalStyles as styles } from '../../globalStyles';

export const DatePlanScreen = ({ navigation }) => {
    return (
      <SafeAreaView style={styles.container}>
        <ScrollView style={styles.scrollView}>
          <View style={styles.header}>
            <Text style={styles.headerTitle}>Your Date Plan</Text>
            <Text style={styles.headerSubtitle}>Romantic Dinner</Text>
          </View>
  
          <View style={styles.itineraryCard}>
            <Text style={styles.itineraryTime}>6:00 PM</Text>
            <Text style={styles.itineraryTitle}>Italian Restaurant</Text>
            <Text style={styles.itineraryDescription}>Fine dining experience</Text>
            <Text style={styles.itineraryCost}>$120 for two</Text>
          </View>
  
          <View style={styles.itineraryCard}>
            <Text style={styles.itineraryTime}>8:30 PM</Text>
            <Text style={styles.itineraryTitle}>Evening Walk</Text>
            <Text style={styles.itineraryDescription}>Waterfront park stroll</Text>
            <Text style={styles.itineraryCost}>Free</Text>
          </View>
  
          <View style={styles.buttonRow}>
            
            <TouchableOpacity 
              style={styles.outlineButton}
              onPress={() => navigation.navigate('EditDatePlan')}
            >
              <Text style={styles.outlineButtonText}>Edit</Text>
            </TouchableOpacity>

            <TouchableOpacity 
              style={styles.primaryButton}
              onPress={() => navigation.navigate('AddImage')}
            >
              <Text style={styles.primaryButtonText}>Save & Add Photos</Text>
            </TouchableOpacity>

          </View>
        </ScrollView>
      </SafeAreaView>
    );
  };