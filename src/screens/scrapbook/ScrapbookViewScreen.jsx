import { View, Text } from 'react-native';
import {
    useNavigation
} from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { globalStyles as styles } from '../../globalStyles';


export const ScrapbookViewScreen = () => {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.centerContainer}>
          <Text style={styles.title}>Scrapbook View</Text>
          <Text style={styles.subtitle}>View your date memories</Text>
        </View>
      </SafeAreaView>
    );
  };
  