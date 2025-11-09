import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, ScrollView, TextInput, Modal } from 'react-native';
import { Calendar, Save, X } from 'lucide-react-native';
import { globalStyles as styles } from '../../globalStyles';
import {
    useNavigation
} from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAuth } from '../../utils/AuthContext';

export const RegisterScreen = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const { signUp, user } = useAuth();

  const navigation = useNavigation();

  /* note to self: should add verify fields
  before passing off to firebase attempt to save
  on networking

  */

  const handleSignUpError = () => {
    setShowConfirmModal(true);
  }

  const handleSignUp = async () => {
    if (password !== confirmPassword) {
      alert('Passwords do not match');
      return;
    }
    const attempt = await signUp(email, password, firstName, lastName);
    if (attempt == null) {
      handleSignUpError();
    }

    // location
    if (attempt != null) {
      navigation.navigate('AllowLocation');
    }

    // navigation.navigate('MainTabs', { screen: 'Home' })
  };

 
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.authContainer}>
        <Text style={styles.title}>Create Account</Text>

        <View style={styles.namesContainer}>
            <View style={[styles.inputContainer, styles.nameContainer]}>
            <Text style={styles.label}>First Name</Text>
            <TextInput
                style={styles.input}
                value={firstName}
                onChangeText={setFirstName}
                autoCapitalize="words"
            />
            </View>

            <View style={[styles.inputContainer, styles.nameContainer]}>
            <Text style={styles.label}>Last Name</Text>
            <TextInput
                style={styles.input}
                value={lastName}
                onChangeText={setLastName}
                autoCapitalize="words"
            />
            </View>
        </View>
        
        
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Email</Text>
          <TextInput
            style={styles.input}
            placeholder="your@email.com"
            placeholderTextColor="#C0C0C0"
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
            placeholder="8+ characters"
            placeholderTextColor="#C0C0C0"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Confirm Password</Text>
          <TextInput
            style={styles.input}
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            secureTextEntry
          />
        </View>

        <TouchableOpacity style={styles.primaryButton} onPress={handleSignUp}>
          <Text style={styles.primaryButtonText}>Sign Up</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.secondaryButton}
          onPress={() => navigation.navigate('Login')}
        >
          <Text style={styles.secondaryButtonText}>Back to Login</Text>
        </TouchableOpacity>
      </ScrollView>

      {/* Confirmation Modal */}
      <Modal
        visible={showConfirmModal}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setShowConfirmModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Sign In Error</Text>
              <TouchableOpacity 
                onPress={() => setShowConfirmModal(false)}
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
                onPress={() => setShowConfirmModal(false)}
              >
                <Text style={styles.modalCancelText}>Close</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};
