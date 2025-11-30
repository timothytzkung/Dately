import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, TouchableOpacity, FlatList } from 'react-native';
import { DollarSign } from 'lucide-react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { globalStyles as styles } from '../../globalStyles';
import { DateCard } from '../../components/Cards/DateCard';
import { useNavigation } from '@react-navigation/native';
import { getAllDatePlans, clearAllData } from '../../utils/storage';


export const SavedDatesScreen = ( ) => {
  const [datePlans, setDatePlans] = useState([]);
  const navigation = useNavigation();
  

  const handleCardPress = (plan) => {
    console.log('Card pressed:', plan);
    // Navigate to date details or edit screen
    navigation.navigate('DatePlan', { datePlan: plan });
  };

  const handleClearAllData = async() => {
    const success = await clearAllData();
  }

  const renderList = () => {
    return (
      <View style={{ flex: 1, padding: 16 }}>
        <FlatList
          data={datePlans}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <DateCard
              date={item}               // datePlan object
              onPress={handleCardPress} // this will receive `date` from the card
              showIcon
            />
          )}
          ListEmptyComponent={() => (
            <View style={{ padding: 40, alignItems: 'center' }}>
              <Text style={{ color: '#999' }}>No saved dates yet.</Text>
            </View>
          )}
        />
      </View>
    );
  }

  useEffect(() => {
    // console.log("Loaded datePlans:", datePlans);
    const loadPlans = async () => {
      const list = await getAllDatePlans();
      setDatePlans(list);
    };
    const unsub = navigation.addListener('focus', loadPlans);
    return unsub;
  }, [navigation, datePlans]);

  return (
    <View style={styles.container}>
      <View style={styles.scrollView}>
        <SafeAreaView style={styles.header} edges={['right', 'top', 'left']}>
          <Text style={styles.headerTitle}>Saved Dates</Text>
        </SafeAreaView>

        {renderList()}
        <View style={styles.buttonRow}>
        <TouchableOpacity onPress={handleClearAllData} style={styles.outlineButton}>
          <Text style={styles.outlineButtonText}>Delete All Dates</Text>
        </TouchableOpacity>
        </View>

      </View>

    </View>
  );
};