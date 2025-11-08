import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, Modal } from 'react-native';
import { Heart, X } from 'lucide-react-native';
import { globalStyles as styles } from '../../globalStyles';

import {
    SafeAreaView,
    SafeAreaProvider,
    SafeAreaInsetsContext,
    useSafeAreaInsets,
  } from 'react-native-safe-area-context';
import {
    useNavigation
} from '@react-navigation/native';


// Auth
import { useAuth } from '../../utils/AuthContext';
import { firebase_auth } from '../../utils/firebaseConfig';
import { setData } from '../../utils/storage';


export const LoginScreen = ({ onLoginStateChange }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const { signIn, user } = useAuth();

  const navigation = useNavigation();

  const handleSignInError = () => {
    setShowConfirmModal(true);
  }

  const closeSignInError = () => {
    setShowConfirmModal(false);
  }

  const handleSignIn = async () => {
    // Attempt sign in
    const attempt = await signIn(email, password);
    if (attempt === null) {
      handleSignInError();
    }

    // // Location
    if (attempt != null) {
      navigation.navigate('AllowLocation');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.authContainer}>
        <Heart size={64} color="#E91E63" style={styles.logo} />
        <Text style={styles.title}>Welcome to Dately</Text>
        <Text style={styles.subtitle}>Plan memorable dates effortlessly</Text>
        
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Email</Text>
          <TextInput
            style={styles.input}
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
          />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Password</Text>
          <TextInput
            style={styles.input}
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />
        </View>

        <TouchableOpacity style={styles.primaryButton} onPress={handleSignIn}>
          <Text style={styles.primaryButtonText}>Sign In</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.secondaryButton}
          onPress={() => navigation.navigate('Register')}
        >
          <Text style={styles.secondaryButtonText}>Create Account</Text>
        </TouchableOpacity>
      </View>
      
      {/* Confirmation Modal */}
      <Modal
        visible={showConfirmModal}
        transparent={true}
        animationType="fade"
        onRequestClose={closeSignInError}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Sign In Error</Text>
              <TouchableOpacity 
                onPress={closeSignInError}
                style={styles.closeButton}
              >
                <X size={24} color="#676" />
              </TouchableOpacity>
            </View>
            <Text style={styles.modalMessage}>
              There was an issue signing in.
            </Text>
            <View style={styles.modalButtons}>
              <TouchableOpacity 
                style={styles.modalCancelButton}
                onPress={closeSignInError}
              >
                <Text style={styles.modalCancelText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity 
                style={styles.modalConfirmButton}
                onPress={
                  () => {
                    setShowConfirmModal(false);
                    navigation.navigate('Register')
                }}
              >
                <Text style={styles.modalConfirmText}>Create Account</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};
