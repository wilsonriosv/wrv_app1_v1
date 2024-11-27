import { StyleSheet, Text, View } from "react-native";

export default function Index() {
  return (
    <View style={styles.container}>
      <Text>Esto es un mensaje de texto desde el archivo app/index.tsx</Text>
      <Text style={styles.title}>¡Hola, React Native con Expo!</Text>
      <Text style={styles.subtitle}>Este es un ejemplo con estilos definidos al final.</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1, // Ocupa todo el espacio disponible
    justifyContent: 'center', // Centra los elementos verticalmente
    alignItems: 'center', // Centra los elementos horizontalmente
    backgroundColor: '#f0f8ff', // Color de fondo
  },
  title: {
    fontSize: 24, // Tamaño de fuente
    fontWeight: 'bold', // Negrita
    color: '#333', // Color del texto
    marginBottom: 10, // Separación inferior
  },
  subtitle: {
    fontSize: 16, // Tamaño de fuente
    color: '#666', // Color del texto
  },
});