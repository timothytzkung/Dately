import {
    useNavigation
} from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { globalStyles as styles } from '../../globalStyles';
import React from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';

export const OutingTypeScreen = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>What type of outing?</Text>
        </View>

        <View style={styles.chipContainer}>
          {['Dinner', 'Adventure', 'Relaxing', 'Cultural', 'Sporty', 'Romantic'].map(type => (
            <TouchableOpacity key={type} style={styles.chip}>
              <Text style={styles.chipText}>{type}</Text>
            </TouchableOpacity>
          ))}
        </View>

        <TouchableOpacity 
          style={styles.primaryButton}
          onPress={() => navigation.navigate('MaxBudget')}
        >
          <Text style={styles.primaryButtonText}>Next</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};
