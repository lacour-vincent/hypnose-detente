import React, { type FC } from "react";
import { useUnistyles } from "react-native-unistyles";
import { useSelector } from "react-redux";

import { Stack } from "expo-router";

import { getSelectedSample } from "@/store/selectors/recording";

import SampleHeader from "@/components/headers/SampleHeader";

const SampleLayout: FC = () => {
  const { theme } = useUnistyles();
  const sample = useSelector(getSelectedSample);
  return (
    <Stack
      screenOptions={{
        title: sample.label,
        headerTitleStyle: { fontSize: theme["font-size-md"], color: theme["primary-color-text"] },
        headerTintColor: theme["primary-color-text"],
        headerRight: SampleHeader.HeaderRight,
        headerTransparent: true,
      }}
    />
  );
};

export default SampleLayout;
