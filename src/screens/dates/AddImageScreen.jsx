import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, Image, StyleSheet, Alert, Platform } from 'react-native';
import { ImagePlus, X } from 'lucide-react-native';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import * as ImagePicker from 'expo-image-picker';
import { Camera } from 'expo-camera';


export const AddImageScreen = () => {
  const navigation = useNavigation();
  const [selectedImages, setSelectedImages] = useState([]);

  const handleTakePhoto = async () => {
    try {
      // Request camera permissions
      const { status } = await Camera.requestCameraPermissionsAsync();
      
      if (status !== 'granted') {
        Alert.alert(
          'Permission Required',
          'Camera permission is required to take photos.',
          [{ text: 'OK' }]
        );
        return;
      }

      // Launch camera
      const result = await ImagePicker.launchCameraAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 0.8,
      });

      if (!result.canceled && result.assets && result.assets.length > 0) {
        const newImage = {
          uri: result.assets[0].uri,
          width: result.assets[0].width,
          height: result.assets[0].height,
        };
        setSelectedImages([...selectedImages, newImage]);
        console.log('Photo taken:', newImage);
      }
    } catch (error) {
      console.error('Camera error:', error);
      Alert.alert('Error', 'Failed to take photo. Please try again.');
    }
  };

  const handleChooseFromGallery = async () => {
    try {
      // Request media library permissions
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      
      if (status !== 'granted') {
        Alert.alert(
          'Permission Required',
          'Gallery permission is required to select photos.',
          [{ text: 'OK' }]
        );
        return;
      }

      // Launch image picker
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsMultipleSelection: true, // Allow selecting multiple images
        quality: 0.8,
      });

      if (!result.canceled && result.assets && result.assets.length > 0) {
        const newImages = result.assets.map(asset => ({
          uri: asset.uri,
          width: asset.width,
          height: asset.height,
        }));
        setSelectedImages([...selectedImages, ...newImages]);
        console.log('Images selected:', newImages.length);
      }
    } catch (error) {
      console.error('Gallery error:', error);
      Alert.alert('Error', 'Failed to select images. Please try again.');
    }
  };

  const removeImage = (index) => {
    const updatedImages = selectedImages.filter((_, i) => i !== index);
    setSelectedImages(updatedImages);
  };

  const handleSaveImages = () => {
    if (selectedImages.length === 0) {
      Alert.alert('No Images', 'Please select at least one image to save.');
      return;
    }

    // TODO: Save images to your backend/Firebase/database
    console.log('Saving images:', selectedImages);
    
    Alert.alert(
      'Success',
      `${selectedImages.length} image(s) saved to your scrapbook!`,
      [
        {
          text: 'OK',
          onPress: () => navigation.goBack()
        }
      ]
    );
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.header}>
          <ImagePlus size={64} color="#E91E63" />
          <Text style={styles.title}>Add Photos</Text>
          <Text style={styles.subtitle}>Capture your date memories</Text>
        </View>

        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.primaryButton} onPress={handleTakePhoto}>
            <Text style={styles.primaryButtonText}>Take Photo</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.secondaryButton} onPress={handleChooseFromGallery}>
            <Text style={styles.secondaryButtonText}>Choose from Gallery</Text>
          </TouchableOpacity>
        </View>

        {selectedImages.length > 0 && (
          <View style={styles.previewSection}>
            <Text style={styles.previewTitle}>
              Selected Images ({selectedImages.length})
            </Text>
            <View style={styles.imageGrid}>
              {selectedImages.map((image, index) => (
                <View key={index} style={styles.imageContainer}>
                  <Image source={{ uri: image.uri }} style={styles.previewImage} />
                  <TouchableOpacity
                    style={styles.removeButton}
                    onPress={() => removeImage(index)}
                  >
                    <X size={20} color="#fff" />
                  </TouchableOpacity>
                </View>
              ))}
            </View>

            <TouchableOpacity style={styles.saveButton} onPress={handleSaveImages}>
              <Text style={styles.saveButtonText}>
                Save {selectedImages.length} Image{selectedImages.length !== 1 ? 's' : ''}
              </Text>
            </TouchableOpacity>
          </View>
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollContent: {
    padding: 20,
    alignItems: 'center',
  },
  header: {
    marginTop: 128,
    alignItems: 'center',
    marginBottom: 32,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 16,
    marginBottom: 8,
    color: '#333',
  },
  subtitle: {
    fontSize: 16,
    textAlign: 'center',
    color: '#666',
  },
  buttonContainer: {
    width: '100%',
    maxWidth: 400,
  },
  primaryButton: {
    backgroundColor: '#E91E63',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 12,
  },
  primaryButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  secondaryButton: {
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#E91E63',
    marginBottom: 24,
  },
  secondaryButtonText: {
    color: '#E91E63',
    fontSize: 16,
    fontWeight: '600',
  },
  previewSection: {
    width: '100%',
    marginTop: 24,
  },
  previewTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 16,
  },
  imageGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    marginBottom: 24,
  },
  imageContainer: {
    width: '31%',
    aspectRatio: 1,
    position: 'relative',
    borderRadius: 8,
    overflow: 'hidden',
  },
  previewImage: {
    width: '100%',
    height: '100%',
    borderRadius: 8,
    backgroundColor: '#f0f0f0',
  },
  removeButton: {
    position: 'absolute',
    top: 4,
    right: 4,
    backgroundColor: 'rgba(233, 30, 99, 0.9)',
    borderRadius: 12,
    width: 24,
    height: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  saveButton: {
    backgroundColor: '#4CAF50',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  saveButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});