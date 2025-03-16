import { Link } from "expo-router";
import { StyleSheet, Text, View } from "react-native";

export default function Index() {
  const name = "arjuna";

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome {name}</Text>

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
  },
});
