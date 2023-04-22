import { KeyboardAvoidingView, Platform } from "react-native";
import { Provider } from "react-redux";
import HomeScreen from "./screens/HomeScreen";
import MapScreen from "./screens/MapScreen";
import { store } from "./store";
import { SafeAreaProvider } from "react-native-safe-area-context";
import "react-native-gesture-handler";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import "intl";
import "intl/locale-data/jsonp/en";
import RequestScreen from "./screens/RequestScreen";
import OrderScreen from "./screens/OrderScreen";
import AdminScreen from "./screens/AdminScreen";
import DriverScreen from "./screens/DriverScreen";
import ReportScreen from "./screens/ReportScreen";
import TariffScreen from "./screens/TariffScreen";
import LoginScreen from "./screens/LoginScreen";
import DriversHomeScreen from "./screens/DriversHomeScreen";
import PostScreen from "./screens/PostScreen";
import OfficeSupportScreen from "./screens/OfficeSupportScreen";
import PostRequestConfirm from "./screens/PostRequestConfirm";

export default function App() {
  const Stack = createNativeStackNavigator();

  return (
    <Provider store={store}>
      <NavigationContainer>
        <SafeAreaProvider>
          <KeyboardAvoidingView
            style={{ flex: 1 }}
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            keyboardVerticalOffset={Platform.OS === "ios" ? -64 : 0}
          >
            <Stack.Navigator>
              <Stack.Screen
                name="LoginScreen"
                component={LoginScreen}
                options={{
                  headerShown: false,
                }}
              />
              <Stack.Screen
                name="HomeScreen"
                component={HomeScreen}
                options={{
                  headerShown: false,
                }}
              />
              <Stack.Screen
                name="DriversHomeScreen"
                component={DriversHomeScreen}
                options={{
                  headerShown: false,
                }}
              />
              <Stack.Screen
                name="MapScreen"
                component={MapScreen}
                options={{
                  headerShown: false,
                }}
              />
              <Stack.Screen
                name="RequestScreen"
                component={RequestScreen}
                options={{
                  headerShown: false,
                }}
              />
              <Stack.Screen
                name="OrderScreen"
                component={OrderScreen}
                options={{
                  headerShown: false,
                }}
              />
              <Stack.Screen
                name="AdminScreen"
                component={AdminScreen}
                options={{
                  headerShown: false,
                }}
              />
              <Stack.Screen
                name="DriverScreen"
                component={DriverScreen}
                options={{
                  headerShown: false,
                }}
              />
              <Stack.Screen
                name="ReportScreen"
                component={ReportScreen}
                options={{
                  headerShown: false,
                }}
              />
              <Stack.Screen
                name="TariffScreen"
                component={TariffScreen}
                options={{
                  headerShown: false,
                }}
              />
              <Stack.Screen
                name="PostScreen"
                component={PostScreen}
                options={{
                  headerShown: false,
                }}
              />
              <Stack.Screen
                name="PostRequestConfirm"
                component={PostRequestConfirm}
                options={{
                  headerShown: false,
                }}
              />
              <Stack.Screen
                name="OfficeSupportScreen"
                component={OfficeSupportScreen}
                options={{
                  headerShown: false,
                }}
              />
            </Stack.Navigator>
          </KeyboardAvoidingView>
        </SafeAreaProvider>
      </NavigationContainer>
    </Provider>
  );
}
