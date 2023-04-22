import { StyleSheet, Text, View, Button, SafeAreaView } from "react-native";
import React from "react";
import tw from "twrnc";
import Logo from "../components/Logo";
import { useNavigation } from "@react-navigation/native";

const AdminScreen = () => {
  const navigation = useNavigation();

  return (
    <SafeAreaView style={tw`bg-white h-full pt-5`}>
      <Logo />
      <Text style={tw`ml-5 mb-10`}>You are logged in as: Galina Ten</Text>
      <Text style={tw`text-center font-semibold text-lg`}>AdminScreen</Text>
      <View
        style={{
          flex: 1,
          margin: 20,
        }}
      >
        <Button
          title="Manage drivers information"
          color="#D04A02"
          style={{ marginTop: 10 }}
          onPress={() => navigation.navigate("DriverScreen")}
        />
        <Text></Text>
        <Button
          title="Export xml report"
          color="#AE6800"
          onPress={() => navigation.navigate("ReportScreen")}
        />
        <Text></Text>
        <Button
          title="Manage tariff model"
          color="#2d2d2d"
          onPress={() => navigation.navigate("TariffScreen")}
        />
      </View>
    </SafeAreaView>
  );
};

export default AdminScreen;

const styles = StyleSheet.create({});
