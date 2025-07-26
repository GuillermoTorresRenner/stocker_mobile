import { router, useSegments } from "expo-router";
import React, { useEffect } from "react";
import { ActivityIndicator, Text, View } from "react-native";
import { Colors } from "../constants/mainTheme";
import { useAuth } from "../contexts/AuthContext";

interface AuthGuardProps {
  children: React.ReactNode;
}

export const AuthGuard: React.FC<AuthGuardProps> = ({ children }) => {
  const { isAuthenticated, isInitialized } = useAuth();
  const segments = useSegments();

  useEffect(() => {
    if (!isInitialized) return;

    const inAuthGroup = segments[0] === "(auth)";
    const inTabsGroup = segments[0] === "(tabs)";

    console.log("AuthGuard:", {
      isAuthenticated,
      segments,
      inAuthGroup,
      inTabsGroup,
    });

    if (isAuthenticated) {
      // Usuario autenticado
      if (inAuthGroup) {
        // Si está en auth, redirigir a tabs
        router.replace("/(tabs)");
      }
    } else {
      // Usuario no autenticado
      if (inTabsGroup) {
        // Si está en tabs, redirigir a login
        router.replace("/(auth)/login");
      }
      // Si está en index, se redirigirá automáticamente a login
    }
  }, [isAuthenticated, isInitialized, segments]);

  // Mostrar loading mientras se inicializa
  if (!isInitialized) {
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
          Cargando...
        </Text>
      </View>
    );
  }

  return <>{children}</>;
};
