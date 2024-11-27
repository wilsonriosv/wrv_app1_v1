import { StyleSheet, Text, View } from "react-native";

export default function Login() {
  return (
    <View style={styles.container}>
      <Text>¡Aquí está el formulario de login!</Text>
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
