import { Link } from "expo-router";
import { useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import { useAuthStore } from "../store/authStore";

export default function Index() {
  const { user, token, checkAuth } = useAuthStore();

  useEffect(() => {
    const fetchAuth = async () => {
      console.log("Memanggil checkAuth...");
      await checkAuth(); // ✅ Pastikan `checkAuth()` dipanggil sebelum render
    };

    fetchAuth();
  }, []);

  console.log("User dari Zustand:", user);
  console.log("Token dari Zustand:", token);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome {user?.username}</Text>
      <Text style={styles.title}>Token {token}</Text>

      <Link href="/(auth)/register">Register</Link>
      <Link href="/(auth)">Login</Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    color: "blue",
    fontSize: 40,
    fontWeight: "bold",
  },
});
