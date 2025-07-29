import React, { type FC } from "react";
import { Pressable, Text, View } from "react-native";

import theme from "@/styling";

import Icon from "../ui/Icon";
import s from "./styles";

const About: FC = () => {
  return (
    <View style={s.container}>
      <Pressable style={s.pressable} android_ripple={{ color: "rgba(0, 0, 0, 0.1)" }}>
        <Icon name="code-tags" size={theme["space-lg"]} color={theme["primary-color"]} />
        <View style={s.wrapper}>
          <Text style={s.title}>Version de l&apos;application</Text>
          <Text style={s.label}>2.0.0</Text>
        </View>
      </Pressable>
      <Pressable style={s.pressable} android_ripple={{ color: "rgba(0, 0, 0, 0.1)" }}>
        <Icon name="update" size={theme["space-lg"]} color={theme["primary-color"]} />
        <View style={s.wrapper}>
          <Text style={s.title}>Mise à jour de l&apos;application</Text>
          <Text style={s.label}>Vous serez redirigé vers le Play Store</Text>
        </View>
      </Pressable>
      <Pressable style={s.pressable} android_ripple={{ color: "rgba(0, 0, 0, 0.1)" }}>
        <Icon name="tools" size={theme["space-lg"]} color={theme["primary-color"]} />
        <View style={s.wrapper}>
          <Text style={s.title}>Rapporter un problème technique</Text>
          <Text style={s.label}>
            Expliquez le problème rencontré avec autant de détails que possible pour que je puisse le corriger
            rapidement.
          </Text>
        </View>
      </Pressable>
    </View>
  );
};
export default About;
