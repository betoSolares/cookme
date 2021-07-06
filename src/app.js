import { registerRootComponent } from "expo";
import { Camera } from "expo-camera";
import { StatusBar } from "expo-status-bar";
import React, { useEffect, useRef, useState } from "react";
import { SafeAreaView, StyleSheet, View } from "react-native";

import {
  CustomButton,
  CustomText,
  IconifyButton,
  LinkText,
  ToggleButton,
} from "./components";

const App = () => {
  const cameraReference = useRef();
  const [hasPermission, setHasPermission] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.back);
  const [flash, setFlash] = useState(Camera.Constants.FlashMode.off);
  const [preview, setPreview] = useState(false);
  const [cameraReady, setCameraReady] = useState(false);

  useEffect(() => {
    askPermission();
  }, []);

  const askPermission = async () => {
    const { status } = await Camera.requestPermissionsAsync();
    setHasPermission(status === "granted");
  };

  const handleType = () => {
    setType(
      type === Camera.Constants.Type.back
        ? Camera.Constants.Type.front
        : Camera.Constants.Type.back
    );
  };

  const handleFlash = () => {
    setFlash(
      flash === Camera.Constants.FlashMode.off
        ? Camera.Constants.FlashMode.torch
        : Camera.Constants.FlashMode.off
    );
  };

  const onCameraReady = () => {
    setCameraReady(true);
  };

  const snap = async () => {
    if (cameraReference.current) {
      const options = { quality: 1, base64: true };
      const data = await cameraReference.current.takePictureAsync(options);
      const source = data.base64;

      if (source) {
        await cameraReference.current.pausePreview();
        setPreview(true);
      }
    }
  };

  const cancelPreview = async () => {
    await cameraReference.current.resumePreview();
    setPreview(false);
  };

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
          onPress={askPermission}
          h4
        />
        <StatusBar style="auto" />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <Camera
        ref={cameraReference}
        style={styles.camera}
        type={type}
        flashMode={flash}
        autoFocus={"on"}
        onCameraReady={onCameraReady}
      >
        <View style={styles.uiContainer}>
          {!preview && (
            <>
              <View style={styles.topControls}>
                <IconifyButton
                  style={styles.iconButton}
                  icon={"account-circle"}
                  iconSize={34}
                  color={"#FEFEFE"}
                  disabled={!cameraReady}
                  onPress={() => {}}
                />
                <ToggleButton
                  icon={"camera-front"}
                  toggledIcon={"camera-rear"}
                  iconSize={34}
                  color={"#FEFEFE"}
                  styles={styles.iconButton}
                  disabled={!cameraReady}
                  onPress={handleType}
                />
                <ToggleButton
                  icon={"flash-off"}
                  toggledIcon={"flash"}
                  iconSize={34}
                  color={"#FEFEFE"}
                  styles={styles.iconButton}
                  disabled={!cameraReady}
                  onPress={handleFlash}
                />
                <IconifyButton
                  style={styles.iconButton}
                  icon={"nut"}
                  iconSize={34}
                  color={"#FEFEFE"}
                  disabled={!cameraReady}
                  onPress={() => {}}
                />
              </View>
              <View style={styles.bottomControls}>
                <IconifyButton
                  style={styles.iconButton}
                  icon={"upload"}
                  iconSize={34}
                  color={"#FEFEFE"}
                  disabled={!cameraReady}
                  onPress={() => {}}
                />
                <IconifyButton
                  style={styles.iconButton}
                  icon={"circle-double"}
                  iconSize={68}
                  color={"#FEFEFE"}
                  disabled={!cameraReady}
                  onPress={snap}
                />
                <IconifyButton
                  style={styles.iconButton}
                  icon={"circle-edit-outline"}
                  iconSize={34}
                  color={"#FEFEFE"}
                  disabled={!cameraReady}
                  onPress={() => {}}
                />
              </View>
            </>
          )}
          {preview && (
            <>
              <View style={styles.topControls}>
                <IconifyButton
                  style={styles.iconButton}
                  icon={"close-thick"}
                  iconSize={34}
                  color={"#FEFEFE"}
                  onPress={cancelPreview}
                />
              </View>
              <View style={styles.bottomControls}>
                <CustomButton
                  backgroundColor={"#F7F401"}
                  color={"#000102"}
                  size={"big"}
                  tittle={"Find Recepie"}
                  onPress={() => {}}
                />
              </View>
            </>
          )}
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
