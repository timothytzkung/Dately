import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  TouchableOpacity,  
  ScrollView, 
  ActivityIndicator,
  Alert 
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MapPin, Clock } from 'lucide-react-native';
import * as Location from 'expo-location';
import { DateGenerator } from '../../utils/DateGeneratorService';
import { globalStyles as styles } from '../../globalStyles';
import {
  useNavigation
} from '@react-navigation/native';

export const GenerateDateScreen = ({ route }) => {
  const [dateType, setDateType] = useState('');
  const [budget, setBudget] = useState('');
  const [startTime, setStartTime] = useState('9:00');
  const [location, setLocation] = useState(null);
  const [loading, setLoading] = useState(false);
  const [loadingLocation, setLoadingLocation] = useState(true);

  const navigation = useNavigation();

  

  // Get user's location on mount
  useEffect(() => {
    const result = setLocation(route.params?.localLocation || null);

    if (location == null) {
      getLocation();
    } 
  }, []);

  const getLocation = async () => {
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
      
      if (status !== 'granted') {
        Alert.alert(
          'Location Required',
          'Location access is needed to find nearby date venues.',
          [
            { text: 'OK' },
            { 
              text: 'Open Settings', 
              onPress: () => Location.requestForegroundPermissionsAsync() 
            }
          ]
        );
        setLoadingLocation(false);
        return;
      }

      const location = await Location.getLastKnownPositionAsync();

      setLocation({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      });
      
      console.log('Location obtained:', location.coords);
    } catch (error) {
      console.error('Error getting location:', error);
      Alert.alert('Error', 'Failed to get your location. Please try again.');
    } finally {
      setLoadingLocation(false);
    }
  };

  const handleDateTypePress = (type) => {
    setDateType(type);
  };

  const handleBudgetPress = (range) => {
    setBudget(range);
  };

  const handleTimePress = (time) => {
    setStartTime(time);
  };

  const handleGenerate = async () => {
    // Validation
    if (!dateType) {
      Alert.alert('Missing Information', 'Please select a date type.');
      return;
    }

    if (!budget) {
      Alert.alert('Missing Information', 'Please select a budget range.');
      return;
    }

    if (!location) {
      Alert.alert(
        'Location Required',
        'We need your location to find nearby venues. Would you like to enable it?',
        [
          { text: 'Cancel', style: 'cancel' },
          { text: 'Enable', onPress: getLocation }
        ]
      );
      return;
    }

    // Generate date plan
    setLoading(true);

    try {
      const preferences = {
        dateType,
        budget,
        startTime,
        duration: 3, // 3 hours
        transportType: 'Driving',
      };

      console.log('Generating date with preferences:', preferences);
      
      const result = await DateGenerator.generateDatePlan(preferences, location);
      

      if (result.success) {
        console.log("Successfully generated DatePlan")
        console.log("Here's the date: ", result.datePlan)
        
        // Navigate to date plan screen with generated plan
        navigation.navigate('DatePlan', { 
          datePlan: result.datePlan
        });
      } else {
        Alert.alert(
          'Generation Failed',
          result.error || 'Unable to generate date plan. Please try different preferences.',
          [{ text: 'OK' }]
        );
      }
    } catch (error) {
      console.error('Error generating date:', error);
      Alert.alert('Error', 'Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (loadingLocation) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#E91E63" />
          <Text style={styles.loadingText}>Getting your location...</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <SafeAreaView edges={['right', 'top', 'left']} style={styles.header}>
          <Text style={styles.headerTitle}>Generate Date</Text>
          <Text style={styles.headerSubtitle}>
            Let's create the perfect date for you
          </Text>
        </SafeAreaView>

        {/* Location Status */}
        {location && (
          <View style={styles.locationBanner}>
            <MapPin size={16} color="#4CAF50" />
            <Text style={styles.locationText}>
              Location enabled - Finding venues nearby
            </Text>
          </View>
        )}

        {!location && (
          <TouchableOpacity 
            style={styles.locationBannerError}
            onPress={getLocation}
          >
            <MapPin size={16} color="#f44336" />
            <Text style={styles.locationTextError}>
              Tap to enable location
            </Text>
          </TouchableOpacity>
        )}

        {/* Date Type Selection */}
        <View style={styles.section}>
          <Text style={styles.label}>Date Type</Text>
          <Text style={styles.sublabel}>What kind of experience?</Text>
          <View style={styles.chipContainer}>
            {['Dinner', 'Adventure', 'Relaxing', 'Romantic', 'Fun', 'Cultural'].map(type => (
              <TouchableOpacity
                key={type}
                style={[styles.chip, dateType === type && styles.chipActive]}
                onPress={() => handleDateTypePress(type)}
                activeOpacity={0.7}
              >
                <Text style={[styles.chipText, dateType === type && styles.chipTextActive]}>
                  {type}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Budget Selection */}
        <View style={styles.section}>
          <Text style={styles.label}>Budget Range</Text>
          <Text style={styles.sublabel}>How much do you want to spend?</Text>
          <View style={styles.chipContainer}>
            {[
              { value: '$', label: '$ (Under $50)' },
              { value: '$$', label: '$$ ($50-$100)' },
              { value: '$$$', label: '$$$ ($100-$200)' },
              { value: '$$$$', label: '$$$$ ($200+)' },
            ].map(item => (
              <TouchableOpacity
                key={item.value}
                style={[styles.chip, budget === item.value && styles.chipActive]}
                onPress={() => handleBudgetPress(item.value)}
                activeOpacity={0.7}
              >
                <Text style={[styles.chipText, budget === item.value && styles.chipTextActive]}>
                  {item.label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Start Time Selection */}
        <View style={styles.section}>
          <Text style={styles.label}>Start Time</Text>
          <Text style={styles.sublabel}>When should the date begin?</Text>
          <View style={styles.chipContainer}>
            {[
              { value: '9:00', label: '9:00 AM' },
              { value: '12:00', label: '12:00 PM' },
              { value: '17:00', label: '5:00 PM' },
              { value: '20:00', label: '8:00 PM' },
            ].map(item => (
              <TouchableOpacity
                key={item.value}
                style={[
                  styles.timeChip, 
                  startTime === item.value && styles.chipActive
                ]}
                onPress={() => handleTimePress(item.value)}
                activeOpacity={0.7}
              >
                <Clock 
                  size={16} 
                  color={startTime === item.value ? '#fff' : '#E91E63'} 
                />
                <Text style={[
                  styles.timeChipText, 
                  startTime === item.value && styles.chipTextActive
                ]}>
                  {item.label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Generate Button */}
        <TouchableOpacity 
          style={[
            styles.primaryButton,
            (!dateType || !budget || !location || loading) && styles.primaryButtonDisabled
          ]}
          onPress={handleGenerate}
          disabled={!dateType || !budget || !location || loading}
          activeOpacity={0.7}
        >
          {loading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.primaryButtonText}>
              ✨ Generate Date Plan
            </Text>
          )}
        </TouchableOpacity>

        {/* Info Banner */}
        <View style={styles.infoBanner}>
          <Text style={styles.infoText}>
            💡 We'll create a personalized itinerary with real venues near you
          </Text>
        </View>
      </ScrollView>
    </View>
  );
};