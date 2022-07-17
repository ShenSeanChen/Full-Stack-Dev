import React from 'react';
import { StyleSheet, Text, View, SafeAreaView, Image} from 'react-native';
import tw from "tailwind-react-native-classnames";
import NavOptions from '../components/NavOptions';

import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { GOOGLE_MAPS_APIKEY } from "@env";
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { useDispatch } from 'react-redux';
import { setDestination, setOrigin } from '../slices/navSlice';


const HomeScreen = () => {
    const dispatch = useDispatch();

    return (
        <SafeAreaView style={tw`bg-white h-full`}>
            {/* <Text style={[tw`text-red-500 p-10`, styles.text]}>This is the homescreen!</Text> */}
            <View style={tw`p-5`}>

                <Image // Uber Logo
                    style = {{
                        width:100, height:100, resizeMode: 'contain',
                    }}
                    source={{
                            uri: "https://links.papareact.com/gzs",
                            //uri stands for uniform resource identifier
                        }}
                /> 

                <GooglePlacesAutocomplete 
                    placeholder="Where shall I take you on a ride to?"
                    styles={{
                        container: {
                            flex: 0,
                        },
                        textInput: {
                            fontSize: 18,
                        },
                        
                    }}

                    onPress={ (data, details = null) => {
                        // console.log(data)
                        // console.log(details)
                        dispatch(setOrigin({
                            location: details.geometry.location,
                            description: data.description
                        }))

                        dispatch(setDestination(null))
                    } }
                    fetchDetails={true}
                    returnKeyType={"search"}
                    enablePoweredByContainer={false}

                    minLength={2}

                    query={{
                        key: GOOGLE_MAPS_APIKEY,
                        language: 'en',
                    }}
                    nearbyPlacesAPI="GooglePlacesSearch"
                    debounce={400}
                />
                    
                <NavOptions/> 
                
                

            </View>
        </SafeAreaView>
    );
};

export default HomeScreen;

const styles = StyleSheet.create({
    text: {
        color: "purple",
    },
});