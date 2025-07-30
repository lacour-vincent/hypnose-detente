import React, { type FC } from "react";
import { Pressable, Text, View } from "react-native";
import { useDispatch } from "react-redux";

import { ignoreBatteryOptimizations } from "@/store/actions/battery";

import s from "./styles";

const Settings: FC = () => {
  const dispatch = useDispatch();
  const onIgnoreBatteryOptimizationPress = () => dispatch(ignoreBatteryOptimizations.request());

  return (
    <View style={s.container}>
      <Pressable
        style={s.pressable}
        role="button"
        aria-label="Désactiver l'optimisation de la batterie"
        accessibilityRole="button"
        accessibilityLabel="Désactiver l'optimisation de la batterie"
        android_ripple={{ color: "rgba(0, 0, 0, 0.1)" }}
        onPress={onIgnoreBatteryOptimizationPress}
      >
        <Text style={s.label}>Désactiver l&apos;optimisation de la batterie</Text>
        <Text style={s.description}>
          Désactivez ce paramètre pour éviter les coupures pendant les séances. Certains appareils peuvent limiter le
          fonctionnement de l&apos;application en arrière-plan pour économiser la batterie.
        </Text>
      </Pressable>
    </View>
  );
};
export default Settings;
