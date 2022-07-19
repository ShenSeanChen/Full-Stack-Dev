import { View, Text } from 'react-native'
import React from 'react'
import tw from 'tailwind-react-native-classnames'
import { Image } from 'react-native-elements'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { StackActions, useNavigation } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Map from '../components/Map'
import MapView from 'react-native-maps'

import NavigateCard from '../components/NavigateCard'
import RideOptionsCard from '../components/RideOptionsCard'

export default function MapScreen() {
    const navigation = useNavigation();
    const Stack = createNativeStackNavigator();

    return (
        <View>

            {/* First half of the screen: Maps */}
            <View style={tw`h-1/2`}>
                <Map />
            </View>

            {/* Second half of the screen: Uber Car Types  */}
            <View style={tw`h-1/2`}>
                <Stack.Navigator>
                    <Stack.Screen
                        name="NavigateCard"
                        component={NavigateCard}
                        options={{
                            headerShown: false,
                        }}
                    />
                    <Stack.Screen
                        name="RideOptionsCard"
                        component={RideOptionsCard}
                        options={{
                            headerShown: false,
                        }}
                    />

                </Stack.Navigator>
            </View>

        </View>
        

        // <View style={tw`p-5`}>
        //             <TouchableOpacity 
        //             onPress={() => navigation.navigate("HomeScreen")}
        //             style = {{
        //                 width:100, height:100, resizeMode: 'contain',
        //             }}>
        //                 <View>
        //                     <Image // Uber Logo
        //                     style = {{
        //                         width:100, height:100, resizeMode: 'contain',
        //                     }}
        //                     source={{
        //                             uri: "https://links.papareact.com/gzs",
        //                             //uri stands for uniform resource identifier
        //                         }}
        //                     /> 
        //                 </View>
        //             </TouchableOpacity>
        //             <Text style={tw`text-lg`}>Yo Yo Yo, let's take Azumi on a ride!!!</Text>
        // </View>
    );
};