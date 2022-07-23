import { StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
// import { SafeAreaView } from 'react-native-safe-area-context'
import tw from 'tailwind-react-native-classnames'
import { SafeAreaView } from 'react-native'
import { FlatList, TouchableOpacity } from 'react-native'
import { Icon } from 'react-native-elements'
import { useNavigation } from '@react-navigation/native'
import { Image } from 'react-native-elements'
import { useSelector } from 'react-redux'
import { selectTravelTimeInformation } from '../slices/navSlice'


import 'intl';
import 'intl/locale-data/jsonp/en'; // or any other locale you need


const data = [
    {
        id: "Uber-X-123",
        title: "UberX",
        multiplier: 1,
        image: "https://links.papareact.com/3pn",
    },
    {
        id: "Uber-XL-456",
        title: "Uber XL",
        multiplier: 1.2,
        image: "https://links.papareact.com/5w8",
    },
    {
        id: "Uber-LUX-789",
        title: "Uber LUX",
        multiplier: 1.75,
        image: "https://links.papareact.com/7pf",
    }
];

const SURGE_CHARGE_RATE = 1.5;


const RideOptionsCard = () => {
    const navigation = useNavigation();
    const [selected, setSelected] = useState(null);
    const travelTimeInformation = useSelector(selectTravelTimeInformation)

    return (
        <SafeAreaView style={tw`bg-white flex-grow`}>
            <View>
                <TouchableOpacity
                    onPress={() => navigation.navigate("NavigateCard")} 
                    style={[tw`absolute top-3 left-5 z-50 p-1 rounded-full bg-gray-300`]}
                >
                    <Icon name="chevron-left" type="fontawesome"/>
                </TouchableOpacity>

                {/* <TouchableOpacity 
                    onPress={() => navigation.navigate("RideOptionsCard")}
                    style={tw`flex flex-row justify-between bg-black w-24 px-4 py-3 rounded-full`}
                >
                    <Icon name="car" type="font-awesome" color="white" size={16} />
                    <Text style={tw`text-white text-center`}>Rides</Text>
                </TouchableOpacity> */}

                <Text style={tw`text-center top-0.5 py-3 text-xl`}>Select a Ride - {travelTimeInformation?.distance?.text}</Text>
            </View>

            <FlatList data={data} keyExtractor={item => item.id}
                renderItem={({item: {id, title, multiplier, image}, item}) => (
                    <TouchableOpacity 
                        onPress={() => setSelected(item)}
                        style={tw`flex-row justify-between items-center px-5 ${id === selected?.id && "bg-gray-200"}`}
                    >
                        <Image 
                            style={{
                                width: 100,
                                height: 100,
                                resizeMode: "contain",
                            }}
                            source={{uri: image}}
                        />
                        <View style={tw`-ml-4`}>
                            <Text style={tw`text-xl font-semibold`}>{title}</Text>
                            <Text>{travelTimeInformation?.duration?.text}</Text>
                        </View>
                        <Text style={tw`text-xl`}>

                            {new Intl.NumberFormat('en-gb', {
                                style: 'currency',
                                currency: "USD"
                            }).format(

                                (travelTimeInformation?.duration?.value * SURGE_CHARGE_RATE * multiplier) / 100

                            )}

                        </Text>
                    </TouchableOpacity>
                )} 
            />

            <View> 
            {/* style={tw`mt-auto border-t border-gray-200` */}
                <TouchableOpacity disabled={!selected} style={tw`rounded-full bg-black py-2 bottom-3 m-5 ${!selected && 'bg-gray-300'}`}>
                    <Text style={tw`text-center text-white text-xl`}>Ride with {selected?.title}</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
};

export default RideOptionsCard;

const styles = StyleSheet.create({});