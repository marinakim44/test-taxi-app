import { StyleSheet, View, SafeAreaView, Button, Text } from "react-native";
import React, { useState, useEffect  } from "react";
import tw from "twrnc";
import NavOptions from "../components/NavOptions";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import { GOOGLE_MAPS_APIKEY } from "@env";
import { useDispatch } from "react-redux";
import { setDestination, setOrigin } from "../slices/navSlice";
import NavFavorites from "../components/NavFavorites";
import Logo from "../components/Logo";
import { useNavigation, useRoute } from "@react-navigation/native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import baseUrl from "../assets/common/baseUrl";

const HomeScreen = ( ) => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
   const route = useRoute();
   const [email, setEmail] = useState('');
     useEffect(() => {
       const retrieveEmail = async () => {
         try {
           const email = await AsyncStorage.getItem('email');
           setEmail(email);
         } catch (error) {
           console.log(error);
         }
       };
       retrieveEmail();
     }, []);
  return (
    <SafeAreaView style={tw`bg-white h-full`}>
      <View style={tw`p-5`}>
        {/* <Image source={require("../logo.png")} style={styles.logo} /> */}
        <Logo />
        <NavOptions />
      </View>
      <View style={tw`m-5`}>
       { email.includes("admin") ? (
                      <Button
                        title="Admin"
                        color="gray"
                        style={tw`bottom-0 h-1/2`}
                        onPress={() => navigation.navigate("AdminScreen")}
                      />
            ) : null}

      </View>
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  logo: {
    width: 100,
    height: 100,
    resizeMode: "contain",
  },
});
