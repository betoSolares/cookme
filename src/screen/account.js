import PropTypes from "prop-types";
import React, { useLayoutEffect } from "react";
import { SafeAreaView, StyleSheet, View } from "react-native";
import { DBURL } from "@env";

import { CustomButton, CustomText, IconifyButton } from "../components";

const AccountScreen = ({ navigation }) => {
  useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: function headerLeft() {
        return (
          <IconifyButton
            icon={"camera"}
            iconSize={34}
            color={"#000102"}
            onPress={() => navigation.navigate("Camera")}
          />
        );
      },
      headerRight: function headerRight() {
        return (
          <IconifyButton
            icon={"nut"}
            iconSize={34}
            color={"#000102"}
            onPress={() => navigation.navigate("Settings")}
          />
        );
      },
    });
  }, [navigation]);

  return (
    <SafeAreaView style={styles.container}>
      <CustomText
        color={"#000"}
        h1
        bold
        content={"CookMe"}
        textAlign={"center"}
      />
      <View style={styles.buttons}>
        <CustomButton
          onPress={() => navigation.navigate("LogIn")}
          size="big"
          backgroundColor={"#F7F401"}
          color={"#000102"}
          tittle={"Log In"}
        />
      </View>
      <View style={styles.buttons}>
        <CustomButton
          onPress={() => {}}
          size="big"
          backgroundColor={"#F7F401"}
          color={"#000102"}
          tittle={"Sign Up"}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#E8EAED",
  },

  buttons: {
    margin: 50,
    alignItems: "center",
    justifyContent: "center"
  }
});

AccountScreen.propTypes = {
  navigation: PropTypes.object.isRequired,
};

export default AccountScreen;
