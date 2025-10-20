import React, { type FC, useEffect, useRef } from "react";
import { Animated, Easing, type StyleProp, View, type ViewStyle } from "react-native";
import { useUnistyles } from "react-native-unistyles";

import { LinearGradient } from "expo-linear-gradient";

import s from "./styles";

interface Props {
  style?: StyleProp<ViewStyle>;
}

const ProgressBar: FC<Props> = ({ style }) => {
  const { theme } = useUnistyles();
  const translateX = useRef(new Animated.Value(-150)).current;

  useEffect(() => {
    const timing = Animated.timing(translateX, {
      toValue: 150,
      duration: 1500,
      easing: Easing.linear,
      useNativeDriver: true,
    });
    Animated.loop(timing).start();
  }, []);

  return (
    <View style={[s.container, style]} role="progressbar" accessibilityRole="progressbar" accessible>
      <View style={s.progress}>
        <Animated.View style={[s.wrapper, { transform: [{ translateX }] }]}>
          <LinearGradient
            style={s.gradient}
            colors={["transparent", theme["secondary-color"], "transparent"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
          />
        </Animated.View>
      </View>
    </View>
  );
};

export default ProgressBar;
