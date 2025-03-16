import { View, Text, TouchableOpacity, Alert, StyleSheet } from "react-native";
import { useAuthStore } from "../../store/authStore";
import { useRouter } from "expo-router";

export default function Dashboard() {
  const { user, logout } = useAuthStore();
  const router = useRouter();

  const handleLogout = async () => {
    Alert.alert("Konfirmasi Logout", "Apakah kamu yakin ingin logout?", [
      {
        text: "Batal",
        style: "cancel",
      },
      {
        text: "Logout",
        onPress: async () => {
          await logout();
          router.replace("/(auth)"); // ✅ Arahkan ke login setelah logout
        },
      },
    ]);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.welcomeText}>
        Welcome, {user?.username || "Guest"}! 👋
      </Text>

      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Text style={styles.logoutButtonText}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f5f5f5",
  },
  welcomeText: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  logoutButton: {
    backgroundColor: "#ff3b30",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  logoutButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});
