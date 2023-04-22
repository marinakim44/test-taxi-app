import { FlatList, Text, TouchableOpacity, View, Image } from "react-native";
import React, { useState, useEffect } from "react";
import tw from "twrnc";
import { Icon } from "@rneui/themed";
import { useNavigation } from "@react-navigation/native";
import { useSelector } from "react-redux";
import { selectOrigin } from "../slices/navSlice";
import AsyncStorage from '@react-native-async-storage/async-storage';

const NavOptions = () => {
  const [email, setEmail] = useState("");
  useEffect(() => {
    const retrieveEmail = async () => {
      try {
        const email = await AsyncStorage.getItem("email");
        setEmail(email);
      } catch (error) {
        console.log(error);
      }
    };
    retrieveEmail();
  }, []);

  const data = email.includes("admin")
    ? [
        {
          id: "001",
          title: "Car request",
          image: require("../taxi.png"),
          screen: "RequestScreen",
        },
        {
          id: "002",
          title: "Post request",
          image: require("../delivery-man.png"),
          screen: "PostScreen",
        },
        {
          id: "003",
          title: "Office support",
          image: require("../moving.png"),
          screen: "OfficeSupportScreen",
        },
      ]
    : [
        {
          id: "001",
          title: "Car request",
          image: require("../taxi.png"),
          screen: "RequestScreen",
        },
        {
          id: "002",
          title: "Post request",
          image: require("../delivery-man.png"),
          screen: "CourierScreen",
        },
      ];

  const navigation = useNavigation();
  const origin = useSelector(selectOrigin);

  return (
    <FlatList
      data={data}
      contentContainerStyle={{ flexGrow: 1, justifyContent: "center" }}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <TouchableOpacity
          onPress={() => navigation.navigate(item.screen)}
          style={tw`p-2 bg-gray-200 m-2 w-90 justify-center`}
        >
          <View style={tw`flex items-center`}>
            <Image
              style={{ width: 50, height: 50, resizeMode: "contain" }}
              source={item.image}
            />
            <Text style={tw`mt-2 text-lg font-semibold`}>{item.title}</Text>
          </View>
        </TouchableOpacity>
      )}
    />
  );
};

export default NavOptions;
