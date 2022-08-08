import { View, Text } from 'react-native'
import React, { createContext, useContext, useEffect } from 'react';
// import * as Google from "expo-google-app-auth"
// import * as Google from "expo-auth-session/providers/google"

// import * as Google from "expo-auth-session"
// import * as Google from "expo-google-sign-in"

const AuthContext = createContext({});

// fetch the androidClientId from google-services.json
// fetch the iosClientId from GoogleService-clientInformation.plist 
const config = {
  androidClientId: '122649946680-glb7nd0ctftaar9n8csn6ofv6pqdso9h.apps.googleusercontent.com',
  iosClientId: '122649946680-hc5eod9cnlp2jbehnndq1cd8dg1ke2r6.apps.googleusercontent.com',
  webClientId: '122649946680-glb7nd0ctftaar9n8csn6ofv6pqdso9h.apps.googleusercontent.com',
  scopes: ["profile", "email"],
  permissions: ["public_profile", "email", "gender", "location"],
}



export const AuthProvider = ({children}) => {

  // -- Another Solution
  // const [signInWithGoogle, setsignInWithGoogle] = React.useState();
  // const [userInfo, setUserInfo] = React.useState();

  // const [request, response, promptAsync] = Google.useAuthRequest(config);

  // useEffect(() => {
  //   if (response?.type === "success") {
  //     setsignInWithGoogle(response.authentication.signInWithGoogle);
  //   }
  // }, [response]);

  // const signInWithGoogle = accessToken;

  // -- Sean's Attempt
  // const signInWithGoogle = async() => {
  //   Google.useAuthRequest(config).then(
  //   // Google.useIdTokenAuthRequest(config).then(
  //     async(logInResult) => {
  //       // console.log(logInResult)
  //       if(logInResult.response?.type === 'success') {
  //         // login...
  //         // logInResult.response.authentication.accessToken
  //         // console.log(logInResult)
  //       }
  //     }
  //   );
  // };

  // -- Sonny's Solution
  const signInWithGoogle = async() => {
    Google.logInAsync(config).then(
 
      async (logInResult) => {
      if(logInResult.type === 'success') 
        {
          // login...
        }
      }

    );
  }

  return (
    <AuthContext.Provider 
      value={{
        // user: null,
        user: 'shenseanchen',
        signInWithGoogle
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export default function useAuth() {
  return useContext(AuthContext);
}
 