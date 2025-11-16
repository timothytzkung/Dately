import React from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import { globalStyles as styles } from '../../globalStyles';

export const ItineraryCard = ( {item} ) => {
    return (
        <View style={styles.itineraryCard}>
            <Text style={styles.itineraryTime}>{item.time}</Text>
            <Text style={styles.itineraryTitle}>{item.title}</Text>
            <Text style={styles.itineraryDescription}>{item.description}</Text>
            <Text style={styles.itineraryCost}>{item.cost}</Text>
        </View>
    )
}