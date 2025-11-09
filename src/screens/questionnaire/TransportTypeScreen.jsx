import {
    useNavigation
} from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { globalStyles as styles } from '../../globalStyles';
import React from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';

export const TransportTypeScreen = ({ navigation }) => {
    return (
      <SafeAreaView style={styles.container}>
        <ScrollView style={styles.scrollView}>
          <View style={styles.header}>
            <Text style={styles.headerTitle}>How will you get around?</Text>
          </View>
  
          <View style={styles.chipContainer}>
            {['Walking', 'Driving', 'Public Transit', 'Biking'].map(transport => (
              <TouchableOpacity key={transport} style={styles.chip}>
                <Text style={styles.chipText}>{transport}</Text>
              </TouchableOpacity>
            ))}
          </View>
  
          <TouchableOpacity 
            style={styles.primaryButton}
            onPress={() => navigation.navigate('Home')}
          >
            <Text style={styles.primaryButtonText}>Complete</Text>
          </TouchableOpacity>
        </ScrollView>
      </SafeAreaView>
    );
  };