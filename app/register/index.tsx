import { StyleSheet, Text, View } from "react-native";

export default function Register() {
  return (
    <View style={styles.container}>
      <Text>¡Aquí está el formulario de registro!</Text>
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
