import React, { type FC } from "react";
import { Provider } from "react-redux";

import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";

import { createStore } from "@/store";

import Alerting from "@/components/Alerting";
import SamplesHeader from "@/components/headers/SamplesHeader";

import theme from "@/styling";

SplashScreen.hide();
SplashScreen.setOptions({ duration: 400, fade: true });

const { store } = createStore();

const RootLayout: FC = () => {
  return (
    <Provider store={store}>
      <StatusBar />
      <Stack
        screenOptions={{
          title: "Hypnose Détente",
          headerTitleStyle: { fontSize: theme["font-size-md"], color: theme["primary-color-text"] },
          headerTintColor: theme["primary-color-text"],
          headerStyle: { backgroundColor: theme["primary-color"] },
          headerRight: SamplesHeader.HeaderRight,
          animation: "slide_from_right",
        }}
      >
        <Stack.Screen name="samples" options={{ headerShown: false }} />
        <Stack.Screen name="about" options={{ title: "À propos", headerRight: undefined }} />
      </Stack>
      <Alerting />
    </Provider>
  );
};

export default RootLayout;
