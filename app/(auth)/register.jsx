import {
  TextInput,
  Text,
  View,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  Alert,
  ActivityIndicator,
} from "react-native";
import styles from "../../assets/styles/register.styles";
import { useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import COLORS from "../../constants/colors";
import { useAuthStore } from "../../store/authStore";
import { useRouter } from "expo-router";
import { Formik } from "formik";
import * as yup from "yup";

// ✅ Schema Validasi Pakai Yup
const registerSchema = yup.object().shape({
  username: yup
    .string()
    .min(3, "⚠ Username minimal 3 karakter")
    .required("⚠ Username wajib diisi"),
  email: yup
    .string()
    .email("⚠ Email tidak valid")
    .required("⚠ Email wajib diisi"),
  password: yup
    .string()
    .min(6, "⚠ Password minimal 6 karakter")
    .required("⚠ Password wajib diisi"),
});

export default function Register() {
  const { register } = useAuthStore();
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);

  const handleRegister = async (values, { setSubmitting, resetForm }) => {
    const result = await register(
      values.username,
      values.email,
      values.password
    );

    if (result.success) {
      Alert.alert(
        "Registrasi Berhasil",
        "Silakan login untuk mendapatkan akses."
      );
      resetForm(); // ✅ Kosongin input setelah sukses
      router.push("/(auth)"); // ✅ Arahkan ke halaman login setelah sukses
    } else {
      Alert.alert("Registrasi Gagal", result.error);
    }

    setSubmitting(false);
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <View style={styles.container}>
        <View style={styles.card}>
          <View style={styles.header}>
            <Text style={styles.title}>BookStore📚</Text>
            <Text style={styles.subtitle}>Find your books</Text>
          </View>
          <Formik
            initialValues={{ username: "", email: "", password: "" }}
            validationSchema={registerSchema}
            onSubmit={handleRegister}
          >
            {({
              handleChange,
              handleBlur,
              handleSubmit,
              values,
              errors,
              touched,
              isSubmitting,
              resetForm,
            }) => (
              <View style={styles.container}>
                <View style={styles.inputGroup}>
                  <Text style={styles.label}>Username</Text>
                  <View
                    style={[
                      styles.inputContainer,
                      touched.username && errors.username
                        ? styles.inputErrorBorder
                        : null,
                    ]}
                  >
                    <Ionicons
                      name="person-outline"
                      size={20}
                      color={COLORS.primary}
                      style={styles.inputIcon}
                    />
                    <TextInput
                      style={styles.input}
                      placeholder="Enter your username"
                      placeholderTextColor={COLORS.placeholderText}
                      value={values.username}
                      onChangeText={handleChange("username")}
                      onBlur={handleBlur("username")}
                      autoCapitalize="none"
                    />
                  </View>
                  {touched.username && errors.username && (
                    <Text style={styles.errorText}>{errors.username}</Text>
                  )}
                </View>

                <View style={styles.inputGroup}>
                  <Text style={styles.label}>Email</Text>
                  <View
                    style={[
                      styles.inputContainer,
                      touched.email && errors.email
                        ? styles.inputErrorBorder
                        : null,
                    ]}
                  >
                    <Ionicons
                      name="mail-outline"
                      size={20}
                      color={COLORS.primary}
                      style={styles.inputIcon}
                    />
                    <TextInput
                      style={styles.input}
                      placeholder="Enter your email"
                      placeholderTextColor={COLORS.placeholderText}
                      value={values.email}
                      onChangeText={handleChange("email")}
                      onBlur={handleBlur("email")}
                      keyboardType="email-address"
                      autoCapitalize="none"
                    />
                  </View>
                  {touched.email && errors.email && (
                    <Text style={styles.errorText}>{errors.email}</Text>
                  )}
                </View>

                <View style={styles.inputGroup}>
                  <Text style={styles.label}>Password</Text>
                  <View
                    style={[
                      styles.inputContainer,
                      touched.password && errors.password
                        ? styles.inputErrorBorder
                        : null,
                    ]}
                  >
                    <Ionicons
                      name="lock-closed-outline"
                      size={20}
                      color={COLORS.primary}
                      style={styles.inputIcon}
                    />
                    <TextInput
                      style={styles.input}
                      placeholder="Enter your password"
                      placeholderTextColor={COLORS.placeholderText}
                      value={values.password}
                      onChangeText={handleChange("password")}
                      onBlur={handleBlur("password")}
                      secureTextEntry={!showPassword}
                    />
                    <TouchableOpacity
                      onPress={() => setShowPassword(!showPassword)}
                      style={styles.eyeIcon}
                    >
                      <Ionicons
                        name={showPassword ? "eye-outline" : "eye-off-outline"}
                        size={20}
                        color={COLORS.primary}
                      />
                    </TouchableOpacity>
                  </View>
                  {touched.password && errors.password && (
                    <Text style={styles.errorText}>{errors.password}</Text>
                  )}
                </View>

                <TouchableOpacity
                  style={styles.button}
                  onPress={handleSubmit}
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <ActivityIndicator color="#FFF" />
                  ) : (
                    <Text style={styles.buttonText}>Register</Text>
                  )}
                </TouchableOpacity>

                <View style={styles.footer}>
                  <Text style={styles.footerText}>
                    Already have an Account?
                  </Text>
                  <TouchableOpacity onPress={() => router.back()}>
                    <Text style={styles.link}>Login</Text>
                  </TouchableOpacity>
                </View>
              </View>
            )}
          </Formik>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}
