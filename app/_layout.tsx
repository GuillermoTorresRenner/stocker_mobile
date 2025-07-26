import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { AuthProvider } from "../contexts/AuthContext";

export default function RootLayout() {
  return (
    <AuthProvider>
      <SafeAreaProvider>
        <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
          <StatusBar style="dark" />
          <Stack screenOptions={{ headerShown: false }}>
            <Stack.Screen name="index" />
            <Stack.Screen name="(auth)" />
            <Stack.Screen name="(tabs)" />
          </Stack>
        </SafeAreaView>
      </SafeAreaProvider>
    </AuthProvider>
  );
}
