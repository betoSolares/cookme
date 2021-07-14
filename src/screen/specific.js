import PropTypes from "prop-types";
import React from "react";
import {
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  View,
} from "react-native";

import { CustomButton, CustomText } from "../components";

const SpecificScreen = ({ route }) => {
  const { image, ingredients } = route.params;

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.scrollContainer}>
        <ScrollView contentContainerStyle={styles.scroll}>
          <View style={styles.contentWrapper}>
            <Image source={{ uri: image }} style={styles.image} />
            <CustomText
              h4
              content={"Ingredients"}
              color={"#000102"}
              textAlign={"center"}
            />
            {ingredients.map((item, idx) => (
              <CustomText
                key={idx}
                p
                content={`* ${item.text}`}
                color={"#000102"}
                textAlign={"justify"}
              />
            ))}
          </View>
        </ScrollView>
      </View>
      <View style={styles.bottomButtons}>
        <View style={styles.buttonStyle}>
          <CustomButton
            onPress={() => {}}
            size={"big"}
            backgroundColor={"#F7F401"}
            color={"#000102"}
            tittle={"Save"}
          />
        </View>
        <View style={styles.buttonStyle}>
          <CustomButton
            onPress={() => {}}
            size={"big"}
            backgroundColor={"#F7F401"}
            color={"#000102"}
            tittle={"Share"}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#E8EAED",
  },

  scrollContainer: {
    height: 525,
  },

  scroll: {
    flexGrow: 1,
  },

  contentWrapper: {
    paddingTop: 20,
    paddingHorizontal: 20,
  },

  image: {
    width: "100%",
    height: 300,
  },

  bottomButtons: {
    position: "absolute",
    bottom: 25,
    marginHorizontal: 5,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },

  buttonStyle: {
    flex: 1,
    marginHorizontal: 20,
  },
});

SpecificScreen.propTypes = {
  route: PropTypes.object.isRequired,
};

export default SpecificScreen;
