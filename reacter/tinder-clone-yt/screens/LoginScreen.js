import { View, Text, Button } from 'react-native'
import React from 'react'
import useAuth from '../hooks/useAuth'

const LoginScreen = () => {
  // const { user } = useAuth();
  // console.log(user);
  const {signInWithGoogle} = useAuth();

  
  return (
    <View>
      <Text>Log in to the App!</Text>
      <Button title='login' onPress={signInWithGoogle}  />
    </View>
  )
}

export default LoginScreen