import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import React, { useState } from "react";
import {
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
import { useAuth } from "@/contexts/AuthContext";

const LoginScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const { onLogin } = useAuth();

  const handleLogin = () => {
    onLogin(email, password);
    // Redirigir a tabs después del login
    router.replace("/(tabs)");
  };

  const handleGoogleLogin = () => {
    // Lógica de Google login
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
            />
            <TouchableOpacity
              onPress={() => setShowPassword(!showPassword)}
              style={styles.eyeIcon}
            >
              <Ionicons
                name={showPassword ? "eye-outline" : "eye-off-outline"}
                size={20}
                color={Colors.gray500}
              />
            </TouchableOpacity>
          </View>

          {/* Forgot Password */}
          <TouchableOpacity style={styles.forgotPassword}>
            <Text style={CommonStyles.link}>¿Olvidaste tu contraseña?</Text>
          </TouchableOpacity>

          {/* Login Button */}
          <TouchableOpacity
            style={CommonStyles.primaryButton}
            onPress={handleLogin}
          >
            <Text style={CommonStyles.buttonText}>Iniciar Sesión</Text>
          </TouchableOpacity>

          {/* Divider */}
          <View style={CommonStyles.divider}>
            <View style={CommonStyles.dividerLine} />
            <Text style={CommonStyles.dividerText}>o</Text>
            <View style={CommonStyles.dividerLine} />
          </View>

          {/* Google Login Button */}
          <TouchableOpacity
            style={CommonStyles.outlineButton}
            onPress={handleGoogleLogin}
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
            <TouchableOpacity onPress={goToRegister}>
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
});

export default LoginScreen;
