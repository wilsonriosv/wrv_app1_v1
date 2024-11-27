import React, { useState, useEffect } from "react";
import { View, Text, TextInput, Button, StyleSheet, Alert } from "react-native";
import { getAuth, updateProfile } from "firebase/auth";

export default function SettingsScreen() {
    const auth = getAuth();
    const currentUser = auth.currentUser;
    
    const [name, setName] = useState(currentUser ? currentUser.displayName : "");
    const [email, setEmail] = useState(currentUser ? currentUser.email : "");

    const handleUpdate = () => {
        // Actualización de nombre y correo
        if (name !== currentUser.displayName || email !== currentUser.email) {
            updateProfile(currentUser, { displayName: name })
                .then(() => {
                    // Actualización del correo electrónico (si es necesario)
                    // Se requiere verificación de correo en Firebase si se cambia el correo
                    Alert.alert("Perfil actualizado", "Tu perfil ha sido actualizado correctamente.");
                })
                .catch((error) => {
                    Alert.alert("Error", error.message);
                });
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Configuración</Text>
            
            <TextInput
                style={styles.input}
                value={name}
                onChangeText={(text) => setName(text)}
                placeholder="Nombre"
            />
            <TextInput
                style={styles.input}
                value={email}
                onChangeText={(text) => setEmail(text)}
                placeholder="Correo electrónico"
                keyboardType="email-address"
            />
            
            <Button title="Actualizar Perfil" onPress={handleUpdate} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: "bold",
        marginBottom: 20,
    },
    input: {
        height: 40,
        borderColor: "#ddd",
        borderWidth: 1,
        borderRadius: 8,
        marginBottom: 15,
        paddingLeft: 10,
    },
});
