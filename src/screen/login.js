import { DBURL } from "@env";
import PropTypes from "prop-types";
import React, { useState } from "react";
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  StyleSheet,
  TextInput,
  View,
} from "react-native";

import { CustomButton, CustomText } from "../components";

const LogInScreen = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [password, setPassword] = useState("");

  const makeRequest = async () => {
    const response = await fetch(`${DBURL}query`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        q: `INSERT INTO Cooker (username, email, firstname, lastname, userpassword) VALUES ('${username}', '${email}', '${firstname}', '${lastname}', '${password}');`,
      }),
    });

    return await response.json();
  };

  const logIn = async () => {
    const res = await makeRequest();
    if (res.error === false) {
      const alertButtons = [{ text: "Ok" }];
      const alertOptions = { cancelable: true };
      Alert.alert("Log in", "User created", alertButtons, alertOptions);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <CustomText
        color={"#000"}
        h1
        bold
        content={"Log In"}
        textAlign={"center"}
      />
      <View style={styles.buttons}>
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={styles.write}
        >
          <CustomText
            color={"#000"}
            h4
            bold
            content={"Username"}
            textAlign={"center"}
          />
          <TextInput
            style={styles.input}
            placeholder={"Username"}
            value={username}
            onChangeText={(text) => setUsername(text)}
            onSubmitEditing={(text) => setUsername(text)}
          />
        </KeyboardAvoidingView>
      </View>
      <View style={styles.buttons}>
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={styles.write}
        >
          <CustomText
            color={"#000"}
            h4
            bold
            content={"Email"}
            textAlign={"center"}
          />
          <TextInput
            style={styles.input}
            placeholder={"Email"}
            value={email}
            onChangeText={(text) => setEmail(text)}
            onSubmitEditing={(text) => setEmail(text)}
          />
        </KeyboardAvoidingView>
      </View>
      <View style={styles.buttons}>
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={styles.write}
        >
          <CustomText
            color={"#000"}
            h4
            bold
            content={"First NAme"}
            textAlign={"center"}
          />
          <TextInput
            style={styles.input}
            placeholder={"First Name"}
            value={firstname}
            onChangeText={(text) => setFirstname(text)}
            onSubmitEditing={(text) => setFirstname(text)}
          />
        </KeyboardAvoidingView>
      </View>
      <View style={styles.buttons}>
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={styles.write}
        >
          <CustomText
            color={"#000"}
            h4
            bold
            content={"Last Name"}
            textAlign={"center"}
          />
          <TextInput
            style={styles.input}
            placeholder={"lastname"}
            value={lastname}
            onChangeText={(text) => setLastname(text)}
            onSubmitEditing={(text) => setLastname(text)}
          />
        </KeyboardAvoidingView>
      </View>
      <View style={styles.buttons}>
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={styles.write}
        >
          <CustomText
            color={"#000"}
            h4
            bold
            content={"Password"}
            textAlign={"center"}
          />
          <TextInput
            style={styles.input}
            placeholder={"password"}
            value={password}
            onChangeText={(text) => setPassword(text)}
            onSubmitEditing={(text) => setPassword(text)}
          />
        </KeyboardAvoidingView>
      </View>
      <View style={styles.buttons}>
        <CustomButton
          onPress={logIn}
          size="big"
          backgroundColor={"#F7F401"}
          color={"#000102"}
          tittle={"Log in"}
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
    margin: 20,
    alignItems: "center",
    justifyContent: "center",
  },

  write: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    bottom: 10,
  },
});

LogInScreen.propTypes = {
  navigation: PropTypes.object.isRequired,
};

export default LogInScreen;
