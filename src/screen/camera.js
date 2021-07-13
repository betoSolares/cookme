import { useIsFocused } from "@react-navigation/core";
import { Camera } from "expo-camera";
import * as ImagePicker from "expo-image-picker";
import { StatusBar } from "expo-status-bar";
import PropTypes from "prop-types";
import React, { useEffect, useRef, useState } from "react";
import { Alert, Image, SafeAreaView, StyleSheet, View } from "react-native";
import Spinner from "react-native-loading-spinner-overlay";

import {
  CustomButton,
  CustomText,
  IconifyButton,
  LinkText,
  ToggleButton,
} from "../components";
import { checkContract } from "../utils";

const CameraScreen = ({ navigation, route }) => {
  const cameraReference = useRef();
  const [hasCameraPermission, setHasCameraPermission] = useState(null);
  const [hasMediaPermission, setHasMediaPermission] = useState(false);
  const [type, setType] = useState(Camera.Constants.Type.back);
  const [flash, setFlash] = useState(Camera.Constants.FlashMode.off);
  const [preview, setPreview] = useState(false);
  const [spinner, setSpinner] = useState(false);
  const [cameraReady, setCameraReady] = useState(false);
  const [image, setImage] = useState(null);
  const isFocused = useIsFocused();
  const { ingredientDetector } = route.params;
  const validIngredientDetector = checkContract(ingredientDetector, [
    "detectIngredients",
  ]);

  useEffect(() => {
    askCameraPermission();
  }, []);

  const askCameraPermission = async () => {
    const { status } = await Camera.requestPermissionsAsync();
    setHasCameraPermission(status === "granted");
  };

  const askMediaPermission = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    setHasMediaPermission(status === "granted");
    return status === "granted";
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
      const options = { quality: 0.5, base64: true };
      const { uri } = await cameraReference.current.takePictureAsync(options);

      if (uri) {
        await cameraReference.current.pausePreview();
        setFlash(Camera.Constants.FlashMode.off);
        setPreview(true);
        setImage(uri);
      }
    }
  };

  const pickImage = async () => {
    if (hasMediaPermission || (await askMediaPermission())) {
      const options = {
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: false,
        quality: 0.5,
        base64: true,
      };
      const { cancelled, uri } = await ImagePicker.launchImageLibraryAsync(
        options
      );

      if (!cancelled) {
        await cameraReference.current.pausePreview();
        setFlash(Camera.Constants.FlashMode.off);
        setPreview(true);
        setImage(uri);
      }
    }
  };

  const cancelPreview = async () => {
    await cameraReference.current.resumePreview();
    setImage(null);
    setPreview(false);
  };

  const getIngredients = async () => {
    const ingredients = await ingredientDetector.detectIngredients(image);
    return ingredients;
  };

  const searchFromImage = async () => {
    const alertButtons = [{ text: "Ok", onPress: cancelPreview }];
    const alertOptions = { cancelable: true };

    if (validIngredientDetector) {
      setSpinner(true);
      const ingredients = await getIngredients();
      if (ingredients.ingredients.length >= 0) {
        setSpinner(false);
        await cancelPreview();
      } else {
        setSpinner(false);
        Alert.alert(
          ingredients.error,
          ingredients.message,
          alertButtons,
          alertOptions
        );
      }
    } else {
      Alert.alert(
        "Error",
        "Ingredients detector is invalid.",
        alertButtons,
        alertOptions
      );
    }
  };

  if (hasCameraPermission === null) {
    return <View />;
  }

  if (hasCameraPermission === false) {
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
          onPress={askCameraPermission}
          h4
        />
        <StatusBar style="auto" />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      {isFocused && (
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
                    onPress={() => navigation.navigate("Account")}
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
                    onPress={() => navigation.navigate("Settings")}
                  />
                </View>
                <View style={styles.bottomControls}>
                  <IconifyButton
                    style={styles.iconButton}
                    icon={"upload"}
                    iconSize={34}
                    color={"#FEFEFE"}
                    disabled={!cameraReady}
                    onPress={pickImage}
                  />
                  <IconifyButton
                    icon={"circle-double"}
                    iconSize={80}
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
                    onPress={() => navigation.navigate("Ingredients")}
                  />
                </View>
              </>
            )}
            {preview && (
              <>
                <Spinner
                  visible={spinner}
                  textContent={"Processing image"}
                  color={"#F7F401"}
                  textStyle={styles.spinnerText}
                />
                {!spinner && (
                  <View style={styles.topControls}>
                    <IconifyButton
                      style={styles.iconButton}
                      icon={"close-thick"}
                      iconSize={34}
                      color={"#FEFEFE"}
                      onPress={cancelPreview}
                    />
                  </View>
                )}
                {image && (
                  <Image source={{ uri: image }} style={styles.image} />
                )}
                {!spinner && (
                  <View style={styles.bottomControls}>
                    <CustomButton
                      backgroundColor={"#F7F401"}
                      color={"#000102"}
                      size={"big"}
                      tittle={"Find Recepie"}
                      onPress={searchFromImage}
                    />
                  </View>
                )}
              </>
            )}
          </View>
        </Camera>
      )}
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
    zIndex: 2,
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

  image: {
    flex: 1,
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 1,
    width: "100%",
    height: "100%",
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
    zIndex: 2,
  },

  uiContainer: {
    flexDirection: "column",
    height: "100%",
    justifyContent: "flex-end",
    position: "absolute",
    width: "100%",
    zIndex: 0,
  },

  spinnerText: {
    color: "#F7F401",
  },
});

CameraScreen.propTypes = {
  navigation: PropTypes.object.isRequired,
  route: PropTypes.object.isRequired,
};

export default CameraScreen;
