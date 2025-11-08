import React from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import { Calendar, Save, MapPin } from 'lucide-react-native';
import {
    useNavigation
} from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';



export const AllowLocationScreen = ( ) => {
  const handleAllowLocation = async () => {
    // TODO: Request location permissions using expo-location or google places API
    const navigation = useNavigation();
    navigation.replace('MainApp');
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.authContainer}>
        <MapPin size={64} color="#E91E63" style={styles.logo} />
        <Text style={styles.title}>Enable Location</Text>
        <Text style={styles.subtitle}>
          We need your location to suggest nearby date spots and create personalized itineraries
        </Text>

        <TouchableOpacity 
          style={styles.primaryButton}
          onPress={handleAllowLocation}
        >
          <Text style={styles.primaryButtonText}>Allow Location Access</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.secondaryButton}
          onPress={() => navigation.replace('MainApp')}
        >
          <Text style={styles.secondaryButtonText}>Skip for Now</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};
