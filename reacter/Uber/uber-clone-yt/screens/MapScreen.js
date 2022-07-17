import { View, Text } from 'react-native'
import React from 'react'
import tw from 'tailwind-react-native-classnames'
import { Image } from 'react-native-elements'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { useNavigation } from '@react-navigation/native'

import Map from '../components/Map'
import MapView from 'react-native-maps'

export default function MapScreen() {
    const navigation = useNavigation();

    return (
        <View>
            {/* <Text style={tw`text-lg`}>Yo Yo Yo, let's take Azumi on a ride!!!</Text> */}
            <View style={tw`h-1/2`}>
                <Map />
            </View>
            <View style={tw`h-1/2`}></View>
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
    )
}