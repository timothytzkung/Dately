import React, {useState} from 'react';
import { View, Text, TouchableOpacity, ScrollView, FlatList } from 'react-native';
import { Calendar, Save, Share } from 'lucide-react-native';
import {
    useNavigation
} from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { globalStyles as styles } from '../../globalStyles';
import { ItineraryCard } from '../../components';
import { CalendarService } from '../../utils/CalendarService';
import { setData, seeStorage } from '../../utils/storage';

export const DatePlanScreen = ({ route }) => {

  const navigation = useNavigation();

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

  
  const itineraryList = () => {
    // Tells FlatList how to render each single item
    const renderItineraryItem = ({ item }) => (
      <ItineraryCard item={item} />
    );

    return (        
          <FlatList
              style={styles.flatList}
              data={datePlan.itinerary}
              // returns a component for each item

              renderItem={renderItineraryItem}
              keyExtractor={(item) => item.placeId}
          />
  );
  }

  const handleSaveDate = async(datePlan) => {
    try {
      await setData(datePlan.dateTime, datePlan);
      console.log("Finished Saving!")
    } catch (e) {
      console.log("Had issue saving date: ", e);
    }
  }

  const handleSaveAndMove = async() => {
    await handleSaveDate(datePlan)
    .then(await seeStorage())
    .then(
      navigation.navigate('AddImage'))
  }


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
      console.log("Success!")
    }
  };


    return (
      <View style={styles.container}>
        <SafeAreaView edges={['right', 'top', 'left']}/>

        <View style={styles.scrollView}>
          <View style={styles.header}>
            <Text style={styles.headerTitle}>{datePlan.title}</Text>
            <Text style={styles.headerSubtitle}>{datePlan.dateType}</Text>
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

          {itineraryList()}

          <View style={styles.buttonRow}>

            <TouchableOpacity 
              style={styles.outlineButton}
              onPress={() => navigation.navigate('EditDatePlan')}
            >
              <Text style={styles.outlineButtonText}>Edit</Text>
            </TouchableOpacity>

            <TouchableOpacity 
              style={styles.primaryButton}
              onPress={handleSaveAndMove}
            >
              <Text style={styles.primaryButtonText}>Save & Add Photos</Text>
            </TouchableOpacity>

          </View>
        </View>
      </View>
    );
  };