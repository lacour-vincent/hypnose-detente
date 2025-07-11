import React, { type FC } from "react";
import { Provider } from "react-redux";

import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";

// eslint-disable-next-line no-restricted-imports
import { PaperProvider } from "react-native-paper";

import { createStore } from "@sg/store";

import Alerting from "@sg/components/Alerting";

import theme, { paper } from "@sg/styling";

SplashScreen.hide();
SplashScreen.setOptions({ duration: 400, fade: true });

const { store } = createStore();

const RootLayout: FC = () => {
  return (
    <Provider store={store}>
      <PaperProvider theme={paper}>
        <StatusBar backgroundColor={theme["primary-color-dark"]} />
        <Stack screenOptions={{ headerShown: false }} />
        <Alerting />
      </PaperProvider>
    </Provider>
  );
};

export default RootLayout;
