import { StyleSheet, Text, View, Image } from "react-native";
import React from "react";

const Logo = () => {
  return (
    <View>
      <Image source={require("../logo.png")} style={styles.logo} />
    </View>
  );
};

export default Logo;

const styles = StyleSheet.create({
  logo: {
    width: 100,
    height: 100,
    resizeMode: "contain",
  },
});
