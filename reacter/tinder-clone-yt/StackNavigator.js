import { View, Text } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import HomeScreen from './screens/HomeScreen';
import ChatScreen from './screens/ChatScreen';
import LoginScreen from './screens/LoginScreen';
import useAuth from './hooks/useAuth';

const Stack = createNativeStackNavigator();

const StackNavigator = () => {
    const {user} = useAuth();

    return (
        <Stack.Navigator>
            {user ? ( // if the user logged in
                <>
                    <Stack.Screen name="Home" component={HomeScreen} />
                    <Stack.Screen name="Chat" component={ChatScreen} />
                </>
            ) : ( // if the user is not logged in
                <Stack.Screen name="Login" component={LoginScreen} />
            )}

        </Stack.Navigator>
    )
}

export default StackNavigator