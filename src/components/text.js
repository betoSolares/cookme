import PropTypes from "prop-types";
import React from "react";
import { StyleSheet, Text } from "react-native";

import { adjustment } from "../utils";

export const CustomText = ({
  h1,
  h2,
  h3,
  h4,
  h5,
  p,
  bold,
  italic,
  underline,
  content,
  color,
  textAlign,
}) => (
  <Text
    style={[
      h1 && styles.h1,
      h2 && styles.h2,
      h3 && styles.h3,
      h4 && styles.h4,
      h5 && styles.h5,
      p && styles.p,
      bold && styles.bold,
      italic && styles.italic,
      underline && styles.underline,
      { color, textAlign },
    ]}
  >
    {content}
  </Text>
);

export const LinkText = ({
  h1,
  h2,
  h3,
  h4,
  h5,
  p,
  bold,
  italic,
  content,
  color,
  textAlign,
  onPress,
}) => (
  <Text
    style={[
      h1 && styles.h1,
      h2 && styles.h2,
      h3 && styles.h3,
      h4 && styles.h4,
      h5 && styles.h5,
      p && styles.p,
      bold && styles.bold,
      italic && styles.italic,
      styles.underline,
      { color, textAlign },
    ]}
    onPress={() => {
      onPress();
    }}
  >
    {content}
  </Text>
);

CustomText.propTypes = {
  h1: PropTypes.bool,
  h2: PropTypes.bool,
  h3: PropTypes.bool,
  h4: PropTypes.bool,
  h5: PropTypes.bool,
  p: PropTypes.bool,
  bold: PropTypes.bool,
  italic: PropTypes.bool,
  underline: PropTypes.bool,
  content: PropTypes.oneOfType([PropTypes.string, PropTypes.element])
    .isRequired,
  color: PropTypes.string.isRequired,
  textAlign: PropTypes.oneOf(["auto", "left", "right", "center", "justify"])
    .isRequired,
};

LinkText.propTypes = {
  h1: PropTypes.bool,
  h2: PropTypes.bool,
  h3: PropTypes.bool,
  h4: PropTypes.bool,
  h5: PropTypes.bool,
  p: PropTypes.bool,
  bold: PropTypes.bool,
  italic: PropTypes.bool,
  content: PropTypes.oneOfType([PropTypes.string, PropTypes.element])
    .isRequired,
  color: PropTypes.string.isRequired,
  textAlign: PropTypes.oneOf(["auto", "left", "right", "center", "justify"])
    .isRequired,
  onPress: PropTypes.func.isRequired,
};

const styles = StyleSheet.create({
  h1: {
    fontSize: adjustment(48),
  },

  h2: {
    fontSize: adjustment(32),
  },

  h3: {
    fontSize: adjustment(20),
  },

  h4: {
    fontSize: adjustment(18),
  },

  h5: {
    fontSize: adjustment(16),
  },

  p: {
    fontSize: adjustment(12),
  },

  bold: {
    fontWeight: "bold",
  },

  italic: {
    fontStyle: "italic",
  },

  underline: {
    textDecorationLine: "underline",
  },
});
