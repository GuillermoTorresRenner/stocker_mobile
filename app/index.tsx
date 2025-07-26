import { router } from "expo-router";
import { useEffect } from "react";
import { ActivityIndicator, Text, View } from "react-native";
import { Colors } from "../constants/mainTheme";
import { useAuth } from "../contexts/AuthContext";

export default function Index() {
  const { isAuthenticated, isInitialized } = useAuth();

  useEffect(() => {
    if (!isInitialized) return;

    // Pequeño delay para asegurar que el layout esté montado
    const timer = setTimeout(() => {
      if (isAuthenticated) {
        router.replace("/(tabs)");
      } else {
        router.replace("/(auth)/login");
      }
    }, 100);

    return () => clearTimeout(timer);
  }, [isAuthenticated, isInitialized]);

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: Colors.background,
      }}
    >
      <ActivityIndicator size="large" color={Colors.primary} />
      <Text
        style={{
          marginTop: 16,
          color: Colors.textSecondary,
          fontSize: 16,
        }}
      >
        Stocker
      </Text>
    </View>
  );
}
