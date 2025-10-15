import React, { type FC, StrictMode } from "react";
import { Provider } from "react-redux";

import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";

import { createStore } from "@/store";

import Alerting from "@/components/Alerting";
import SamplesHeader from "@/components/headers/SamplesHeader";

import theme from "@/styling";

SplashScreen.hide();
SplashScreen.setOptions({ duration: 400, fade: true });

const { store } = createStore();

const RootLayout: FC = () => {
  return (
    <StrictMode>
      <Provider store={store}>
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
          <Stack.Screen name="settings" options={{ title: "Paramètres", headerRight: undefined }} />
          <Stack.Screen
            name="terms-and-conditions"
            options={{ title: "Conditions générales d'utilisation", headerRight: undefined }}
          />
          <Stack.Screen
            name="privacy-policy"
            options={{ title: "Politique de confidentialité", headerRight: undefined }}
          />
        </Stack>
        <Alerting />
      </Provider>
    </StrictMode>
  );
};

export default RootLayout;
