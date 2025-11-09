import React from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import { globalStyles as styles } from '../../globalStyles';

export const ItineraryCard = ({time, title, cost, description}) => {
    return (
        <View style={styles.itineraryCard}>
            <Text style={styles.itineraryTime}>{time}</Text>
            <Text style={styles.itineraryTitle}>{title}</Text>
            <Text style={styles.itineraryDescription}>{description}</Text>
            <Text style={styles.itineraryCost}>{cost}</Text>
        </View>
    )
}