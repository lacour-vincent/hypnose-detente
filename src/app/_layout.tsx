import React, { type FC } from "react";
import { Provider } from "react-redux";

import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";

// eslint-disable-next-line no-restricted-imports
import { PaperProvider } from "react-native-paper";

import { createStore } from "@/store";

import Alerting from "@/components/Alerting";
import SamplesHeader from "@/components/headers/SamplesHeader";

import theme, { paper } from "@/styling";

SplashScreen.hide();
SplashScreen.setOptions({ duration: 400, fade: true });

const { store } = createStore();

const RootLayout: FC = () => {
  return (
    <Provider store={store}>
      <PaperProvider theme={paper}>
        <StatusBar />
        <Stack
          screenOptions={{
            headerTitle: "Hypnose Détente",
            headerTitleStyle: { fontSize: theme["font-size-lg"], color: theme["primary-color-text"] },
            headerTintColor: theme["primary-color-text"],
            headerStyle: { backgroundColor: theme["primary-color"] },
            headerRight: SamplesHeader.HeaderRight,
          }}
        />
        <Alerting />
      </PaperProvider>
    </Provider>
  );
};

export default RootLayout;
