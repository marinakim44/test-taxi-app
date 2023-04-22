import {
  TextInput,
  StyleSheet,
  Text,
  View,
  Button,
  SafeAreaView,
  TouchableOpacity,
  Alert,
  RefreshControl,
  ScrollView,
} from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import tw from "twrnc";
import Logo from "../components/Logo";
import { Icon } from "@rneui/themed";
import baseUrl from "../assets/common/baseUrl";
import axios from 'react-native-axios';

import { useNavigation } from "@react-navigation/native";

const wait = (timeout) => {
  return new Promise((resolve) => setTimeout(resolve, timeout));
};


const DriverScreen = () => {
  const navigation = useNavigation();
  const [refreshing, setRefreshing] = useState(false);
  const onRefresh = useCallback(() => {
    setRefreshing(true);
    wait(2000).then(() => setRefreshing(false));
  }, []);

  const [drivers, setDrivers] = useState([]);

  useEffect(() => {
    axios
      .get(`${baseUrl}drivers`)
      .then((res) => {
        setDrivers(res.data);
      })
      .catch((err) => {console.log(err)});
  }, []);

  const [isNewDriver, setIsNewDriver] = useState(false);
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [plate, setPlate] = useState("");
  const [model, setModel] = useState("");

  const handleChangeEmail = (e) => {
    setEmail(e);
  };
  const handleChangePhone = (e) => {
    setPhone(e);
  };
  const handleChangePlate = (e) => {
    setPlate(e);
  };
  const handleChangeModel = (e) => {
    setModel(e);
  };

  const addDriver = () => {
    Alert.alert("Driver added");
    setIsNewDriver(false);

    const data = {
      email: email,
      phone: phone,
      plate: plate,
      model: model,
      status: "Offline"
    };

    axios
      .post(`${baseUrl}add-driver`, data)
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => {console.log(err);
                        console.log(`${baseUrl}add-driver`);
      });
  };

  const deleteDriver = (id) => {
    axios
      .delete(`${baseUrl}delete-driver/${id}`)
      .then((res) =>{ console.log(res.data); console.log(id)})
      .catch((err) =>{ console.log(err); console.log(id)});

    Alert.alert("Driver deleted");
    navigation.navigate("DriverScreen");
  };
  return (
    <SafeAreaView style={tw`bg-white h-full pt-5`}>
      <Logo />
      <Text style={tw`ml-5 mb-5`}>You are logged in as: Galina Ten</Text>

      <TouchableOpacity style={tw`flex-row items-center pl-10`}>
        <Icon
          style={tw`mr-4 rounded-full bg-slate-500 p-3`}
          name="car"
          type="ionicon"
          color="white"
          size={18}
        />
        <View>
          <Text
            style={tw`font-semibold text-lg underline`}
            onPress={() => setIsNewDriver(true)}
          >
            Add driver
          </Text>
        </View>
      </TouchableOpacity>

      {isNewDriver && (
        <View style={tw`mt-5 pl-10 pr-10 pt-5 bg-slate-200 h-full`}>
          <Text style={tw`text-center font-semibold`}>Add new driver</Text>
          <Text></Text>
          <Text style={tw`mb-2`}>Email</Text>
          <TextInput
            style={styles.input}
            onChangeText={handleChangeEmail}
            value={email}
            placeholder="Type here..."
          />
          <Text></Text>
          <Text style={tw`mb-2`}>Phone number</Text>
          <TextInput
            style={styles.input}
            onChangeText={handleChangePhone}
            value={phone}
            placeholder="Type here..."
          />
          <Text></Text>
          <Text style={tw`mb-2`}>Car plate number</Text>
          <TextInput
            style={styles.input}
            onChangeText={handleChangePlate}
            value={plate}
            placeholder="Type here..."
          />
          <Text></Text>
          <Text style={tw`mb-2`}>Car model</Text>
          <TextInput
            style={styles.input}
            onChangeText={handleChangeModel}
            value={model}
            placeholder="Type here..."
          />

          <View style={tw`mt-5`}>
            <Button title="Add driver" onPress={addDriver} />
          </View>
          <View style={tw`mt-5`}>
            <Button
              title="Cancel"
              color="gray"
              onPress={() => setIsNewDriver(false)}
            />
          </View>
        </View>
      )}

      <Text style={tw`ml-10 mt-10 font-semibold`}>List of drivers</Text>
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <View style={tw`mr-10 ml-10 mb-10 mt-2`}>
          {drivers && drivers.length > 0 ? (
            drivers.map((d) => {
              return (
                <View key={d._id} style={tw`bg-slate-300 p-2 pl-5 mb-1`}>
                  <Text>Email: {d.data.email}</Text>
                  <Text>Phone number: {d.data.phone}</Text>
                  <Text>Car model: {d.data.model}</Text>
                  <Text>Car plate number: {d.data.plate}</Text>
                  <View
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      marginTop: 5,
                    }}
                  >
                    <View style={tw`mr-2`}>
                      <Button title="Update" />
                    </View>
                    <View>
                      <Button
                        title="Delete"
                        color="gray"
                        onPress={() => deleteDriver(d._id)}
                      />
                    </View>
                  </View>
                </View>
              );
            })
          ) : (
            <Text>No drivers yet</Text>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default DriverScreen;

const styles = StyleSheet.create({
  input: {
    height: 40,
    borderWidth: 1,
    padding: 10,
  },
  container: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
