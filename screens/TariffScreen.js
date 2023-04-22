import {
  StyleSheet,
  Text,
  View,
  Button,
  SafeAreaView,
  Modal,
  Pressable,
  Alert,
  TextInput,
} from "react-native";
import React, { useState } from "react";
import tw from "twrnc";
import Logo from "../components/Logo";

const TariffScreen = () => {
  const [modalVisible, setModalVisible] = useState(false);

  const updateModel = () => {
    setModalVisible(!modalVisible);
    Alert.alert("Tariff model updated");
  }

  return (
    <SafeAreaView style={tw`bg-white h-full pt-5`}>
      <Logo />
      <Text style={tw`ml-5 mb-10`}>You are logged in as: Galina Ten</Text>
      <Text style={tw`text-center font-semibold text-lg`}>TariffScreen</Text>
      <View>
        <Text style={tw`ml-10 mt-10 font-semibold italic`}>
          Current tariff model:
        </Text>
        <Text style={tw`ml-10 mt-5`}>Coefficient = 1.5</Text>
        <Text style={tw`ml-10`}>Fee = Minutes * 60 * Coefficient</Text>
        <Text style={tw`ml-10`}>Airport fixed fee = KZT 5000</Text>
      </View>
      <View style={tw`m-10`}>
        <Button
          title="Update tariff model"
          onPress={() => setModalVisible(true)}
        />
      </View>
      <View>
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            Alert.alert("Modal has been closed.");
            setModalVisible(!modalVisible);
          }}
        >
          <View style={tw`mt-30`}>
            <View style={[styles.modalView, tw`bg-slate-200 p-5`]}>
              <Text style={styles.modalText}>Update tariff model</Text>
              <Text style={tw`mb-1`}>Coefficient</Text>
              <TextInput placeholder="1.5" style={styles.input} />
              <Text style={tw`mb-1 mt-5`}>Airport fee</Text>
              <TextInput placeholder="KZT 5000" style={styles.input} />
              <Pressable
                style={[styles.button, styles.buttonClose, tw`mt-5`]}
                onPress={updateModel}
              >
                <Text style={styles.textStyle}>UPDATE</Text>
              </Pressable>
              <Text
                style={tw`text-center mt-3 underline`}
                onPress={() => setModalVisible(!modalVisible)}
              >
                CANCEL
              </Text>
            </View>
          </View>
        </Modal>
      </View>
    </SafeAreaView>
  );
};

export default TariffScreen;

const styles = StyleSheet.create({
  input: {
    height: 40,
    borderWidth: 1,
    padding: 10,
  },
  centeredView: {
    flex: 1,
    // justifyContent: "center",
    // alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    margin: 10,
    borderRadius: 20,
    padding: 5,
    // alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
});
