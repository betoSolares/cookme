import PropTypes from "prop-types";
import React from "react";
import { Animated, TouchableWithoutFeedback } from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

const IconifyButton = ({ style, disabled, icon, iconSize, color, onPress }) => {
  const AnimatedIcon = Animated.createAnimatedComponent(Icon);
  const value = new Animated.Value(1);
  const s = { transform: [{ scale: value }] };
  const p = disabled ? { opacity: 0 } : { opacity: value };

  const animationIn = (callback) => {
    Animated.timing(new Animated.Value(1), {
      toValue: 0.8,
      useNativeDriver: true,
      duration: 200,
    }).start(callback);
  };

  const animationOut = () => {
    Animated.timing(new Animated.Value(1), {
      toValue: 1,
      useNativeDriver: true,
      duration: 200,
    }).start();
  };

  const iconPressed = () => {
    animationIn(animationOut);
    onPress();
  };

  return (
    <TouchableWithoutFeedback
      disabled={disabled}
      style={style}
      onPress={iconPressed}
    >
      <AnimatedIcon style={[p, s]} color={color} size={iconSize} name={icon} />
    </TouchableWithoutFeedback>
  );
};

IconifyButton.propTypes = {
  style: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  disabled: PropTypes.bool,
  icon: PropTypes.string.isRequired,
  iconSize: PropTypes.number.isRequired,
  color: PropTypes.string.isRequired,
  onPress: PropTypes.func.isRequired,
};

export default IconifyButton;
