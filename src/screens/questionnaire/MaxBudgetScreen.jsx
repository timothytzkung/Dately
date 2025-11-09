import {
    useNavigation
} from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { globalStyles as styles } from '../../globalStyles';
import React from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';

export const MaxBudgetScreen = ({ navigation }) => {
    return (
      <SafeAreaView style={styles.container}>
        <ScrollView style={styles.scrollView}>
          <View style={styles.header}>
            <Text style={styles.headerTitle}>What's your budget?</Text>
          </View>
  
          <View style={styles.chipContainer}>
            {['Under $50', '$50-$100', '$100-$200', '$200+'].map(budget => (
              <TouchableOpacity key={budget} style={styles.chip}>
                <Text style={styles.chipText}>{budget}</Text>
              </TouchableOpacity>
            ))}
          </View>
  
          <TouchableOpacity 
            style={styles.primaryButton}
            onPress={() => navigation.navigate('TransportType')}
          >
            <Text style={styles.primaryButtonText}>Next</Text>
          </TouchableOpacity>
        </ScrollView>
      </SafeAreaView>
    );
  };
  