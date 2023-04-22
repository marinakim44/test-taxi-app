import { View, Text, Button } from "react-native";
import React from "react";
import tw from "twrnc";
import call from "react-native-phone-call";
import { useNavigation } from "@react-navigation/native";

const PostRequestConfirm = ({ route }) => {
  const driverName = route.params.driverName;
  const navigation = useNavigation();
  const args = {
    number: "+77778392399", // String value with the number to call
    prompt: true, // Optional boolean property. Determines if the user should be prompted prior to the call
    skipCanOpen: true, // Skip the canOpenURL check
  };

  const callDriver = () => {
    call(args);
  };

  return (
    <View style={tw`m-5 mt-20`}>
      <Text>Your post delivery request #TBD has been logged</Text>
      <Text>Driver assigned:</Text>
      <Text>{driverName ? driverName : "TBD"}</Text>
      <Text> </Text>
      <Button title="CALL DRIVER" onPress={callDriver}></Button>
      <Text></Text>
      <Button
        title="BACK TO HOME PAGE"
        onPress={() => navigation.navigate("HomeScreen")}
      ></Button>
    </View>
  );
};

export default PostRequestConfirm;
