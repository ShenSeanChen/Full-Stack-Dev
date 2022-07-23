import { View, Text } from 'react-native'
import React, { useEffect, useRef } from 'react'
import MapView, {Marker} from 'react-native-maps'
import tw from 'tailwind-react-native-classnames'
import { useDispatch, useSelector } from 'react-redux'
import { selectDestination, selectOrigin, setTravelTimeInformation } from '../slices/navSlice'
import NavigateCard from './NavigateCard'
import { GOOGLE_MAPS_APIKEY } from '@env'
import MapViewDirections from "react-native-maps-directions"

export default function Map() {

  console.log('-----------------------')
  const origin = useSelector(selectOrigin);
  console.log('Origin: ', origin)
  const destination = useSelector(selectDestination)
  console.log('Destination: ', destination) 
  console.log('-----------------------', '\n')

  const dispatch = useDispatch();


  const mapRef = useRef(null);
  useEffect(() => {
    if (!origin || !destination) return;

    // Zoom & fit to markers
    mapRef.current.fitToSuppliedMarkers(
      ['origin', 'destination'], 
      {edgePadding: {top: 50, right: 50, bottom: 50, left: 50}, 
      // animated:true
      },
      ) //Markers names are from identifiers of <Marker/> below
  }, [origin, destination]);


  useEffect(() => {
    if (!origin || !destination) return;

    const getTravelTime = async() => {
        fetch(
          `https://maps.googleapis.com/maps/api/distancematrix/json?
          units=imperial&origins=${origin.description}&destinations=${destination.description}&key=${GOOGLE_MAPS_APIKEY}`
        ).then(res => res.json())
        .then(data => {
          console.log('-----------------------')
          console.log('------Distance API-----')
          console.log(data)
          console.log('-----------------------', '\n')

          dispatch(setTravelTimeInformation(data.rows[0].elements[0]))

        })
    }

    getTravelTime();
  }, [origin, destination, GOOGLE_MAPS_APIKEY])


  return (
        <MapView
          
          ref={mapRef}
          style={tw`flex-1`}
          
          mapType="mutedStandard"
          initialRegion={{
            latitude: origin.location.lat,
            longitude: origin.location.lng,
            latitudeDelta: 0.005,
            longitudeDelta: 0.005,
          }}
        >      
            {origin && destination && (
              <MapViewDirections
                origin={origin.description}
                destination={destination.description}
                apikey={GOOGLE_MAPS_APIKEY}
                strokeWidth={3}
                strokeColor="black"
              />
            )}

            {/* origin marker */}
            {origin?.location && (
              <Marker 
                coordinate={{
                  latitude: origin.location.lat,
                  longitude: origin.location.lng,
                }}
                title="'hey Azumi!'"
                description={origin.description}
                identifier="origin" // mapRef.current.fitToSuppliedMarkers
              />
            )}

            {/* destination marker  */}
            {destination?.location && (
              <Marker 
                coordinate={{
                  latitude: destination.location.lat,
                  longitude: destination.location.lng,
                }}
                title="'hey Azumi!'"
                description={destination.description}
                identifier="destination" // mapRef.current.fitToSuppliedMarkers
              />
            )}
        </MapView>
  );
};