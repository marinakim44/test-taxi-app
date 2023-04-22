import {
  KeyboardAvoidingView,
  SafeAreaView,
  TouchableOpacity,
  Button,
  StyleSheet,
  View,
  Text,
  TextInput,
  ScrollView,
  Alert,
} from "react-native";
import React, { useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import { CheckBox } from "@rneui/themed";
import tw from "twrnc";
import Logo from "../components/Logo";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Picker } from "@react-native-picker/picker";
import DropDownPicker from "react-native-dropdown-picker";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import { GOOGLE_MAPS_APIKEY } from "@env";
import { useDispatch, useSelector } from "react-redux";
import {
  setDestination,
  setOrigin,
  selectOrigin,
  selectDestination,
} from "../slices/navSlice";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import DateTimePicker from "@react-native-community/datetimepicker";
import baseUrl from "../assets/common/baseUrl";
import axios from "react-native-axios";

const RequestScreen = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [text, setText] = useState();
  const [anotherPersonCheck, setAnotherPersonCheck] = useState(false);
  const [email, setEmail] = useState('');
  const [driverEmail, setDriverEmail] = useState('');
  const [code, setCode] = useState('');
  const [notes, setNotes] = useState('');
  const [pointa, setPointa] = useState('');
  const [pointb, setPointb] = useState('');
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState([
    { label: "Chargeable", value: "chargeable" },
    { label: "Non-Chargeable", value: "nonchargeable" },
  ]);
  const [date, setDate] = useState(new Date());
  const [mode, setMode] = useState('datetime');
  const [show, setShow] = useState(false);
  const [open2, setOpen2] = useState(false);
  const [tripValue, setTripValue] = useState(null);
  const [tripItems, setTripItems] = useState([
    { label: "City trip", value: "city" },
    { label: "Bishkek", value: "bishkek" },
  ]);
  const [open3, setOpen3] = useState(false);
  const [timeValue, setTimeValue] = useState(null);
  const [timeItems, setTimeItems] = useState([
    { label: "As soon as possible", value: "asap" },
    { label: "Request for later", value: "later" },
  ]);

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate;
    setShow(false);
    setDate(currentDate);
  };

  const showMode = (currentMode) => {
    if (Platform.OS === "android") {
      setShow(false);
      // for iOS, add a button that closes the picker
    }
    setMode(currentMode);
  };

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

  const onChangeText = () => {
    console.log("Function");
  };


  async function createRequest() {

    Alert.alert("Request created");
    axios
      .get(`${baseUrl}find-driver`)
      .then((res) => {
        console.log(res.data);
        setDriverEmail(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
    const data = {
      email: email,
      chargeability: value,
      code: code,
      tripType: tripValue,
      origin: pointa,
      destination: pointb,
      urgency: timeValue,
      requiredDate: date,
      notes: notes,
      driver: driverEmail,
      status: "pending",
    };
    axios
      .post(`${baseUrl}create-request`, data)
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });


      navigation.navigate("OrderScreen",{ timeValue })
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
              Please be informed that car requests should be raised at least 1
              hour before the trip.
            </Text>
          </View>
          {!anotherPersonCheck && (
            <View>
              <Text style={tw` pl-3 m-0`}>Car requested for:</Text>
              <TextInput
                style={styles.input}
                onChangeText={onChangeText}
                value={email}
                placeholder={email}
                editable={false}
              />
            </View>
          )}
        </View>
        <View style={styles.test}>
          <CheckBox
            center
            title="Request for another person"
            // checkedIcon="dot-circle-o"
            // uncheckedIcon="circle-o"
            checked={anotherPersonCheck}
            onPress={() => setAnotherPersonCheck(!anotherPersonCheck)}
          />
        </View>
        {anotherPersonCheck && (
          <TextInput
            style={styles.input}
            onChangeText={(text) => setEmail(text)}
            value={text}
            placeholder="Email"
          />
        )}
        <Text style={tw`pl-3 m-0`}>Request type:</Text>
        <View style={styles.test} zIndex={2}>
          <DropDownPicker
            open={open}
            value={value}
            items={items}
            setOpen={setOpen}
            setValue={setValue}
            setItems={setItems}
            style={{ margin: 10, width: 390, backgroundColor: "white" }}
            dropDownContainerStyle={{
              width: 390,
              margin: 10,
              backgroundColor: "#fff",
            }}
          />
        </View>
        {value !== null && value == "chargeable" ? (
          <Text style={tw`pl-3 m-0`}>Client code:</Text>
        ) : null}
        {value !== null && value == "chargeable" ? (
          <TextInput
            style={styles.input}
            onChangeText={(text) => setCode(text)}
            value={text}
            placeholder="34000777 | Z025"
          />
        ) : null}
        <Text style={tw`pl-3 m-0`}>Trip type:</Text>
        <View style={styles.test} zIndex={1}>
          <DropDownPicker
            open={open2}
            value={tripValue}
            items={tripItems}
            setOpen={setOpen2}
            setValue={setTripValue}
            setItems={setTripItems}
            style={{ margin: 10, width: 390, backgroundColor: "white" }}
            dropDownContainerStyle={{
              width: 390,
              margin: 10,
              backgroundColor: "#fff",
            }}
          />
        </View>
        <GooglePlacesAutocomplete
          nearbyPlacesAPI="GooglePlacesSearch"
          styles={{
            container: {
              flex: 0,
            },
            textInput: {
              fontSize: 18,
            },
          }}
          debounce={400}
          minLength={2}
          enablePoweredByContainer={false}
          fetchDetails={true}
          placeholder="Where from?"
          query={{
            key: GOOGLE_MAPS_APIKEY,
            language: "en",
          }}
          style={toInputBoxStyles}
          onPress={(data, details = null) => {
            console.log(data);
            console.log(details);
            dispatch(
              setOrigin({
                location: details.geometry.location,
                description: data.description,
              })
            );
            setPointa(data);
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
              setPointb(data);
            }}
            query={{
              key: GOOGLE_MAPS_APIKEY,
              language: "en",
            }}
            styles={toInputBoxStyles}
          />
        ) : null}

        <Text style={tw`pl-3 m-0`}>When is the car required?</Text>
        <View style={styles.test} zIndex={1}>
          <DropDownPicker
            open={open3}
            value={timeValue}
            items={timeItems}
            setOpen={setOpen3}
            setValue={setTimeValue}
            setItems={setTimeItems}
            style={{ margin: 10, width: 390, backgroundColor: "white" }}
            dropDownContainerStyle={{
              width: 390,
              margin: 10,
              backgroundColor: "#fff",
            }}
          />
        </View>
        {timeValue !== null && timeValue == "later" ? (
          <Text style={tw`pl-3 m-0`}>Select date and time:</Text>
        ) : null}
        {timeValue !== null && timeValue == "later" ? (
          <DateTimePicker
            testID="dateTimePicker"
            value={date}
            mode={mode}
            is24Hour={true}
            onChange={onChange}
          />
        ) : null}
        <Text style={tw`pl-3 m-0`}>Notes:</Text>
        <TextInput
          style={styles.inputNotes}
          onChangeText={(text) => setNotes(text)}
          value={text}
          placeholder="Type here..."
        />
        <TouchableOpacity style={{ margin: 11 }}>
          <Button title="Next" color="black" onPress={() => createRequest()} />
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

export default RequestScreen;
