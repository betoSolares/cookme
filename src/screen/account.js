import PropTypes from "prop-types";
import React, { useLayoutEffect } from "react";
import { SafeAreaView } from "react-native";

import { CustomText, IconifyButton } from "../components";

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
    <SafeAreaView>
      <CustomText
        color={"#000"}
        h1
        bold
        content={"ACCOUNT SCREEN"}
        textAlign={"center"}
      />
    </SafeAreaView>
  );
};

AccountScreen.propTypes = {
  navigation: PropTypes.object.isRequired,
};

export default AccountScreen;
