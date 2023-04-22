import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  Button,
  Alert,
  Image,
} from "react-native";
import React, { useEffect, useRef } from "react";
import tw from "twrnc";
import MapView, { Marker } from "react-native-maps";
import { selectOrigin, selectDestination } from "../slices/navSlice";
import { useSelector } from "react-redux";
import call from "react-native-phone-call";
import { useNavigation, useRoute  } from "@react-navigation/native";
import MapViewDirections from "react-native-maps-directions";
import { GOOGLE_MAPS_APIKEY } from "@env";

const OrderScreen = ( ) => {
 const route = useRoute();
 const timeValue = route.params.timeValue;
  //origin for now, but later will be location of the selected driver
  const origin = useSelector(selectOrigin);
  const destination = useSelector(selectDestination)
  const navigation = useNavigation();
  const mapRef = useRef(null);
  const driverLocation = "Esentai Mall, Al-Farabi Avenue, Almaty, Kazakhstan";

  useEffect(() => {
    if (!origin) return;

    mapRef.current.fitToSuppliedMarkers(["origin", "driver"], {
      edgePadding: {
        top: 51,
        bottom: 50,
        right: 50,
        left: 50,
      },
    });
  }, [origin]);

  useEffect(() => {
    if (!origin) return;

    const getTravelTime = async () => {
      fetch(
        `https://maps.googleapis.com/maps/api/distancematrix/json?origins=${origin.description}&destinations=${destination}&key=${GOOGLE_MAPS_APIKEY}`
      )
        .then((res) => res.json())
        .then((data) => {
          console.log(data.rows[0].elements[0]);
          // dispatch(setTravelTimeInformation(data.rows[0].elements[0]));
        })
        .catch((err) => console.log(err));
    };

    getTravelTime();
  }, [origin, GOOGLE_MAPS_APIKEY]);

  const args = {
    number: "+77778392399", // String value with the number to call
    prompt: true, // Optional boolean property. Determines if the user should be prompted prior to the call
    skipCanOpen: true, // Skip the canOpenURL check
  };

  const callDriver = () => {
    call(args);
  };

  const cancelRide = () => {
    Alert.alert("Order cancelled");
    navigation.navigate("HomeScreen");
  };

  return (
    <SafeAreaView style={tw`pt-15 h-full bg-white`}>
      <View style={tw`h-2/3`}>
        <MapView
          ref={mapRef}
          initialRegion={{
            latitude: origin?.location?.lat,
            longitude: origin?.location?.lng,
            latitudeDelta: 0.005,
            longitudeDelta: 0.005,
          }}
          style={tw`flex-1`}
          mapType="mutedStandard"
        >
          {origin && (
            <MapViewDirections
              origin={origin.description}
              destination={destination}
              apikey={GOOGLE_MAPS_APIKEY}
              strokeWidth={3}
              strokeColor="black"
            />
          )}
            <Marker
              coordinate={{
                latitude: origin.location.lat,
                longitude: origin.location.lng,
              }}
              title="Origin"
              description={origin.description}
              identifier="origin"
            />
            <Marker
              coordinate={{
                latitude: destination.location.lat,
                longitude: destination.location.lng,
              }}
              title="destination"
              description={destination.description}
              identifier="destination"
            />

          <Marker
            coordinate={{
              latitude: 43.21858605138206,
              longitude: 76.92798856235893,
            }}
            title="Driver's location"
            description={driverLocation}
            identifier="driver"
          >
            <Image
              source={require("../car.png")}
              style={{ height: 35, width: 35 }}
            />
          </Marker>
        </MapView>
      </View>
      <View>
        <View style={tw`m-5`}>
          <Text>Driver will arrive in 7 minutes</Text>
          <Text>White Toyota A007</Text>
        </View>
        <View style={tw`m-5`}>
          <Button onPress={callDriver} title="Call driver" color="black" />
        </View>
        <View style={tw`m-5 mt-0`}>
          <Button title="Cancel order" color="gray" onPress={cancelRide} />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default OrderScreen;

const styles = StyleSheet.create({});
