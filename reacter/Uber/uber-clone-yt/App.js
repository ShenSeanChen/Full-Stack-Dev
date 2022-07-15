import { StatusBar } from 'expo-status-bar';
import {
  AppRegistry, StyleSheet, Text, View, Button, Alert, SafeAreaView
} from 'react-native';
import {Provider} from "react-redux";
import HomeScreen from './screens/HomeScreen';
import {store} from "./store";
import tw from "tailwind-react-native-classnames";

// 0) Set up Expo Go App on Phones
// 1) Set up redux 
// -- yarn add react-redux
// -- yarn add tailwind-react-native-classnames

export default function App() {
  return (
    <Provider store={store}>
      <HomeScreen>I am the home screen</HomeScreen>
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
