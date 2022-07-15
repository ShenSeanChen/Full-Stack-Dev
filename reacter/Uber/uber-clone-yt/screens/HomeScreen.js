import React from 'react';
import { StyleSheet, Text, View, SafeAreaView, Image} from 'react-native';
import tw from "tailwind-react-native-classnames";


const HomeScreen = () => {
    return (
        <SafeAreaView style={tw`bg-white h-full`}>
            {/* <Text style={[tw`text-red-500 p-10`, styles.text]}>This is the homescreen!</Text> */}
            <View style={tw`p-5`}>
                <Image 
                    style = {{
                        width:100, height:100, resizeMode: 'contain',
                    }}
                    source={{
                            uri: "https://links.papareact.com/gzs",
                            //uri stands for uniform resource identifier
                        }}
                />
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