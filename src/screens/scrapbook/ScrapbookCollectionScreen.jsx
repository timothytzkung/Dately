import React from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { Camera } from 'lucide-react-native';
import {
    useNavigation
} from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { globalStyles as styles } from '../../globalStyles';


export const ScrapbookCollectionScreen = ({ navigation }) => {
  const scrapbooks = [
    { id: 1, title: 'Summer 2025', count: 5 },
    { id: 2, title: 'Anniversary Dates', count: 3 },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Date Scrapbook</Text>
          <Text style={styles.headerSubtitle}>Your shared memories</Text>
        </View>

        {scrapbooks.map(book => (
          <TouchableOpacity
            key={book.id}
            style={styles.card}
            onPress={() => navigation.navigate('ScrapbookView')}
          >
            <View style={styles.cardIcon}>
              <Camera size={32} color="#E91E63" />
            </View>
            <View style={styles.cardContent}>
              <Text style={styles.cardTitle}>{book.title}</Text>
              <Text style={styles.cardDescription}>{book.count} dates</Text>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};