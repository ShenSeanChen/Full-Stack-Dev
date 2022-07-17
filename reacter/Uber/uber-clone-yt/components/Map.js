import { View, Text } from 'react-native'
import React from 'react'
import MapView, {Marker} from 'react-native-maps'
import tw from 'tailwind-react-native-classnames'
import { useSelector } from 'react-redux'
import { selectOrigin } from '../slices/navSlice'

export default function Map() {

  const origin = useSelector(selectOrigin);

  return (
        // <MapView
        //   style={tw`flex-1`}
        //   // mapType="mutedStandard"
        //   initialRegion={{
        //     latitude: origin.location.lat,
        //     longitude: origin.location.long,
        //     latitudeDelta: 0.005,
        //     longitudeDelta: 0.005,
        // }}
        // />

        <MapView
        style={tw`flex-1`}
        initialRegion={{
          latitude: 37.78825,
          longitude: -122.4324,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      />

      
  )
}