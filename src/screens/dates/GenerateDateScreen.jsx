import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import {
    useNavigation
} from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { globalStyles as styles } from '../../globalStyles';


export const GenerateDateScreen = () => {
  const [dateType, setDateType] = useState('');
  const [budget, setBudget] = useState('');
  const navigation = useNavigation();

  const handleGenerate = () => {
    // TODO: Call date generation service
    navigation.navigate('DatePlan');
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Generate Date</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.label}>Date Type</Text>
          <View style={styles.chipContainer}>
            {['Dinner', 'Adventure', 'Relaxing', 'Romantic', 'Fun'].map(type => (
              <TouchableOpacity
                key={type}
                style={[styles.chip, dateType === type && styles.chipActive]}
                onPress={() => setDateType(type)}
              >
                <Text style={[styles.chipText, dateType === type && styles.chipTextActive]}>
                  {type}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.label}>Budget Range</Text>
          <View style={styles.chipContainer}>
            {['$', '$$', '$$$', '$$$$'].map(range => (
              <TouchableOpacity
                key={range}
                style={[styles.chip, budget === range && styles.chipActive]}
                onPress={() => setBudget(range)}
              >
                <Text style={[styles.chipText, budget === range && styles.chipTextActive]}>
                  {range}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <TouchableOpacity 
          style={styles.primaryButton}
          onPress={handleGenerate}
        >
          <Text style={styles.primaryButtonText}>Generate Date Plan</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};
