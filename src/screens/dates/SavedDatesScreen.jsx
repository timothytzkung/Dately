import React from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { DollarSign } from 'lucide-react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { globalStyles as styles } from '../../globalStyles';
import { DateCard } from '../../components/Cards/DateCard';
import { useNavigation } from '@react-navigation/native';


export const SavedDatesScreen = ( ) => {
  const navigation = useNavigation();
  const savedDates = [
    { id: 1, title: 'Romantic Evening by Waterfront', date: '2025-10-25', cost: '$150' },
    { id: 2, title: 'Escape Room Afternoon!', date: '2025-11-02', cost: '$80' },
  ];

  const handleCardPress = (date) => {
    console.log('Card pressed:', date);
    // Navigate to date details or edit screen
    navigation.navigate('DatePlan', { dateId: date.id });
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Saved Dates</Text>
        </View>

        {savedDates.map(date => (
          <DateCard 
            key={date.id} 
            date={date} 
            onPress={handleCardPress}
          />
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};