import {
  SafeAreaView,
  TouchableOpacity,
  Button,
  StyleSheet,
  View,
  Text,
  TextInput,
} from "react-native";
import React, { useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import { CheckBox } from "@rneui/themed";
import tw from "twrnc";
import Logo from "../components/Logo";
import AsyncStorage from "@react-native-async-storage/async-storage";
import DropDownPicker from "react-native-dropdown-picker";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import { GOOGLE_MAPS_APIKEY } from "@env";
import { useDispatch, useSelector } from "react-redux";
import {
  selectDestination,
  selectOrigin,
  setDestination,
  setOrigin,
} from "../slices/navSlice";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import DateTimePicker from "@react-native-community/datetimepicker";
import baseUrl from "../assets/common/baseUrl";
import axios from "react-native-axios";

const PostScreen = () => {
  const dispatch = useDispatch();
  const origin = useSelector(selectOrigin);
  const destination = useSelector(selectDestination);
  const navigation = useNavigation();
  const [anotherPerson, setAnotherPerson] = useState("");
  const [anotherPersonCheck, setAnotherPersonCheck] = useState(false);
  const [chargeCode, setChargeCode] = useState("");
  const [note, setNote] = useState("");
  const [email, setEmail] = useState("");
  const [open, setOpen] = useState(false);
  const [requestType, setRequestType] = useState("");
  const [items, setItems] = useState([
    { label: "Chargeable", value: "chargeable" },
    { label: "Non-Chargeable", value: "nonchargeable" },
  ]);
  const [date, setDate] = useState(new Date());
  const [mode, setMode] = useState("date");
  const [show, setShow] = useState(false);
  const [dateChosen, setDateChosen] = useState(false);
  const [showTime, setShowTime] = useState(false);
  const [time, setTime] = useState(new Date());

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

  const onChange = (event, selectedDate) => {
    setShow(false);
    setDate(selectedDate);
    setDateChosen(true);
  };
  const onChangeAnotherPerson = (e) => {
    setAnotherPerson(e);
  };
  const onChangeChargeCode = (e) => {
    setChargeCode(e);
  };
  const onChangeTime = (event, selectedTime) => {
    setShowTime(false);
    setTime(selectedTime);
  };
  const onChangeNote = (e) => {
    setNote(e);
  };

  const showMode = (currentMode) => {
    if (Platform.OS === "android") {
      setShow(false);
      // for iOS, add a button that closes the picker
    }
    setMode(currentMode);
  };

  const [tripValue, setTripValue] = useState(null);
  const [open3, setOpen3] = useState(false);
  const [timeValue, setTimeValue] = useState(null);
  const [timeItems, setTimeItems] = useState([
    { label: "As soon as possible", value: "asap" },
    { label: "Request for later", value: "later" },
  ]);

  const [request, setRequest] = useState({
    requestedFor: "",
    requestType: "",
    chargeCode: "",
    whereFrom: "",
    whereTo: "",
    when: "",
    date: "",
    time: "",
    note: "",
  });

  useEffect(() => {
    setRequest({
      requestedFor: anotherPersonCheck ? anotherPerson : email,
      requestType: requestType,
      chargeCode: requestType === "chargeable" ? chargeCode : "",
      whereFrom: origin,
      whereTo: destination,
      when: timeValue,
      date: timeValue === "asap" ? new Date() : date,
      time: timeValue === "asap" ? new Date().toTimeString() : time,
      note: note,
    });
  }, [anotherPerson, requestType, chargeCode, note, timeValue]);

  const [selectedDriver, setSelectedDriver] = useState("");

  const findDriver = (e) => {
    // axios get drivers
    // filter by status "available"
    // sort by lowest income today
    // for drivers with the same income:
    // > calculate distance between driver's location and "where from"
    // setSelectedDriver to the driver with minimum distance
    // send push notification to the driver
    // setSelectedDriver({
    //   driverId: 123,
    //   driverName: "Bo",
    //   driverLastname: "Jack",
    //   phone: "87778329456",
    //   car: "Batmobile A789",
    // });
    // return selectedDriver;
  };

  const submitRequest = () => {
    console.log(request);
    const data = request;
    axios.post(`${baseUrl}log-post-request`, data)
    navigation.navigate("PostRequestConfirm", { driverName: "Test Driver" });
  };

  return (
    <KeyboardAwareScrollView keyboardShouldPersistTaps="handled">
      <SafeAreaView style={tw`bg-white h-full`}>
        <View style={tw`pt-15`}>
          <View
            style={{
              display: "flex",
              flexDirection: "row",
            }}
          >
            <Logo />
          </View>
          <View style={tw`ml-4`}>
            <Text>Logged in as: {email}</Text>
          </View>
          <View
            style={{
              backgroundColor: "lightgray",
              padding: 20,
              borderRadius: 5,
              alignItems: "center",
              margin: 10,
            }}
          >
            <Text
              style={{
                fontSize: 16,
              }}
            >
              Please be informed that same day delivery requests should be
              raised until 15:00 Almaty time.
            </Text>
          </View>
        </View>
        <View style={styles.test}>
          <CheckBox
            center
            title="Request for another person"
            checked={anotherPersonCheck}
            onPress={() => setAnotherPersonCheck(!anotherPersonCheck)}
          />
        </View>
        {anotherPersonCheck && (
          <TextInput
            style={styles.input}
            onChangeText={onChangeAnotherPerson}
            value={anotherPerson}
            placeholder="Name"
          />
        )}
        <Text style={tw`pl-3 m-0`}>Request type:</Text>
        <View zIndex={1}>
          <DropDownPicker
            open={open}
            value={requestType}
            items={items}
            setOpen={setOpen}
            setValue={setRequestType}
            setItems={setItems}
            style={{ margin: 10, width: 350, backgroundColor: "white" }}
            dropDownContainerStyle={{
              width: 390,
              margin: 10,
              backgroundColor: "#fff",
            }}
          />
        </View>
        {requestType && requestType == "chargeable" && show ? (
          <Text style={tw`pl-3 m-0`}>Client code:</Text>
        ) : null}
        {requestType && requestType == "chargeable" ? (
          <TextInput
            style={styles.input}
            onChangeText={onChangeChargeCode}
            value={chargeCode}
            placeholder="Example: 34000777_Z025"
          />
        ) : null}
        <GooglePlacesAutocomplete
          placeholder="Where from?"
          debounce={400}
          nearbyPlacesAPI="GooglePlacesSearch"
          returnKeyType={"search"}
          minLength={2}
          enablePoweredByContainer={false}
          fetchDetails={true}
          query={{
            key: GOOGLE_MAPS_APIKEY,
            language: "en",
          }}
          styles={toInputBoxStyles}
          onPress={(data, details = null) => {
            console.log(data);
            console.log(details);
            dispatch(
              setOrigin({
                location: details.geometry.location,
                description: data.description,
              })
            );
          }}
        />
        {tripValue != "bishkek" ? (
          <GooglePlacesAutocomplete
            placeholder="Where to?"
            debounce={400}
            nearbyPlacesAPI="GooglePlacesSearch"
            returnKeyType={"search"}
            minLength={2}
            enablePoweredByContainer={false}
            fetchDetails={true}
            onPress={(data, details = null) => {
              console.log(data);
              console.log(details);
              dispatch(
                setDestination({
                  location: details.geometry.location,
                  description: data.description,
                })
              );
            }}
            query={{
              key: GOOGLE_MAPS_APIKEY,
              language: "en",
            }}
            styles={toInputBoxStyles}
          />
        ) : null}

        <Text style={tw`pl-3 m-0`}>When is the car required?</Text>
        <View zIndex={1}>
          <DropDownPicker
            open={open3}
            value={timeValue}
            items={timeItems}
            setOpen={setOpen3}
            setValue={setTimeValue}
            setItems={setTimeItems}
            style={{ margin: 10, width: 350, backgroundColor: "white" }}
            dropDownContainerStyle={{
              width: 390,
              margin: 10,
              backgroundColor: "#fff",
            }}
          />
        </View>

        {show && (
          <DateTimePicker
            testID="dateTimePicker"
            value={date}
            mode={mode}
            is24Hour={true}
            onChange={onChange}
          />
        )}

        <View style={tw`m-5`}>
          {timeValue === "later" && (
            <>
              <Button
                onPress={() => setShow(!show)}
                title={
                  timeValue === "later" && date
                    ? `${date.toString().substring(8, 10)} ${date
                        .toString()
                        .substring(4, 8)} ${date.toString().substring(11, 15)}`
                    : "Choose date"
                }
              ></Button>
              <Text></Text>
            </>
          )}

          {dateChosen && timeValue === "later" && (
            <Button
              title={time ? time.toString().substring(16, 21) : "Select time"}
              onPress={() => setShowTime(!showTime)}
            ></Button>
          )}
        </View>

        {showTime && (
          <DateTimePicker
            testID="dateTimePicker"
            value={date}
            mode="time"
            is24Hour={true}
            onChange={onChangeTime}
          />
        )}

        <Text style={tw`pl-3 m-0`}>Notes:</Text>
        <TextInput
          style={styles.inputNotes}
          onChangeText={onChangeNote}
          value={note}
          placeholder="Do you have any comments? Type here..."
        />
        <TouchableOpacity style={{ margin: 11 }}>
          <Button
            title="SUBMIT REQUEST"
            color="black"
            onPress={submitRequest}
          />
        </TouchableOpacity>
      </SafeAreaView>
    </KeyboardAwareScrollView>
  );
};

const styles = StyleSheet.create({
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
  inputNotes: {
    height: 70,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
  test: {
    display: "flex",
    flexDirection: "row",
  },
});

const toInputBoxStyles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    paddingTop: 20,
    flex: 0,
  },
  textInput: {
    height: 40,
    width: 120,
    borderWidth: 1,
    padding: 10,
  },
  textInputContainer: {
    paddingHorizontal: 20,
    paddingBottom: 0,
  },
});

export default PostScreen;
