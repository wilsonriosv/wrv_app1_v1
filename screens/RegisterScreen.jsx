import React, { useState } from "react";
import { View, Text, TextInput, Button, StyleSheet } from "react-native";
import { auth } from "../firebaseConfig";
import { createUserWithEmailAndPassword } from "firebase/auth";

export default function RegisterScreen({ navigation }) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const handleRegister = () => {
        createUserWithEmailAndPassword(auth, email, password)
            .then(() => navigation.navigate("Login"))
            .catch((err) => setError(err.message));
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Register</Text>
            {error ? <Text style={styles.error}>{error}</Text> : null}
            <TextInput
                style={styles.input}
                placeholder="Email"
                value={email}
                onChangeText={setEmail}
            />
            <TextInput
                style={styles.input}
                placeholder="Password"
                secureTextEntry
                value={password}
                onChangeText={setPassword}
            />
            <Button title="Register" onPress={handleRegister} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, justifyContent: "center", padding: 20 },
    title: { fontSize: 24, marginBottom: 20 },
    input: { borderWidth: 1, padding: 10, marginBottom: 15 },
    error: { color: "red", textAlign: "center", marginBottom: 10 },
});
