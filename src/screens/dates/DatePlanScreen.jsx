import React from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { Calendar, Save, Share } from 'lucide-react-native';
import {
    useNavigation
} from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { globalStyles as styles } from '../../globalStyles';
import { ItineraryCard } from '../../components';
import { CalendarService } from '../../utils/calendarService';

export const DatePlanScreen = ({ route, navigation }) => {

  // Temp hard coded
  const datePlan = route.params?.datePlan || {
    title: 'Dinner Night by Waterfront',
    theme: "Evening Dinner",
    date: '2025-11-15',
    dateTime: new Date('2025-11-15T18:00:00'),
    itinerary: [
      { time: '6:00 PM', title: 'Italian Restaurant', location: '123 Main St', cost: '$120' },
      { time: '8:30 PM', title: 'Evening Walk', location: 'Waterfront Park', cost: 'Free' },
      { time: '9:30 PM', title: 'Movie & Drinks', location: 'Home', cost: '$10-20'}
    ],
    totalCost: '$120',
  };


  const handleAddToCalendar = async () => {
    // HapticFeedback.light();
    console.log("Calendar called")
    
    // Check if already added
    console.log("Checking if calendar event exists...")
    const exists = await CalendarService.checkEventExists(datePlan.title, datePlan.dateTime);
    if (exists) {
      Alert.alert(
        'Already Added',
        'This date is already in your calendar.',
        [{ text: 'OK' }]
      );
      return;
    }
    console.log("Attempting to add to calendar")
    const result = await CalendarService.addDateToCalendar(datePlan);
    if (result.success) {
      // HapticFeedback.success();
      console.log("Success!")
    }
  };


    return (
      <View style={styles.container}>
        <SafeAreaView edges={['right', 'top', 'left']}/>

        <ScrollView style={styles.scrollView}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>{datePlan.title}</Text>
          <Text style={styles.headerSubtitle}>{datePlan.theme}</Text>
        </View>

          <View style={styles.buttonRow}>
          <TouchableOpacity 
              style={styles.shareButton}
              // onPress={handleShare}
            >
              <Share size={20} color="#E91E63" />
              <Text style={styles.shareButtonText}>Share</Text>
            </TouchableOpacity>

            <TouchableOpacity 
              style={styles.calendarButton}
              onPress={handleAddToCalendar}
            >
              <Calendar size={20} color="#fff" />
              <Text style={styles.calendarButtonText}>Add to Calendar</Text>
            </TouchableOpacity>
            

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

          <ItineraryCard 
            time="9:30 PM"
            title="Movie & Drinks"
            description="Watch a movie with drinks at home"
            cost="$10-20"
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
      </View>
    );
  };