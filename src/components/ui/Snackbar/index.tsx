import React, { type FC, useEffect, useRef } from "react";
import { Animated, Easing, Pressable, Text } from "react-native";

import Icon from "@ui/Icon";

import theme from "@/styling";

import s from "./styles";

interface Props {
  variant?: "primary" | "secondary";
  message: string;
  onClose: () => void;
}

const Snackbar: FC<Props> = ({ variant = "primary", message, onClose }) => {
  const slide = useRef(new Animated.Value(0)).current;
  const opacity = useRef(new Animated.Value(0)).current;
  const translateY = slide.interpolate({ inputRange: [0, 1], outputRange: [100, 0] });
  const color = variant === "primary" ? theme["success-color-text"] : theme["error-color-text"];

  useEffect(() => {
    Animated.parallel([
      Animated.timing(slide, { toValue: 1, duration: 300, easing: Easing.out(Easing.cubic), useNativeDriver: true }),
      Animated.timing(opacity, { toValue: 1, duration: 200, useNativeDriver: true }),
    ]).start();
    return () => {
      slide.setValue(0);
      opacity.setValue(0);
    };
  }, []);

  const onPress = () => {
    Animated.parallel([
      Animated.timing(slide, { toValue: 0, duration: 250, easing: Easing.in(Easing.cubic), useNativeDriver: true }),
      Animated.timing(opacity, { toValue: 0, duration: 200, useNativeDriver: true }),
    ]).start(onClose);
  };

  return (
    <Animated.View style={[s.container, s[`container--${variant}`], { transform: [{ translateY }], opacity: opacity }]}>
      <Text style={[s.message, s[`message--${variant}`]]}>{message}</Text>
      <Pressable
        style={s.pressable}
        role="button"
        aria-label="fermer"
        accessibilityRole="button"
        accessibilityLabel="fermer"
        onPressIn={onPress}
      >
        <Icon name="close" size={24} color={color} />
      </Pressable>
    </Animated.View>
  );
};

export default Snackbar;
