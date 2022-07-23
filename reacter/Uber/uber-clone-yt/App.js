import { StatusBar } from 'expo-status-bar';
import {
  AppRegistry, StyleSheet, Text, View, Button, Alert, SafeAreaView,
  KeyboardAvoidingView, // to avoid keyboard blocking view
  Platform
} from 'react-native';
import {Provider} from "react-redux";
import HomeScreen from './screens/HomeScreen';
import {store} from "./store";
import tw from "tailwind-react-native-classnames";
import { SafeAreaProvider } from 'react-native-safe-area-context';
import "react-native-gesture-handler";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import MapScreen from './screens/MapScreen';




// 0) Set up Expo Go App on Phones
// 1) Set up redux 
// 2) yarn install
// -- yarn add react-redux
// -- yarn add tailwind-react-native-classnames
// -- yarn add react-native-elements
// -- yarn add react-native-vector-icons
// -- yarn add react-native-safe-area-context
// -- yarn add @react-navigation/native
// -- expo install react-native-screens react-native-safe-area-context
// -- yarn add react-native-gesture-handler
// -- yarn add @react-navigation/native-stack

// 3) Google API for Navigation
// -- yarn add react-native-google-places-autocomplete
// ---- go to GCP create a project and enable 'Directions API', 'Places API', 'Distance Matrix API'
// ---- create credentials -> API key -> copy your API key
// ---- create an .env file and paste your key there, remember to add env. in .gitignore
// -- yarn add react-native-dotenv
// -- yarn add react-native-maps
// -- yarn add react-native-maps-directions
// -- yarn add react-intl


export default function App() {
  const Stack = createNativeStackNavigator();

  return (
    <Provider store={store}>
      <NavigationContainer>
        <SafeAreaProvider>
          <KeyboardAvoidingView 
            behavior={Platform.OS === "ios" ? "padding" : "height"} 
            style={{flex:1}}
            keyboardVerticalOffset={Platform.OS === "ios" ? -64 : 0}

          >

              {/* <HomeScreen>I am the home screen</HomeScreen> */}
              {/* <View style={styles.container}></View> */}
              <Stack.Navigator>

                  <Stack.Screen 
                    name='HomeScreen' 
                    component={HomeScreen} 
                    options={{
                      headerShown: false,
                    }}
                  />

                  <Stack.Screen 
                    name='MapScreen' 
                    component={MapScreen} 
                    options={{
                      headerShown: false,
                    }}
                  />

              </Stack.Navigator>

          </KeyboardAvoidingView>
          
        </SafeAreaProvider>
          
      </NavigationContainer>
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
