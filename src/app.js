import { registerRootComponent } from "expo";
import { Camera } from "expo-camera";
import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import { SafeAreaView, StyleSheet, View } from "react-native";

import {
  CustomText,
  IconifyButton,
  LinkText,
  ToggleButton,
} from "./components";

const App = () => {
  const [hasPermission, setHasPermission] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.back);
  const [flash, setFlash] = useState(Camera.Constants.FlashMode.off);

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);

  if (hasPermission === null) {
    return <View />;
  }

  if (hasPermission === false) {
    return (
      <SafeAreaView style={styles.permissionContainer}>
        <CustomText
          color={"#FEFEFE"}
          textAlign={"center"}
          content={"No permission to\nuse camera"}
          h2
          bold
        />
        <CustomText
          color={"#FEFEFE"}
          textAlign={"center"}
          content={
            "You have to give CookMe access to your camera in order to use the app."
          }
          h4
        />
        <LinkText
          color={"#3366BB"}
          textAlign={"center"}
          content={"Give access"}
          onPress={async () => {
            const { status } = await Camera.requestPermissionsAsync();
            setHasPermission(status === "granted");
          }}
          h4
        />
        <StatusBar style="auto" />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <Camera
        style={styles.camera}
        type={type}
        flashMode={flash}
        autoFocus={"on"}
      >
        <View style={styles.uiContainer}>
          <View style={styles.topControls}>
            <IconifyButton
              style={styles.iconButton}
              icon={"account-circle"}
              iconSize={34}
              color={"#FEFEFE"}
              onPress={() => {}}
            />
            <ToggleButton
              icon={"camera-front"}
              toggledIcon={"camera-rear"}
              iconSize={34}
              color={"#FEFEFE"}
              styles={styles.iconButton}
              onPress={() => {
                setType(
                  type === Camera.Constants.Type.back
                    ? Camera.Constants.Type.front
                    : Camera.Constants.Type.back
                );
              }}
            />
            <ToggleButton
              icon={"flash-off"}
              toggledIcon={"flash"}
              iconSize={34}
              color={"#FEFEFE"}
              styles={styles.iconButton}
              onPress={() => {
                setFlash(
                  flash === Camera.Constants.FlashMode.off
                    ? Camera.Constants.FlashMode.torch
                    : Camera.Constants.FlashMode.off
                );
              }}
            />
            <IconifyButton
              style={styles.iconButton}
              icon={"nut"}
              iconSize={34}
              color={"#FEFEFE"}
              onPress={() => {}}
            />
          </View>
          <View style={styles.bottomControls}>
            <IconifyButton
              style={styles.iconButton}
              icon={"upload"}
              iconSize={34}
              color={"#FEFEFE"}
              onPress={() => {}}
            />
            <IconifyButton
              style={styles.iconButton}
              icon={"circle-double"}
              iconSize={68}
              color={"#FEFEFE"}
              onPress={() => {}}
            />
            <IconifyButton
              style={styles.iconButton}
              icon={"circle-edit-outline"}
              iconSize={34}
              color={"#FEFEFE"}
              onPress={() => {}}
            />
          </View>
        </View>
      </Camera>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  bottomControls: {
    flex: 1,
    paddingBottom: "8%",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "flex-end",
  },

  camera: {
    flex: 1,
  },

  container: {
    backgroundColor: "#000102",
    flex: 1,
    height: "100%",
    width: "100%",
  },

  iconButton: {
    height: 50,
    width: 50,
  },

  permissionContainer: {
    alignItems: "center",
    backgroundColor: "#000102",
    flex: 1,
    height: "100%",
    justifyContent: "center",
    width: "100%",
  },

  topControls: {
    flex: 1,
    paddingTop: "8%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },

  uiContainer: {
    flexDirection: "column",
    height: "100%",
    justifyContent: "flex-end",
    position: "absolute",
    width: "100%",
    zIndex: 0,
  },
});

export default registerRootComponent(App);
