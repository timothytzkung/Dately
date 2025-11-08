import React from 'react';
import { View, Text, ScrollView } from 'react-native';
import { DollarSign } from 'lucide-react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { globalStyles as styles } from '../../globalStyles';


export const SavedDatesScreen = () => {
  // Temp data => later moved to AsyncStorage
  const savedDates = [
    { id: 1, title: 'Romantic Dinner', date: '2025-10-25', cost: '$150' },
    { id: 2, title: 'Adventure Day', date: '2025-11-02', cost: '$80' },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Saved Dates</Text>
        </View>

        {savedDates.map(date => (
          <View key={date.id} style={styles.card}>
            <View style={styles.cardContent}>
              <Text style={styles.cardTitle}>{date.title}</Text>
              <Text style={styles.cardDescription}>{date.date}</Text>
              <View style={styles.costBadge}>
                <DollarSign size={16} color="#4CAF50" />
                <Text style={styles.costText}>{date.cost}</Text>
              </View>
            </View>
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};
