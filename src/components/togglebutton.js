import PropTypes from "prop-types";
import React, { useState } from "react";
import { Animated, TouchableWithoutFeedback } from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

const ToggleButton = ({
  style,
  disabled,
  singleToggled,
  iconSize,
  color,
  icon,
  toggledIcon,
  forceDefault,
  onPress,
}) => {
  const scale = new Animated.Value(1);
  const opacity = new Animated.Value(1);
  const s = { transform: [{ scale }] };
  const p = disabled ? { opacity: 0 } : { opacity };
  const AnimatedIcon = Animated.createAnimatedComponent(Icon);
  const [toggled, setToggled] = useState(false);
  const [name, setName] = useState(forceDefault ? toggledIcon : icon);

  const animation = (toSize, toOpacity, callback) => {
    Animated.parallel([
      Animated.spring(scale, {
        toValue: toSize,
        useNativeDriver: true,
        duration: 200,
      }),
      Animated.timing(opacity, {
        toValue: toOpacity,
        useNativeDriver: true,
        duration: 100,
      }),
    ]).start(callback);
  };

  const onAnimationFinish = () => {
    setToggled(!toggled);
    setName(name == icon ? toggledIcon : icon);
    animation(1, 1);
  };

  const toggle = () => {
    animation(0, 0, onAnimationFinish);
    onPress();
  };

  return (
    <TouchableWithoutFeedback
      disabled={(toggled && singleToggled) || disabled}
      style={style}
      onPress={toggle}
    >
      <AnimatedIcon style={[p, s]} color={color} size={iconSize} name={name} />
    </TouchableWithoutFeedback>
  );
};

ToggleButton.propTypes = {
  style: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  disabled: PropTypes.bool,
  singleToggled: PropTypes.bool,
  iconSize: PropTypes.number.isRequired,
  color: PropTypes.string.isRequired,
  icon: PropTypes.string.isRequired,
  toggledIcon: PropTypes.string.isRequired,
  forceDefault: PropTypes.bool,
  onPress: PropTypes.func.isRequired,
};

export default ToggleButton;
