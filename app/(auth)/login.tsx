import { useAuth } from "@/contexts/AuthContext";
import { Ionicons } from "@expo/vector-icons";
import * as Google from "expo-auth-session/providers/google";
import { router } from "expo-router";
import React, { useState } from "react";
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import {
  Colors,
  CommonStyles,
  Spacing,
  Typography,
} from "../../constants/mainTheme";

const LoginScreen = () => {
  const [request, response, promptAsync] = Google.useAuthRequest({
    androidClientId:
      "656055098982-trs1m0n7vu8uafc130ei3dcgqm03gp5k.apps.googleusercontent.com",
  });
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const { onLogin, isLoading } = useAuth();

  const handleLogin = async () => {
    // Validaciones básicas
    if (!email.trim()) {
      Alert.alert("Error", "El email es requerido");
      return;
    }

    if (!password.trim()) {
      Alert.alert("Error", "La contraseña es requerida");
      return;
    }

    if (!onLogin) {
      Alert.alert("Error", "Servicio de autenticación no disponible");
      return;
    }

    try {
      await onLogin(email, password);
      // No necesitamos redirigir manualmente, AuthGuard se encarga
    } catch (error: any) {
      Alert.alert("Error", error.message || "Error al iniciar sesión");
    }
  };

  const handleGoogleLogin = async () => {
    try {
      await promptAsync();
    } catch (error) {
      console.log(error);
      Alert.alert("Error", "Error al iniciar sesión con Google");
    }
  };

  const goToRegister = () => {
    router.push("/(auth)/register");
  };

  return (
    <KeyboardAvoidingView
      style={CommonStyles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View style={styles.header}>
          <Text style={CommonStyles.appName}>Stocker</Text>
          <Text style={CommonStyles.subtitle}>
            Gestiona tu inventario fácilmente
          </Text>
        </View>

        {/* Login Form */}
        <View style={CommonStyles.formContainer}>
          <Text style={CommonStyles.title}>Iniciar Sesión</Text>

          {/* Email Input */}
          <View style={CommonStyles.inputContainer}>
            <Ionicons
              name="mail-outline"
              size={20}
              color={Colors.gray500}
              style={CommonStyles.inputIcon}
            />
            <TextInput
              style={CommonStyles.input}
              placeholder="Correo electrónico"
              placeholderTextColor={Colors.placeholder}
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
              autoCorrect={false}
              editable={!isLoading}
            />
          </View>

          {/* Password Input */}
          <View style={CommonStyles.inputContainer}>
            <Ionicons
              name="lock-closed-outline"
              size={20}
              color={Colors.gray500}
              style={CommonStyles.inputIcon}
            />
            <TextInput
              style={CommonStyles.input}
              placeholder="Contraseña"
              placeholderTextColor={Colors.placeholder}
              value={password}
              onChangeText={setPassword}
              secureTextEntry={!showPassword}
              autoCapitalize="none"
              editable={!isLoading}
            />
            <TouchableOpacity
              onPress={() => setShowPassword(!showPassword)}
              style={styles.eyeIcon}
              disabled={isLoading}
            >
              <Ionicons
                name={showPassword ? "eye-outline" : "eye-off-outline"}
                size={20}
                color={Colors.gray500}
              />
            </TouchableOpacity>
          </View>

          {/* Forgot Password */}
          <TouchableOpacity style={styles.forgotPassword} disabled={isLoading}>
            <Text style={CommonStyles.link}>¿Olvidaste tu contraseña?</Text>
          </TouchableOpacity>

          {/* Login Button */}
          <TouchableOpacity
            style={[
              CommonStyles.primaryButton,
              isLoading && styles.disabledButton,
            ]}
            onPress={handleLogin}
            disabled={isLoading}
          >
            <Text style={CommonStyles.buttonText}>
              {isLoading ? "Iniciando sesión..." : "Iniciar Sesión"}
            </Text>
          </TouchableOpacity>

          {/* Divider */}
          <View style={CommonStyles.divider}>
            <View style={CommonStyles.dividerLine} />
            <Text style={CommonStyles.dividerText}>o</Text>
            <View style={CommonStyles.dividerLine} />
          </View>

          {/* Google Login Button */}
          <TouchableOpacity
            style={[
              CommonStyles.outlineButton,
              isLoading && styles.disabledButton,
            ]}
            onPress={handleGoogleLogin}
            disabled={isLoading}
          >
            <Ionicons
              name="logo-google"
              size={20}
              color={Colors.google}
              style={styles.googleIcon}
            />
            <Text style={CommonStyles.outlineButtonText}>
              Continuar con Google
            </Text>
          </TouchableOpacity>

          {/* Register Link */}
          <View style={CommonStyles.row}>
            <Text style={styles.registerText}>¿No tienes una cuenta? </Text>
            <TouchableOpacity onPress={goToRegister} disabled={isLoading}>
              <Text style={CommonStyles.link}>Regístrate</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    justifyContent: "center",
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing["2xl"],
  },
  header: {
    alignItems: "center",
    marginBottom: Spacing["2xl"],
  },
  eyeIcon: {
    padding: Spacing.xs,
  },
  forgotPassword: {
    alignSelf: "flex-end",
    marginBottom: Spacing.lg,
  },
  googleIcon: {
    marginRight: Spacing.sm,
  },
  registerText: {
    color: Colors.textSecondary,
    fontSize: Typography.fontSize.sm,
  },
  disabledButton: {
    opacity: 0.6,
  },
});

export default LoginScreen;
