import React from "react";
import { SafeAreaView } from "react-native";

import { CustomText } from "../components";

const SettingsScreen = () => {
  return (
    <SafeAreaView>
      <CustomText
        color={"#000"}
        h1
        bold
        content={"SETTIGNS SCREEN"}
        textAlign={"center"}
      />
    </SafeAreaView>
  );
};

export default SettingsScreen;
