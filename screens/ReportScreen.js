import {
  StyleSheet,
  Text,
  View,
  Button,
  SafeAreaView,
  Platform,
  Alert
} from "react-native";
import React, { useState } from "react";
import tw from "twrnc";
import Logo from "../components/Logo";
import DateTimePicker from "@react-native-community/datetimepicker";

const ReportScreen = () => {
  const [dateFrom, setDateFrom] = useState(new Date());
  const [dateTo, setDateTo] = useState(new Date());
  const [mode, setMode] = useState("date");
  const [showFrom, setShowFrom] = useState(false);
  const [showTo, setShowTo] = useState(false);
  const [textFrom, setTextFrom] = useState("TBD");
  const [textTo, setTextTo] = useState("TBD");

  const onChangeFrom = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShowFrom(Platform.OS === "ios");
    setDateFrom(currentDate);

    let tempDate = new Date(currentDate);
    let fDate =
      tempDate.getDate() +
      "/" +
      (tempDate.getMonth() + 1) +
      "/" +
      tempDate.getFullYear();

    setTextFrom(fDate);
  };

  const onChangeTo = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShowTo(Platform.OS === "ios");
    setDateTo(currentDate);

    let tempDate = new Date(currentDate);
    let fDate =
      tempDate.getDate() +
      "/" +
      (tempDate.getMonth() + 1) +
      "/" +
      tempDate.getFullYear();

    setTextTo(fDate);
  };

  const showModeFrom = (currentMode) => {
    setShowFrom(true);
    setMode(currentMode);
  };
  const showModeTo = (currentMode) => {
    setShowTo(true);
    setMode(currentMode);
  };

  return (
    <SafeAreaView style={tw`bg-white h-full pt-5`}>
      <Logo />
      <Text style={tw`ml-5 mb-10`}>You are logged in as: Galina Ten</Text>
      <Text style={tw`text-center font-semibold text-lg`}>ReportScreen</Text>
      <View style={styles.container}>
        <View style={{ margin: 20 }}>
          <Button
            title="Date from"
            color="gray"
            onPress={() => showModeFrom(dateFrom)}
          />
        </View>

        {showFrom && (
          <DateTimePicker
            testID="dateTimePicker"
            value={dateFrom}
            mode={mode}
            is24Hour={true}
            display="default"
            onChange={onChangeFrom}
          />
        )}
        <View style={{ margin: 20 }}>
          <Button
            title="Date to"
            color="gray"
            onPress={() => showModeTo(dateTo)}
          />
        </View>

        {showTo && (
          <DateTimePicker
            testID="dateTimePicker"
            value={dateTo}
            mode={mode}
            is24Hour={true}
            display="default"
            onChange={onChangeTo}
          />
        )}
        {/* <StatusBar style="auto" /> */}
      </View>

      <View style={tw`m-5`}>
        <Text >Generate report for iPos system</Text>

        <Text style={tw`mb-1`}>
          From {textFrom} to {textTo}
        </Text>

        <Button disabled={textFrom === "TBD" || textTo === "TBD" ? true : false} title="DOWNLOAD REPORT" onPress={() => Alert.alert("Report downloaded")} />
      </View>
    </SafeAreaView>
  );
};

export default ReportScreen;

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    // backgroundColor: "#fff",
    // alignItems: "center",
    // justifyContent: "center",
  },
});
