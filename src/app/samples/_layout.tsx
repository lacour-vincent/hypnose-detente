import React, { type FC } from "react";

import { Stack } from "expo-router";

import useRouter from "@/hooks/useRouter";

import SampleHeader from "@/components/headers/SampleHeader";

interface Params {
  id: string;
}

const SampleLayout: FC = () => {
  const { params } = useRouter<Params>();
  return <Stack.Screen options={{ title: params.id, headerTitle: params.id, headerRight: SampleHeader.HeaderRight }} />;
};

export default SampleLayout;
