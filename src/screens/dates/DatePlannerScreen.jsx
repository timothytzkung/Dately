import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet, Alert, Platform, Modal } from 'react-native';
import { Calendar, Save, LogOut, X } from 'lucide-react-native';
import {
    useNavigation
} from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAuth } from '../../utils/AuthContext';

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

    const { signOut, user } = useAuth();

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

    return (
        <SafeAreaView style={styles.container}>
          <ScrollView style={styles.scrollView}>
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
    
            <View style={styles.userInfo}>
                <Text style={styles.userName}>
                    Welcome back, {user.displayName}!
                </Text>
            </View>
    
            <TouchableOpacity 
              style={styles.card}
              onPress={() => navigation.navigate('GenerateDate')}
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
          </ScrollView>
    
          {/* Confirmation Modal */}
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
        </SafeAreaView>
    );
}
// Move to global later
const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
    },
    scrollView: {
      flex: 1,
      padding: 20,
    },
    header: {
      marginBottom: 24,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'flex-start',
    },
    headerTitle: {
      fontSize: 28,
      fontWeight: 'bold',
      color: '#333',
      marginBottom: 4,
    },
    headerSubtitle: {
      fontSize: 16,
      color: '#666',
    },
    signOutButton: {
      padding: 8,
      borderRadius: 8,
      backgroundColor: '#FFF0F5',
      cursor: 'pointer',
    },
    userInfo: {
      backgroundColor: '#f9f9f9',
      padding: 12,
      borderRadius: 8,
      marginBottom: 20,
    },
    userName: {
      fontSize: 16,
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
    // Modal Styles
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
  });
