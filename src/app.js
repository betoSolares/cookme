import { registerRootComponent } from "expo";
import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, Text, View } from "react-native";

const App = () => (
  <View style={styles.container}>
    <Text style={styles.text}>Hello World!</Text>
    <StatusBar style="auto" />
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#9bd1cd",
    alignItems: "center",
    justifyContent: "center",
  },

  text: {
    color: "#121212",
    fontSize: 18,
  },
});

export default registerRootComponent(App);
