import { router } from "expo-router";
import { useEffect } from "react";
import { Text, View } from "react-native";

export default function Index() {
  useEffect(() => {
    // Pequeño delay para asegurar que el layout esté montado
    const timer = setTimeout(() => {
      router.replace("/(auth)/login");
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Cargando...</Text>
    </View>
  );
}
