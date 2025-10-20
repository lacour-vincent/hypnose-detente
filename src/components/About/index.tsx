import React, { type FC } from "react";
import { Linking, Pressable, ScrollView, Text, View } from "react-native";
import { useUnistyles } from "react-native-unistyles";

import * as Application from "expo-application";

import ENV from "@/env";
import { ROUTES } from "@/referential/routes";

import useRouter from "@/hooks/useRouter";

import Icon, { type Props as IconProps } from "@ui/Icon";
import Image from "@ui/Image";

import logo from "@/assets/icons/icon.png";

import s from "./styles";

type Keys = "version" | "website" | "reporting" | "terms-and-conditions" | "privacy-policy" | "developer";

interface AboutItem {
  key: Keys;
  icon: IconProps["name"];
  label: string;
  onItemPress: () => void;
}

const About: FC = () => {
  const { theme } = useUnistyles();
  const { navigate } = useRouter();

  const items: AboutItem[] = [
    {
      key: "version",
      icon: "code-tags",
      label: Application.nativeApplicationVersion as string,
      onItemPress: () => Linking.openURL(ENV.EXPO_PUBLIC_PLAY_STORE_URL),
    },
    {
      key: "website",
      icon: "web",
      label: "Site officiel",
      onItemPress: () => Linking.openURL(ENV.EXPO_PUBLIC_WEBSITE_URL),
    },
    {
      key: "reporting",
      icon: "comment-alert-outline",
      label: "Rapporter un problème",
      onItemPress: () => Linking.openURL(ENV.EXPO_PUBLIC_REPORT_URL),
    },
    {
      key: "terms-and-conditions",
      icon: "file-document-outline",
      label: "Conditions générales d'utilisation",
      onItemPress: () => navigate(ROUTES.TERMS_AND_CONDITIONS),
    },
    {
      key: "privacy-policy",
      icon: "shield-account",
      label: "Politique de confidentialité",
      onItemPress: () => navigate(ROUTES.PRIVACY_POLICY),
    },
  ];

  return (
    <ScrollView>
      <View style={s.container}>
        <Image style={s.logo} src={logo} alt="logo" />
        <Text style={s.title}>Hypnose — Détente</Text>
        <Text style={s.description}>
          Pour profiter pleinement de vos séances, nous vous recommandons de vous installer confortablement dans un
          endroit calme, assis ou allongé, avec un casque audio. N&apos;hésitez pas à lâcher prise. Bonne séance !
        </Text>
        {items.map(({ key, icon, label, onItemPress }) => {
          return (
            <Pressable
              key={key}
              style={s.pressable}
              role="button"
              aria-label={label}
              accessibilityRole="button"
              accessibilityLabel={label}
              android_ripple={{ color: "rgba(0, 0, 0, 0.1)", foreground: true }}
              onPress={onItemPress}
            >
              <Icon name={icon} size={25} color={theme.accent} />
              <Text style={s.label}>{label}</Text>
            </Pressable>
          );
        })}
      </View>
    </ScrollView>
  );
};
export default About;
