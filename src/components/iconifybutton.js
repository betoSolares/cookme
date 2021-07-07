import PropTypes from "prop-types";
import React from "react";
import { TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

const IconifyButton = ({ style, disabled, icon, iconSize, color, onPress }) => (
  <TouchableOpacity
    disabled={disabled}
    style={style}
    onPress={onPress}
  >
    <Icon name={icon} size={iconSize} color={color} />
  </TouchableOpacity>
);

IconifyButton.propTypes = {
  style: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  disabled: PropTypes.bool,
  icon: PropTypes.string.isRequired,
  iconSize: PropTypes.number.isRequired,
  color: PropTypes.string.isRequired,
  onPress: PropTypes.func.isRequired,
};

export default IconifyButton;
