import {
  Text,
  View,
  TouchableOpacity,
  SafeAreaView,
  FlatList,
  Image,
} from "react-native";
import React, { useState } from "react";
import tw from "twrnc";
import { Icon } from "@rneui/themed";
import { useNavigation } from "@react-navigation/native";
import { useSelector } from "react-redux";
import { selectTravelTimeInformation } from "../slices/navSlice";

const data = [
  {
    id: "PwC-Driver-123",
    title: "PwC Driver",
    multiplier: 1,
    image: "https://links.papareact.com/3pn",
  },
];

const SURGE_CHARGE_RATE = 1.5;

const RideOptionsCard = () => {
  const navigation = useNavigation();
  const [selected, setSelected] = useState(null);
  const travelTimeInformation = useSelector(selectTravelTimeInformation);

  return (
    //had to remove tw class flex-grow from safeareaview to see the button
    <SafeAreaView style={tw`bg-white flex-grow`}>
      <View>
        <TouchableOpacity
          style={tw`absolute top-3 left-5 p-3 rounded-full`}
          onPress={() => {
            navigation.navigate("NavigateCard");
          }}
        >
          <Icon name="chevron-left" type="fontawesome" />
        </TouchableOpacity>
        <Text style={tw`text-center py-5 text-xl`}>Trip information</Text>
      </View>

      <FlatList
        data={data}
        keyExtractor={(item) => item.id}
        renderItem={({ item: { id, title, multiplier, image }, item }) => (
          <TouchableOpacity
            style={tw`flex-row justify-between items-center px-10 ${
              id === selected?.id && "bg-gray-200"
            }`}
            onPress={() => setSelected(item)}
          >
            <Image
              style={{
                width: 70,
                height: 70,
                resizeMode: "contain",
              }}
              source={{ uri: image }}
            />
            <View style={tw`-ml-6`}>
              <Text style={tw`text-xl font-semibold`}>{title}</Text>
              <Text>
                {travelTimeInformation?.duration?.text} /{" "}
                {travelTimeInformation?.distance?.text}
              </Text>
            </View>
            <Text>
              {new Intl.NumberFormat("en-gb", {
                style: "currency",
                currency: "KZT",
              }).format(
                travelTimeInformation?.duration?.value * SURGE_CHARGE_RATE
              )}
            </Text>
          </TouchableOpacity>
        )}
      />

      <View style={tw`mt-auto border-t border-gray-300`}>
        <TouchableOpacity
          // style={tw`bg-black py-3 m-3 ${!selected && "bg-gray-300"}`}
          style={tw`bg-black py-3 m-3`}
          // disabled={!selected}
          onPress={() => navigation.navigate("RequestScreen")}
        >
          <Text style={tw`text-center text-white text-xl`}>Request for now</Text>
        </TouchableOpacity>
      </View>

      <View style={tw`mt-auto`}>
        <TouchableOpacity
          // style={tw`py-3 mb-5 ${!selected && "bg-gray-300"}`}
          style={tw`py-3 mb-5`}
          // disabled={!selected}
        >
          <Text style={tw`text-center text-xl underline`}>
            Schedule for later
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default RideOptionsCard;
