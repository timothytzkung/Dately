import React from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { Calendar, Save } from 'lucide-react-native';
import {
    useNavigation
} from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { globalStyles as styles } from '../../globalStyles';
import { ItineraryCard } from '../../components';

export const DatePlanScreen = ({ navigation }) => {
  // const dateInfo = [
  //   { id: 1, time: '6:00 PM', title: 'Italian Restaurant', cost: '$120 for two' },
  // ];
  const dateInfo = [
    {id: 1, title: "Dinner Night by Waterfront", theme: "Evening Dinner"}
  ]

    return (
      <SafeAreaView style={styles.container}>
        <ScrollView style={styles.scrollView}>
          <View style={styles.header}>
            <Text style={styles.headerTitle}>{dateInfo[0].title}</Text>
            <Text style={styles.headerSubtitle}>{dateInfo[0].theme}</Text>
          </View>

          <ItineraryCard 
            time="6:00 PM"
            title="Italian Restaurant"
            description="Fine dining experience"
            cost="$120 for two"
          />

          <ItineraryCard 
            time="8:30 PM"
            title="Evening Walk"
            description="Waterfront Park Stroll"
            cost="Free"
          />
  
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