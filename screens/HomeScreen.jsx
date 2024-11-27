import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, ScrollView, Image, Button } from "react-native";
import { auth } from "../firebaseConfig";
import { getFirestore, collection, getDocs } from "firebase/firestore";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserCircle, faThermometerHalf } from "@fortawesome/free-solid-svg-icons";

const db = getFirestore();

export default function HomeScreen() {
    const [userCount, setUserCount] = useState(0);
    const [temperature, setTemperature] = useState(null);
    const [city, setCity] = useState(null);
    const [cards, setCards] = useState([
        { title: "Card 1", description: "This is a sample card.", image: "https://via.placeholder.com/150" },
        { title: "Card 2", description: "This is another sample card.", image: "https://via.placeholder.com/150" },
        { title: "Card 3", description: "Yet another sample card.", image: "https://via.placeholder.com/150" },
    ]);

    // Obtener la cantidad de usuarios registrados desde Firebase Firestore
    useEffect(() => {
        const getUserCount = async () => {
            const querySnapshot = await getDocs(collection(db, "users"));
            setUserCount(querySnapshot.size);
        };
        getUserCount();
    }, []);

    // Obtener la temperatura y la ciudad desde la API de OpenWeatherMap
    useEffect(() => {
        const getWeather = async () => {
            try {
                const response = await axios.get(
                    `http://api.openweathermap.org/data/2.5/weather?q=Manizales&appid=YOUR_API_KEY&units=metric`
                );
                setTemperature(response.data.main.temp);
                setCity(response.data.name);
            } catch (error) {
                console.error("Error fetching weather data: ", error);
            }
        };
        getWeather();
    }, []);

    return (
        <ScrollView style={styles.container}>
            {/* Parte superior con estadísticas */}
            <View style={styles.statsContainer}>
                <View style={styles.statCard}>
                    <FontAwesomeIcon icon={faUserCircle} size={40} color="white" />
                    <Text style={styles.statText}>{userCount} Users</Text>
                </View>
                <View style={styles.statCard}>
                    <FontAwesomeIcon icon={faThermometerHalf} size={40} color="white" />
                    <Text style={styles.statText}>
                        {temperature}°C - {city}
                    </Text>
                </View>
            </View>

            {/* Cards de ejemplo */}
            <View style={styles.cardsContainer}>
                {cards.map((card, index) => (
                    <View key={index} style={styles.card}>
                        <Image source={{ uri: card.image }} style={styles.cardImage} />
                        <Text style={styles.cardTitle}>{card.title}</Text>
                        <Text style={styles.cardDescription}>{card.description}</Text>
                    </View>
                ))}
            </View>

            {/* Botón de prueba (opcional) */}
            <Button title="Load More Cards" onPress={() => alert("More cards loaded!")} />
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 15,
    },
    statsContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginBottom: 20,
    },
    statCard: {
        backgroundColor: "#4caf50",
        borderRadius: 50,
        width: 120,
        height: 120,
        justifyContent: "center",
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.8,
        shadowRadius: 3,
    },
    statText: {
        color: "white",
        marginTop: 5,
        fontSize: 16,
    },
    cardsContainer: {
        marginBottom: 20,
    },
    card: {
        marginBottom: 15,
        borderWidth: 1,
        borderRadius: 8,
        borderColor: "#ddd",
        padding: 10,
    },
    cardImage: {
        width: "100%",
        height: 150,
        borderRadius: 8,
    },
    cardTitle: {
        fontSize: 18,
        marginTop: 10,
    },
    cardDescription: {
        fontSize: 14,
        color: "#666",
        marginTop: 5,
    },
});
