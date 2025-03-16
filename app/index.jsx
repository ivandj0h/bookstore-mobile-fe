import { StyleSheet, Text, View } from "react-native";

export default function Index() {
  const name = "arjuna";

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome {name}</Text>
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
