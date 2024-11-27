import React, { useState } from "react";
import { View, Text, TextInput, Button, StyleSheet } from "react-native";
import { auth } from "../firebaseConfig";
import { signInWithEmailAndPassword } from "firebase/auth";

export default function LoginScreen({ navigation }) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const handleLogin = () => {
        signInWithEmailAndPassword(auth, email, password)
            .then(() => navigation.navigate("Home"))
            .catch((err) => setError(err.message));
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Login</Text>
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
            <Button title="Login" onPress={handleLogin} />
            <Text style={styles.link} onPress={() => navigation.navigate("Register")}>
                Don't have an account? Register
            </Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, justifyContent: "center", padding: 20 },
    title: { fontSize: 24, marginBottom: 20 },
    input: { borderWidth: 1, padding: 10, marginBottom: 15 },
    link: { color: "blue", textAlign: "center", marginTop: 10 },
    error: { color: "red", textAlign: "center", marginBottom: 10 },
});
