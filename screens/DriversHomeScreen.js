import React, {  useCallback,Component, useState,useEffect  }  from "react";
import { Text, View, Dimensions, Animated,StyleSheet, FlatList, TouchableOpacity, Image, Switch , TouchableWithoutFeedback, ScrollView,RefreshControl, Button } from "react-native";
import ToggleSwitch from 'toggle-switch-react-native'
import SlidingUpPanel from "rn-sliding-up-panel";
import Map from "../components/Map";
const { height } = Dimensions.get("window");
import tw from "twrnc";
import { useDispatch, useSelector } from "react-redux";
import { selectDestination, selectOrigin, setTravelTimeInformation } from "../slices/navSlice";
import MapView, { AnimatedRegion } from 'react-native-maps';
import { Icon } from "@rneui/themed";
import { useNavigation } from "@react-navigation/native";
import Logo from "../components/Logo";
import AsyncStorage from '@react-native-async-storage/async-storage';
import baseUrl from "../assets/common/baseUrl";
import axios from 'react-native-axios';
import DialogInput from 'react-native-dialog-input';


const DriversHomeScreen = () => {
const [flag, setFlag] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const onRefresh = useCallback(() => {
    setRefreshing(true);
    wait(2000).then(() => setRefreshing(false));
  }, []);
  const [requests, setRequests] = useState([]);

  const [visible, setVisible] = React.useState(false);
  const [input, setInput] = React.useState('');

  const [isOnline, setIsOnline]  = useState(false);
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [currentEmail, setCurrentEmail] = useState('');


  const wait = (timeout) => {
    return new Promise((resolve) => setTimeout(resolve, timeout));
  };
  useEffect(() => {
    const retrieveEmail = async () => {
      try {
        const email = await AsyncStorage.getItem('email');
           setCurrentEmail(email);
      } catch (error) {
           console.log(error);
         }
         setFlag(true);
       };
       retrieveEmail();
     }, []);

  useEffect(() => {
  if (flag) {
    axios
      .get(`${baseUrl}requests/${currentEmail}`)
      .then((res) => {
        setRequests(res.data);
        console.log(res.data)
      })
      .catch((err) => {console.log(err);  console.log(`${baseUrl}requests/${currentEmail}`)});}
  }, [flag]);
const updateStatus = () => {
    let current_status = '';
    if(!isOnline){
        current_status = 'Online';
    }else{
        current_status = 'Offline';
    }
    axios.put(`${baseUrl}update-driver-status/${currentEmail}`, { status: current_status })
      .then(response => {
        console.log(response.data);
        console.log(currentEmail);
      })
      .catch(error => {
        console.log(`${baseUrl}/update-driver-status/${currentEmail}`)
        console.error(error);
      });

}

  const acceptRequest = (requestId) => {
    axios.put(`${baseUrl}update-request-status/${requestId}`, { status: 'accepted' })
          .then(response => {
            console.log(response.data);
          })
          .catch(error => {
            console.log(`${baseUrl}update-request-status/${requestId}`);
            console.error(error);
          });
  }
  const rejectRequest = (requestId) => {
    axios.put(`${baseUrl}update-request-status/${requestId}`, { status: 'rejected' })
          .then(response => {
           setVisible(true)
            console.log(response.data);
          })
          .catch(error => {
            console.log(`${baseUrl}update-request-status/${requestId}`);
            console.error(error);
          });
  }


  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        {isOnline ?  (
        <Text style={styles.headerText}>Online</Text>
        ):(<Text style={styles.headerText}>Offline</Text>
        )}
        <Switch
          trackColor={{ false: '#767577', true: '#32CD32' }}
          thumbColor={isOnline ? '#f4f3f4' : '#f4f3f4'}
          ios_backgroundColor="#3e3e3e"
          onValueChange={() => {
            setIsOnline(!isOnline);
            console.log(isOnline);
            updateStatus();}}
          value={isOnline}
        />
      </View>

      {isOnline ? (
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <View style={tw`mr-10 ml-10 mb-10 mt-2`}>
          {requests && requests.length > 0 ? (
            requests.map((d) => {
              return (
                <View key={d._id} style={tw`bg-slate-300 p-2 pl-5 mb-1`}>
                <DialogInput
                    isDialogVisible={visible}
                    title={"Request rejected"}
                    message={"Please provide justification for rejecting the order"}
                    hintInput ={"Enter Text"}
                    submitInput={ (inputText) => {
                        setInput(inputText),
                        setVisible(false);
                    }}
                    closeDialog={() => setVisible(false)}>
                </DialogInput>
                  <Text>Trip type: {d.data.tripType}</Text>
                  <Text>Origin: {d.data.origin.description}</Text>
                  <Text>Destination: {d.data.destination.description}</Text>
                  <Text>Requested time: {d.data.requiredDate}</Text>
                  <View
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      marginTop: 5,
                    }}
                  >
                    <View style={tw`mr-2`}>
                      <Button title="Accept" onPress={() => acceptRequest(d._id)} />
                    </View>
                    <View>
                      <Button
                        title="Reject"
                        color="gray"
                        onPress={() => rejectRequest(d._id)}
                      />
                    </View>
                  </View>
                </View>
              );
            })
          ) : (
            <Text>No requests yet</Text>
          )}
        </View>
      </ScrollView>
      ) : (
        <View style={styles.offlineContainer}>
          <Text style={styles.offlineText}>
            You are currently offline. Please switch your status to "Online" to see order requests.
          </Text>
        </View>
      )}
    </View>
  );
};

const styles = {
  container: {
    flex: 1,
    backgroundColor: '#fff',
    marginTop:40
  },
  headerContainer: {
    height: 50,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    backgroundColor: '#f2f2f2',
  },
  headerText: {fontSize: 16,
                   fontWeight: 'bold',
                 },
                 orderContainer: {
                   flex: 1,
                   padding: 20,
                 },
                 orderHeader: {
                   height: 50,
                   justifyContent: 'center',
                   borderBottomWidth: 1,
                   borderBottomColor: '#ccc',
                 },
                 orderHeaderText: {
                   fontSize: 18,
                   fontWeight: 'bold',
                 },
                 orderItemContainer: {
                   height: 70,
                   flexDirection: 'row',
                   alignItems: 'center',
                   justifyContent: 'space-between',
                   borderBottomWidth: 1,
                   borderBottomColor: '#ccc',
                 },
                 orderItemText: {
                   fontSize: 16,
                 },
                 buttonContainer: {
                   flexDirection: 'row',
                 },
                 acceptButton: {
                   backgroundColor: 'green',
                   padding: 10,
                   borderRadius: 5,
                   marginRight: 10,
                 },
                 rejectButton: {
                   backgroundColor: 'red',
                   padding: 10,
                   borderRadius: 5,
                 },
                 buttonText: {
                   color: '#fff',
                   fontWeight: 'bold',
                   textAlign: 'center',
                 },
                 offlineContainer: {
                   flex: 1,
                   alignItems: 'center',
                   justifyContent: 'center',
                 },
                 offlineText: {
                   fontSize: 16,
                   textAlign: 'center',
                 },
               };

               export default DriversHomeScreen;
