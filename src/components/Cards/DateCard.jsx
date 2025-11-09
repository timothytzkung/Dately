import React from 'react';
import { DollarSign, Calendar } from 'lucide-react-native';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import { globalStyles as styles } from '../../globalStyles';
import {
    useNavigation
} from '@react-navigation/native';

export const DateCard = ({ 
    date, 
    onPress, 
    showIcon = false,
    icon: Icon = Calendar,
    iconColor = '#E91E63'
  }) => {
    return (
      <TouchableOpacity 
        style={styles.card}
        onPress={() => onPress(date)}
        activeOpacity={0.7}
      >
        {showIcon && (
          <View style={styles.iconContainer}>
            <Icon size={32} color={iconColor} />
          </View>
        )}
        <View style={styles.cardContent}>
          <Text style={styles.cardTitle}>{date.title}</Text>
          <Text style={styles.cardDescription}>{date.date}</Text>
          <View style={styles.costBadge}>
            <DollarSign size={16} color="#4CAF50" />
            <Text style={styles.costText}>{date.cost}</Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };