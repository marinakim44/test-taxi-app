import {
  StyleSheet,
  View,
  SafeAreaView,
  Button,
  Text,
  TouchableOpacity,
  TextInput,
} from "react-native";
import tw from "twrnc";
import NavOptions from "../components/NavOptions";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import { GOOGLE_MAPS_APIKEY } from "@env";
import { useDispatch } from "react-redux";
import { setDestination, setOrigin } from "../slices/navSlice";
import NavFavorites from "../components/NavFavorites";
import Logo from "../components/Logo";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useState, useEffect } from "react";
import axios from "axios";

const storeEmail = async (email) => {};
const LoginScreen = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [enteredEmail, setEnteredEmail] = useState(""); //INIT TO EMPTY
  const [emailExists, setEmailExists] = useState(false);

  async function submitEmail(enteredEmail) {
    if (enteredEmail.includes("driver")) {
      try {
        await AsyncStorage.setItem("email", enteredEmail);
        console.log(enteredEmail);
      } catch (error) {
        console.log(error);
      }
      navigation.navigate("DriversHomeScreen");
    } else {
      try {
        await AsyncStorage.setItem("email", enteredEmail);
      } catch (error) {
        console.log(error);
      }
      navigation.navigate("HomeScreen");
    }
  }

  return (
    <SafeAreaView style={tw`bg-white h-full`}>
      <View style={tw`p-5`}>
        {/* <Image source={require("../logo.png")} style={styles.logo} /> */}
        <Logo />
        <Text
          style={{
            padding: 20,
            borderRadius: 5,
            marginBottom: 10,
            fontSize: 18,
            marginLeft: 110,
          }}
        >
          Login Screen
        </Text>
        <TextInput
          style={{ padding: 20, borderRadius: 10, marginBottom: 30 }}
          placeholder="Email address"
          onChangeText={(text) => setEnteredEmail(text)}
        />
        <TextInput
          style={{ padding: 20, borderRadius: 10, marginBottom: 30 }}
          placeholder="Password"
        />
        <TouchableOpacity
          onPress={() => submitEmail(enteredEmail)}
          style={{
            backgroundColor: "#F3BE26",
            padding: 20,
            borderRadius: 10,
            marginBottom: 30,
          }}
        >
          <Text>Login</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  logo: {
    width: 100,
    height: 100,
    resizeMode: "contain",
  },
});
