import { StyleSheet, Text, View } from "react-native";

export default function Records() {
  return (
    <View style={styles.container}>
      <Text>¡Aquí están los registros!</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f0f8ff",
  },
});
