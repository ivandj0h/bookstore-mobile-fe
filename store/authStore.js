import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";

export const useAuthStore = create((set, get) => ({
  user: null,
  token: null,
  isLoading: false,

  // Save user & token ke AsyncStorage
  saveToStorage: async (user, token) => {
    try {
      await AsyncStorage.setItem("user", JSON.stringify(user));
      await AsyncStorage.setItem("token", token);
      console.log("✅ User & token tersimpan di AsyncStorage");
    } catch (error) {
      console.log("❌ Error menyimpan ke AsyncStorage:", error.message);
    }
  },

  // Hapus user & token dari AsyncStorage
  removeFromStorage: async () => {
    try {
      await AsyncStorage.removeItem("user");
      await AsyncStorage.removeItem("token");
      console.log("✅ User & token dihapus dari AsyncStorage");
    } catch (error) {
      console.log("❌ Error menghapus dari AsyncStorage:", error.message);
    }
  },

  // Register User
  register: async (username, email, password) => {
    set({ isLoading: true });

    try {
      const response = await fetch(
        "http://192.168.1.5:8000/api/v1/auth/register",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ username, email, password }),
        }
      );

      const responseData = await response.json();
      console.log("📡 Response dari API:", responseData);

      if (!response.ok)
        throw new Error(responseData.message || "Something went wrong!");

      // Ambil user dari response
      const user = responseData?.data?.user ?? null;

      console.log("👤 User yang diterima:", user);

      if (!user) throw new Error("User data is missing!");

      await AsyncStorage.setItem("user", JSON.stringify(user));

      set({ user, isLoading: false });

      return { success: true };
    } catch (error) {
      console.log("❌ Error di Register:", error.message);
      set({ isLoading: false });
      return { success: false, error: error.message };
    }
  },

  // Login User
  login: async (email, password) => {
    set({ isLoading: true });

    try {
      const response = await fetch(
        "http://192.168.1.5:8000/api/v1/auth/login",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, password }),
        }
      );

      const responseData = await response.json();
      console.log("📡 Response dari API:", responseData);

      if (!response.ok)
        throw new Error(responseData.message || "Invalid credentials!");

      const user = responseData?.data?.user ?? null;
      const token = responseData?.data?.token ?? null;

      if (!user || !token) throw new Error("User atau token tidak ditemukan!");

      await get().saveToStorage(user, token);
      set({ user, token, isLoading: false });

      return { success: true };
    } catch (error) {
      console.log("❌ Error di Login:", error.message);
      set({ isLoading: false });
      return { success: false, error: error.message };
    }
  },

  // Logout User
  logout: async () => {
    set({ isLoading: true });

    try {
      await get().removeFromStorage();
      set({ user: null, token: null, isLoading: false });
      console.log("✅ Logout berhasil!");
    } catch (error) {
      console.log("❌ Error saat logout:", error.message);
      set({ isLoading: false });
    }
  },

  // Cek apakah user masih login (auto-login)
  autoLogin: async () => {
    set({ isLoading: true });

    try {
      const storedUser = await AsyncStorage.getItem("user");
      const storedToken = await AsyncStorage.getItem("token");

      console.log("📂 Stored User (RAW):", storedUser);
      console.log("🔑 Stored Token (RAW):", storedToken);

      if (storedUser && storedToken) {
        const parsedUser = JSON.parse(storedUser);
        set({ user: parsedUser, token: storedToken, isLoading: false });
      } else {
        set({ user: null, token: null, isLoading: false });
      }
    } catch (error) {
      console.log("❌ Error di autoLogin:", error.message);
      set({ isLoading: false });
    }
  },

  // Check Auth (bisa dipanggil di useEffect untuk cek user)
  checkAuth: async () => {
    console.log("🔍 Checking auth...");
    await get().autoLogin();
  },
}));
