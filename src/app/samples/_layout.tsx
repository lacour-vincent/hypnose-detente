import React, { type FC } from "react";
import { useSelector } from "react-redux";

import { Stack } from "expo-router";

import { getSelectedSample } from "@/store/selectors/recording";

import SampleHeader from "@/components/headers/SampleHeader";

import theme from "@/styling";

const SampleLayout: FC = () => {
  const sample = useSelector(getSelectedSample);
  return (
    <Stack
      screenOptions={{
        title: sample.label,
        headerTitleStyle: { fontSize: theme["font-size-lg"], color: theme["primary-color-text"] },
        headerTintColor: theme["primary-color-text"],
        headerRight: SampleHeader.HeaderRight,
        headerTransparent: true,
      }}
    />
  );
};

export default SampleLayout;
