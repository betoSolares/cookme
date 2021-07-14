import PropTypes from "prop-types";
import React from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";

import { IconifyButton } from ".";
import { CustomText } from "./text";

export const NormalListItem = ({ text, backgroundColor, color, onPress }) => (
  <TouchableOpacity onPress={onPress}>
    <View style={[styles.item, { backgroundColor }]} onPress>
      <CustomText p content={text} color={color} textAlign={"auto"} />
    </View>
  </TouchableOpacity>
);

export const RemovableListItem = ({
  text,
  backgroundColor,
  color,
  onRemove,
}) => (
  <View style={[styles.item, { backgroundColor }]}>
    <CustomText p content={text} color={color} textAlign={"auto"} />
    <IconifyButton
      icon={"delete"}
      iconSize={24}
      color={color}
      onPress={onRemove}
    />
  </View>
);

const styles = StyleSheet.create({
  item: {
    padding: 15,
    borderRadius: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 20,
  },
});

NormalListItem.propTypes = {
  text: PropTypes.string.isRequired,
  color: PropTypes.string.isRequired,
  backgroundColor: PropTypes.string.isRequired,
  onPress: PropTypes.func.isRequired
};

RemovableListItem.propTypes = {
  text: PropTypes.string.isRequired,
  color: PropTypes.string.isRequired,
  backgroundColor: PropTypes.string.isRequired,
  onRemove: PropTypes.func.isRequired,
};
