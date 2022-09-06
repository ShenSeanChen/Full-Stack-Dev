import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import { Button, StyleSheet, Text, View } from 'react-native';
import tw from 'tailwind-react-native-classnames';
import { AuthProvider } from './hooks/useAuth';
import StackNavigator from './StackNavigator';



// 1. tailwind
// -- yarn add tailwind-react-native-classnames 
// -- yarn add tailwind-rn

// 2. react-native navigation
// -- yarn add @react-navigation/native
// -- expo install react-native-screens react-native-safe-area-context
// -- yarn add @react-navigation/native-stack

// 3. expo google app auth
// -- yarn add expo-auth-session
// -- expo install expo-auth-session expo-random
// -- expo install expo-google-app-auth
// -- the above is deprecated: expo install expo-auth-session
// -- expo install expo-web-browser

// 4. Firebase
// -- start a project
// -- ios app: apple bundle ID: host.exp.exponent
// -- android app: android package name: host.exp.exponent

// 5. cloud.google.com: Need 2 Credentials
// -- Go find the project you created in Firebase in your GCloud All Project List
// -- sudo npm install -g firebase-tools
// -- firebase login

// 6. expo build:android
// -- What would you like your Android package name to be? › host.exp.exponent
// -- Choose the build type you would like: › apk
// -- Download Java
// -- Would you like to upload a Keystore or have us generate one for you? If you don't know what this means, let us generate it! :) › Generate new keystore
// -- expo fetch:android:hashes
// -- Google Certificate Hash (SHA-256):  DBE0AEDDDD726970AC36EDAAA98B3C4AF6AE7B50D1C3CEA3EDB52429D76491A4
// -- Google Certificate Hash (SHA-1):    65EF0D25062BE7448289AB3611372D971524B93E
// -- Paste the above fingerprint to firebase > tinder-clone-yt-android > add fingerprint

// 7. Copy the Client ID from OAuth 2.0 Client IDs > ios client for host.exp.exponent

// 8. Create a database at Firestore Database
// -- And then go to Authentication and get started 



export default function App() {
  return (
    <NavigationContainer> 
    {/* HOC - Higher Order Component */}
      <AuthProvider> 
      {/* Passes down the coll auth stuff to children... */}
        <StackNavigator />
      </AuthProvider>
    </NavigationContainer>
    
  );
}

