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

const RegisterScreen = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleRegister = () => {
    router.replace("/(tabs)");
  };

  const handleGoogleRegister = () => {
    // Lógica de Google register
  };

  const goToLogin = () => {
    router.back();
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
        {/* Back Button */}
        <TouchableOpacity style={styles.backButton} onPress={goToLogin}>
          <Ionicons name="arrow-back" size={24} color={Colors.primary} />
        </TouchableOpacity>

        {/* Header */}
        <View style={styles.header}>
          <Text style={CommonStyles.appName}>Stocker</Text>
          <Text style={[CommonStyles.subtitle, styles.subtitlePadding]}>
            Únete y comienza a gestionar tu inventario
          </Text>
        </View>

        {/* Register Form */}
        <View style={CommonStyles.formContainer}>
          <Text style={CommonStyles.title}>Crear Cuenta</Text>

          {/* Name Input */}
          <View style={CommonStyles.inputContainer}>
            <Ionicons
              name="person-outline"
              size={20}
              color={Colors.gray500}
              style={CommonStyles.inputIcon}
            />
            <TextInput
              style={CommonStyles.input}
              placeholder="Nombre completo"
              placeholderTextColor={Colors.placeholder}
              value={formData.name}
              onChangeText={(value) => handleInputChange("name", value)}
              autoCapitalize="words"
              autoCorrect={false}
            />
          </View>

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
              value={formData.email}
              onChangeText={(value) => handleInputChange("email", value)}
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
              value={formData.password}
              onChangeText={(value) => handleInputChange("password", value)}
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

          {/* Confirm Password Input */}
          <View style={CommonStyles.inputContainer}>
            <Ionicons
              name="lock-closed-outline"
              size={20}
              color={Colors.gray500}
              style={CommonStyles.inputIcon}
            />
            <TextInput
              style={CommonStyles.input}
              placeholder="Confirmar contraseña"
              placeholderTextColor={Colors.placeholder}
              value={formData.confirmPassword}
              onChangeText={(value) =>
                handleInputChange("confirmPassword", value)
              }
              secureTextEntry={!showConfirmPassword}
              autoCapitalize="none"
            />
            <TouchableOpacity
              onPress={() => setShowConfirmPassword(!showConfirmPassword)}
              style={styles.eyeIcon}
            >
              <Ionicons
                name={showConfirmPassword ? "eye-outline" : "eye-off-outline"}
                size={20}
                color={Colors.gray500}
              />
            </TouchableOpacity>
          </View>

          {/* Terms and Conditions */}
          <View style={styles.termsContainer}>
            <Text style={styles.termsText}>
              Al registrarte, aceptas nuestros{" "}
              <Text style={CommonStyles.link}>Términos y Condiciones</Text> y{" "}
              <Text style={CommonStyles.link}>Política de Privacidad</Text>
            </Text>
          </View>

          {/* Register Button */}
          <TouchableOpacity
            style={CommonStyles.secondaryButton}
            onPress={handleRegister}
          >
            <Text style={CommonStyles.buttonText}>Crear Cuenta</Text>
          </TouchableOpacity>

          {/* Divider */}
          <View style={CommonStyles.divider}>
            <View style={CommonStyles.dividerLine} />
            <Text style={CommonStyles.dividerText}>o</Text>
            <View style={CommonStyles.dividerLine} />
          </View>

          {/* Google Register Button */}
          <TouchableOpacity
            style={CommonStyles.outlineButton}
            onPress={handleGoogleRegister}
          >
            <Ionicons
              name="logo-google"
              size={20}
              color={Colors.google}
              style={styles.googleIcon}
            />
            <Text style={CommonStyles.outlineButtonText}>
              Registrarse con Google
            </Text>
          </TouchableOpacity>

          {/* Login Link */}
          <View style={CommonStyles.row}>
            <Text style={styles.loginText}>¿Ya tienes una cuenta? </Text>
            <TouchableOpacity onPress={goToLogin}>
              <Text style={CommonStyles.link}>Inicia sesión</Text>
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
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing["2xl"],
  },
  backButton: {
    alignSelf: "flex-start",
    marginBottom: Spacing.md,
    padding: Spacing.sm,
  },
  header: {
    alignItems: "center",
    marginBottom: Spacing.xl,
  },
  subtitlePadding: {
    paddingHorizontal: Spacing.md,
  },
  eyeIcon: {
    padding: Spacing.xs,
  },
  termsContainer: {
    marginBottom: Spacing.lg,
  },
  termsText: {
    fontSize: Typography.fontSize.xs,
    color: Colors.textSecondary,
    textAlign: "center",
    lineHeight: Typography.lineHeight.relaxed * Typography.fontSize.xs,
  },
  googleIcon: {
    marginRight: Spacing.sm,
  },
  loginText: {
    color: Colors.textSecondary,
    fontSize: Typography.fontSize.sm,
  },
});

export default RegisterScreen;
