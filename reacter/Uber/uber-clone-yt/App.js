import { StatusBar } from 'expo-status-bar';
import {
  AppRegistry, StyleSheet, Text, View, Button, Alert, SafeAreaView
} from 'react-native';
import {Provider} from "react-redux";
import HomeScreen from './screens/HomeScreen';
import {store} from "./store";
import tw from "tailwind-react-native-classnames";
import { SafeAreaProvider } from 'react-native-safe-area-context';

// 0) Set up Expo Go App on Phones
// 1) Set up redux 
// -- yarn add react-redux
// -- yarn add tailwind-react-native-classnames
// -- yarn add react-native-elements
// -- yarn add react-native-vector-icons
// -- yarn add react-native-safe-area-context

export default function App() {
  return (
    <Provider store={store}>
      <SafeAreaProvider>
        <HomeScreen>I am the home screen</HomeScreen>
      </SafeAreaProvider>
        {/* <View style={styles.container}>
          <Text>Let's build Uber!!!</Text>
          <Text>Azumiiiiiiiiiiii</Text>
        <Button title="Sean Button!!">Button</Button>
        </View> */}
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
