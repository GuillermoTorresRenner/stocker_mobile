import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Colors, CommonStyles } from "../../constants/mainTheme";
import { useAuth } from "../../contexts/AuthContext";

const Home = () => {
  const { onLogout, user, isLoading } = useAuth();

  const handleLogout = async () => {
    try {
      await onLogout();
    } catch (error) {
      console.error("Error logout:", error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>¡Bienvenido a Stocker!</Text>
      {user && (
        <View style={styles.userInfo}>
          <Text style={styles.userText}>Usuario: {user.name}</Text>
          <Text style={styles.userText}>Email: {user.email}</Text>
        </View>
      )}

      <TouchableOpacity
        style={[CommonStyles.primaryButton, isLoading && styles.disabled]}
        onPress={handleLogout}
        disabled={isLoading}
      >
        <Text style={CommonStyles.buttonText}>
          {isLoading ? "Cerrando sesión..." : "Cerrar Sesión"}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: Colors.background,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: Colors.primary,
    marginBottom: 20,
  },
  userInfo: {
    marginBottom: 30,
    alignItems: "center",
  },
  userText: {
    fontSize: 16,
    color: Colors.textSecondary,
    marginBottom: 5,
  },
  disabled: {
    opacity: 0.6,
  },
});

export default Home;
