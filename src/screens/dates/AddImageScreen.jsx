import React from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { ImagePlus } from 'lucide-react-native';
import {
    useNavigation
} from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';


export const AddImageScreen = () => {
  const handleTakePhoto = async () => {
    // TODO: Implement camera functionality
  };

  const handleChooseFromGallery = async () => {
    // TODO: Implement image picker
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.centerContainer}>
        <ImagePlus size={64} color="#E91E63" />
        <Text style={styles.title}>Add Photos</Text>
        <Text style={styles.subtitle}>Capture your date memories</Text>
        <TouchableOpacity style={styles.primaryButton} onPress={handleTakePhoto}>
          <Text style={styles.primaryButtonText}>Take Photo</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.secondaryButton} onPress={handleChooseFromGallery}>
          <Text style={styles.secondaryButtonText}>Choose from Gallery</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};