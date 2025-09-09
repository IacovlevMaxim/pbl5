import { AuthProvider } from "@/hooks/useAuth";
import { Stack } from "expo-router";
import React from "react";

export default function RootLayout() {
  return (
    <AuthProvider>
      <Stack screenOptions={{ headerShown: true }}>
          <Stack.Screen name="(tabs)" />
          <Stack.Screen name="login"  />
          <Stack.Screen name="register" />
          <Stack.Screen name="reset" />
          <Stack.Screen name="new-password" />
          <Stack.Screen name="activate" />
      </Stack>
    </AuthProvider>
  );
}
