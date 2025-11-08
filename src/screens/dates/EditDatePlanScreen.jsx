import React from 'react';
import { View, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { globalStyles as styles } from '../../globalStyles';

export const EditDatePlanScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.centerContainer}>
        <Text style={styles.title}>Edit Date Plan</Text>
        <Text style={styles.subtitle}>Modify your itinerary</Text>
      </View>
    </SafeAreaView>
  );
};