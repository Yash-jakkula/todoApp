import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import StackNav from './navigators/Stack';

import { SafeAreaFrameContext } from 'react-native-safe-area-context';

const Home = () => {
  return(
    <View>
      <Text>
        hello world!
      </Text>
    </View>
  )
}

const stack = createNativeStackNavigator();
export default function App() {
  return (
    
      <StackNav />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
