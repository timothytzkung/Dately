import React, { useState, useEffect, useMemo, useRef } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert, Platform, Modal } from 'react-native';
import { Calendar, Save, LogOut, X } from 'lucide-react-native';

import {
    useNavigation,
    useFocusEffect,
    useIsFocused
} from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAuth } from '../../utils/AuthContext';
import { getData, loadUserPreferences } from '../../utils/storage';

// Bottom Sheet Imports - Note the addition of BottomSheetView
import BottomSheet, { BottomSheetView } from '@gorhom/bottom-sheet';
import { GestureHandlerRootView } from 'react-native-gesture-handler'; 

// MAPS API
import Geocoder from "react-native-geocoding";
import MapView, { PROVIDER_GOOGLE, PROVIDER_DEFAULT, Marker } from "react-native-maps";
import * as Location from 'expo-location';


/*
Note to self:
First name (display name) doesn't render when first sign up
due to render lag (UI rendered before profile updated=> add delay
    to fix issue)
*/


export const DatePlannerScreen = () => {

    const navigation = useNavigation();
    const brandColour = "#E91E63"
    const [showConfirmModal, setShowConfirmModal] = useState(false);
    const [userPref, setUserPref] = useState(null);
    const [userDateType, setUserDateType] = useState("");
    const [userBudget, setUserBudget] = useState("");
    const [userTransportType, setUserTransportType] = useState("");
    const [location, setLocation] = useState(null);
    const [region, setRegion] = useState(null);
    const isFocused = useIsFocused();
    const { signOut, user } = useAuth();
    // State to manage loading location
    const [loadingLocation, setLoadingLocation] = useState(true); 

    // Bottom Sheet Hooks
    const bottomSheetRef = useRef(null);
    const snapPoints = useMemo(() => ['30%', '50%', '80%'], []); // Define snap points

    // Functions
    const getLocation = async () => {
      try {
        setLoadingLocation(true);
        const { status } = await Location.requestForegroundPermissionsAsync();
        
        if (status !== 'granted') {
          Alert.alert(
            'Location Required',
            'Location access is needed to find nearby date venues.',
            [
              { text: 'OK' },
              { 
                // You cannot request permissions here repeatedly. A user needs to go to settings.
                text: 'Dismiss', 
              }
            ]
          );
          return;
        }
  
        const location = await Location.getCurrentPositionAsync({
          accuracy: Location.Accuracy.Balanced,
        });
  
        setLocation({
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
        });
        setRegion({
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
          latitudeDelta: 0.1,
          longitudeDelta: 0.1,
        })
        
        console.log('Location obtained:', location.coords);
      } catch (error) {
        console.error('Error getting location:', error);
        Alert.alert('Error', 'Failed to get your location. Please try again.');
        // Set a default location if one can't be fetched
        setRegion({
          latitude: 49.1866,
          longitude: -122.8490,
          latitudeDelta: 0.1,
          longitudeDelta: 0.1,
        });
      } finally {
        setLoadingLocation(false);
      }
    };

    const handleSignOut = () => {
      console.log('Sign out button clicked');
      setShowConfirmModal(true);
    };
    
    const confirmSignOut = async () => {
        console.log('Confirm sign out clicked');
        setShowConfirmModal(false);
        await signOut();
    };

    const cancelSignOut = () => {
        console.log('Cancel sign out clicked');
        setShowConfirmModal(false);
    };

    const _callLoadUserPreferences = async() => {
      const pref = await loadUserPreferences();
      setUserPref(pref);
      return pref;
    }

    const handleNavigateToGenerateDate = () => {
      navigation.navigate('GenerateDate', {localLocation: location})
      return;
    }


    useEffect(() => {
      // NOTE: getLocation() is now called once when the screen mounts
      
      // Load location on first mount
      getLocation();
      
      if (isFocused) {
        // Load preferences every time the screen is focused
        const loadPrefs = async () => {
          const pref = await _callLoadUserPreferences();
          
          if (pref) {
            try {
              setUserDateType(pref.DateType);
              setUserBudget(pref.Budget);
              setUserTransportType(pref.TransportType);
            } catch(e) {
              console.warn("Could not set user preferences:", e);
            }
          }
        };
        loadPrefs();
      }
    }, [isFocused]);


    // Render the MapView and the BottomSheet
    return (
        <GestureHandlerRootView style={styles.container}>
            <SafeAreaView edges={['right', 'top', 'left']}/>
            
            {/* Header and Sign Out */}
            <View style={styles.header}>
              <View>
                <Text style={styles.headerTitle}>Date Planner</Text>
                <Text style={styles.headerSubtitle}>Create your perfect date</Text>
              </View>
              <TouchableOpacity 
                style={styles.signOutButton}
                onPress={handleSignOut}
              >
                <LogOut size={24} color="#E91E63" />
              </TouchableOpacity>
            </View>
            
            {/* Map View */}
            <MapView 
                style={styles.map}
                region={region}
                // Fallback to default if location hasn't been fetched or is null
                initialRegion={region || {
                  latitude: 49.1866,
                  longitude: -122.8490,
                  latitudeDelta: 0.0922,
                  longitudeDelta: 0.0421,
                }}
                provider={Platform.OS === "android" ? PROVIDER_GOOGLE : PROVIDER_DEFAULT}
            >
              {/* Only render marker if location is available */}
              {location && <Marker coordinate={location} title="Your Location" />}
            </MapView>
          
            {/* Bottom Sheet */}
            <BottomSheet
                ref={bottomSheetRef}
                index={0} // Start at the first snap point (30%)
                snapPoints={snapPoints}
                handleIndicatorStyle={{ backgroundColor: '#ccc' }}
            >
                {/* Content inside the bottom sheet (NOW USING BottomSheetView) */}
                <BottomSheetView style={styles.bottomSheetContent}>
                  <View style={styles.userInfo}>
                    <Text style={styles.userName}>
                        Welcome back, {user.displayName || 'Guest'}!
                    </Text>
                  </View>
                  
                    <TouchableOpacity 
                      style={styles.card}
                      onPress={handleNavigateToGenerateDate}
                    >
                      <View style={styles.cardIcon}>
                        <Calendar size={32} color="#E91E63" />
                      </View>
                      <View style={styles.cardContent}>
                        <Text style={styles.cardTitle}>Generate New Date</Text>
                        <Text style={styles.cardDescription}>Create a personalized date itinerary</Text>
                      </View>
                    </TouchableOpacity>
            
                    <TouchableOpacity 
                      style={styles.card}
                      onPress={() => navigation.navigate('SavedDates')}
                    >
                      <View style={styles.cardIcon}>
                        <Save size={32} color="#E91E63" />
                      </View>
                      <View style={styles.cardContent}>
                        <Text style={styles.cardTitle}>Saved Dates</Text>
                        <Text style={styles.cardDescription}>View your saved date plans</Text>
                      </View>
                    </TouchableOpacity>
            
                    <View style={styles.section}>
                      <Text style={styles.sectionTitle}>Quick Preferences</Text>
                      <TouchableOpacity 
                        style={styles.preferenceButton}
                        onPress={() => navigation.navigate('Questionnaire', { screen: 'OutingType' })}
                      >
                        <Text style={styles.preferenceButtonText}>Update Date Preferences</Text>
                      </TouchableOpacity>
                    </View>
                </BottomSheetView>
            </BottomSheet>
    
          {/* Sign Out Modal */}
          <Modal
            visible={showConfirmModal}
            transparent={true}
            animationType="fade"
            onRequestClose={cancelSignOut}
          >
            <View style={styles.modalOverlay}>
              <View style={styles.modalContent}>
                <View style={styles.modalHeader}>
                  <Text style={styles.modalTitle}>Sign Out</Text>
                  <TouchableOpacity 
                    onPress={cancelSignOut}
                    style={styles.closeButton}
                  >
                    <X size={24} color="#676" />
                  </TouchableOpacity>
                </View>
                <Text style={styles.modalMessage}>
                  Are you sure you want to sign out?
                </Text>
                <View style={styles.modalButtons}>
                  <TouchableOpacity 
                    style={styles.modalCancelButton}
                    onPress={cancelSignOut}
                  >
                    <Text style={styles.modalCancelText}>Cancel</Text>
                  </TouchableOpacity>
                  <TouchableOpacity 
                    style={styles.modalConfirmButton}
                    onPress={confirmSignOut}
                  >
                    <Text style={styles.modalConfirmText}>Sign Out</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </Modal>
          
        </GestureHandlerRootView>
    );
}

// Move to global later
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  bottomSheetContent: { 
    flex: 1,
    paddingHorizontal: 20,
  },
  header: {
    paddingLeft: 20,
    marginBottom: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    // Ensure header is above the map but below the SafeAreaView
    zIndex: 1, 
    backgroundColor: '#fff',
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
  },
  headerSubtitle: {
    fontSize: 16,
    color: '#666',
  },
  signOutButton: {
    padding: 8,
    marginRight: 20,
    marginTop: 10,
    borderRadius: 8,
    backgroundColor: '#FFF0F5',
    cursor: 'pointer',
  },
  userInfo: {
    padding: 12,
    paddingLeft: 0,
    borderRadius: 0, // Removed border radius to fit under the header
    marginBottom: 5, // Lowered bottom margin
    zIndex: 1, // Ensure it's above the map
  },
  userName: {
    fontSize: 24,
    color: '#333',
    fontWeight: '600',
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  cardIcon: {
    marginRight: 16,
  },
  cardContent: {
    flex: 1,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4,
  },
  cardDescription: {
    fontSize: 14,
    color: '#666',
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 12,
    color: '#333',
  },
  preferenceButton: {
    backgroundColor: '#f5f5f5',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  preferenceButtonText: {
    color: '#E91E63',
    fontSize: 16,
    fontWeight: '600',
  },
  // Modal Styles (Kept the same)
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  modalContent: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 24,
    width: '100%',
    maxWidth: 400,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  closeButton: {
    padding: 4,
    cursor: 'pointer',
  },
  modalMessage: {
    fontSize: 16,
    color: '#666',
    marginBottom: 24,
    lineHeight: 24,
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: 12,
  },
  modalCancelButton: {
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 8,
    backgroundColor: '#f5f5f5',
    cursor: 'pointer',
  },
  modalCancelText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#666',
  },
  modalConfirmButton: {
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 8,
    backgroundColor: '#E91E63',
    cursor: 'pointer',
  },
  modalConfirmText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#fff',
  },
  // The map now takes up the entire space below the header/user info
  map: {
    ...StyleSheet.absoluteFillObject,
    marginTop: 100, // Adjust this value to account for the header and user info height
    zIndex: 0, // Ensures the map is layered beneath the Bottom Sheet
  }
});

