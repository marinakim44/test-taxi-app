import { StyleSheet, Text, View, Button, SafeAreaView } from "react-native";
import React from "react";
import tw from "twrnc";
import Logo from "../components/Logo";
import { useNavigation } from "@react-navigation/native";

const OfficeSupportScreen = () => {
  const navigation = useNavigation();

  return (
    <SafeAreaView style={tw`bg-white h-full pt-5`}>
      <Logo />
      <Text style={tw`ml-5 mb-10`}>You are logged in as: Galina Ten</Text>
      <Text style={tw`text-center font-semibold text-lg`}>OfficeSupportScreen</Text>
    </SafeAreaView>
  );
};

export default OfficeSupportScreen;

const styles = StyleSheet.create({});
