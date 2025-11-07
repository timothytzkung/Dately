import { Button } from '@react-navigation/elements';
import {
    useNavigation
} from '@react-navigation/native';
import * as React from 'react';
import { Text, View } from 'react-native';

export default function HomeScreen() {
  const navigation = useNavigation();

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Home Screen</Text>
      <Text>Woot Woot Check out my sick homescreen!</Text>
      <Text>Yay</Text>
      <Button onPressIn={() => navigation.navigate('Details')}>
        Go to Details Screen
      </Button>
      <Button onPressIn={() => navigation.navigate('DatePlanner')}>
        Go to DatePlanner Screen
      </Button>
    </View>
  );
}