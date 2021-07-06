import PropTypes from "prop-types";
import React from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";

const CustomButton = ({ onPress, size, color, backgroundColor, tittle }) => (
  <TouchableOpacity
    style={[
      size === "small" && styles.buttonSmall,
      size === "big" && styles.buttonBig,
      { backgroundColor },
    ]}
    onPress={onPress}
  >
    <Text
      style={[
        size === "small" && styles.textSmall,
        size === "big" && styles.textBig,
        { color },
      ]}
    >
      {tittle}
    </Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  buttonSmall: {
    borderRadius: 10,
    elevation: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
  },

  buttonBig: {
    borderRadius: 10,
    elevation: 6,
    paddingHorizontal: 8,
    paddingVertical: 6,
  },

  textBig: {
    alignSelf: "center",
    fontSize: 18,
    fontWeight: "bold",
    textTransform: "uppercase",
  },

  textSmall: {
    alignSelf: "center",
    fontSize: 14,
    fontWeight: "bold",
    textTransform: "uppercase",
  },
});

CustomButton.propTypes = {
  onPress: PropTypes.func.isRequired,
  size: PropTypes.oneOf(["small", "big"]).isRequired,
  color: PropTypes.string.isRequired,
  backgroundColor: PropTypes.string.isRequired,
  tittle: PropTypes.string.isRequired,
};

export default CustomButton;
