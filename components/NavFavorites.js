import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { FlatList } from "react-native-gesture-handler";
import { Icon } from "@rneui/themed";
import tw from "twrnc";

const NavFavorites = () => {
  const data = [
    {
      id: "123",
      icon: "home",
      location: "Home",
      destination: "Code Street, London, UK",
    },
    {
      id: "456",
      icon: "briefcase",
      location: "Work",
      destination: "London Eye, London, UK",
    },
  ];

  return (
    <View style={tw`bg-white`}>
      <FlatList
        data={data}
        keyExtractor={(item) => item.id}
        ItemSeparatorComponent={() => (
          <View style={[tw`bg-gray-200 h-1`, { height: 0.5 }]} />
        )}
        renderItem={({ item: { location, destination, icon } }) => (
          <TouchableOpacity style={tw`flex-row items-center p-5`}>
            <Icon
              style={tw`mr-4 rounded-full bg-gray-300 p-3`}
              name={icon}
              type="ionicon"
              color="white"
              size={18}
            />
            <View>
              <Text style={tw`font-semibold text-lg`}>{location}</Text>
              <Text style={tw`text-gray-500`}>{destination}</Text>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

export default NavFavorites;

const styles = StyleSheet.create({});
