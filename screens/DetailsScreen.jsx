import { Button } from '@react-navigation/elements';
import {
    useNavigation
} from '@react-navigation/native';
import * as React from 'react';
import { Text, View } from 'react-native';

export default function DetailsScreen() {
  const navigation = useNavigation();

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Details Screen</Text>
      <Text>This is a screen full of interesting details</Text>
      <Text>Hurray for extra details</Text>
      <Button onPressIn={() => navigation.navigate('Home')}>
        Go to Home Screen
      </Button>
    </View>
  );
}

