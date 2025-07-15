import React, { type FC } from "react";

import { Stack } from "expo-router";

import useRouter from "@/hooks/useRouter";

import SampleHeader from "@/components/headers/SampleHeader";

import theme from "@/styling";

interface Params {
  id: string;
}

const SampleLayout: FC = () => {
  const { params } = useRouter<Params>();
  return (
    <Stack
      screenOptions={{
        title: params.id,
        headerTitle: params.id,
        headerTitleStyle: { fontSize: theme["font-size-lg"], color: theme["primary-color-text"] },
        headerTintColor: theme["primary-color-text"],
        headerRight: SampleHeader.HeaderRight,
        headerTransparent: true,
      }}
    />
  );
};

export default SampleLayout;
