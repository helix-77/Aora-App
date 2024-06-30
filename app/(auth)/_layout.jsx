import { View, Text } from "react-native";
import React from "react";
import { Stack } from "expo-router";
import ExpoStatusBar from "expo-status-bar/build/ExpoStatusBar";

const AuthLayout = () => {
  return (
    <Stack>
      <Stack.Screen name="sign-in" options={{ headerShown: false }} />
      <Stack.Screen name="sign-up" options={{ headerShown: false }} />

      <ExpoStatusBar style="light" backgroundColor="#161622" />
    </Stack>
  );
};

export default AuthLayout;
