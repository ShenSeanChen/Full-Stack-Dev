import { View, Text, Button } from 'react-native'
import React from 'react'
import useAuth from '../hooks/useAuth'


// const LoginScreen = () => {
//   const { user } = useAuth();
//   console.log(user);
//   const {signInWithGoogle} = useAuth();

  
//   return (
//     <View>
//       <Text>Log in to the App!</Text>
//       <Button title='login' onPress={signInWithGoogle}  />
//     </View>
//   )
// };
// export default LoginScreen


////////
import * as WebBrowser from 'expo-web-browser';
import { ResponseType } from 'expo-auth-session';
import * as Google from 'expo-auth-session/providers/google';
import { initializeApp } from '@firebase/app';

import {getAuth, GoogleAuthProvider, signInWithCredential} from "@firebase/auth";


// // Initialize Firebase
// initializeApp({
//   /* Config */
// });

// WebBrowser.maybeCompleteAuthSession();

const config = {
  androidClientId: '122649946680-glb7nd0ctftaar9n8csn6ofv6pqdso9h.apps.googleusercontent.com',
  iosClientId: '122649946680-hc5eod9cnlp2jbehnndq1cd8dg1ke2r6.apps.googleusercontent.com',
  expoClientId: '122649946680-glb7nd0ctftaar9n8csn6ofv6pqdso9h.apps.googleusercontent.com',
  scopes: ["profile", "email"],
  permissions: ["public_profile", "email", "gender", "location"],
};
const LoginScreenExpo = () => {
  const [request, response, promptAsync] = Google.useIdTokenAuthRequest(config);

  React.useEffect(() => {
    if (response?.type === 'success') {
      const { id_token } = response.params;
      
      const auth = getAuth();
      const provider = new GoogleAuthProvider();
      const credential = provider.credential(id_token);
      signInWithCredential(auth, credential);
    }
  }, [response]);

  return (
    <Button
      disabled={!request}
      title="Login"
      onPress={() => {
        promptAsync();
        }}
    />
  );
}

export default LoginScreenExpo;
