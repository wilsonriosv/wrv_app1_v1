import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, ScrollView, Image, Button } from "react-native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faUserCircle, faThermometerHalf } from "@fortawesome/free-solid-svg-icons";
import { app } from "../firebaseConfig";
import { getFirestore, collection, getDocs } from "firebase/firestore";
import axios from "axios";
import { getAuth } from "firebase/auth";

const db = getFirestore();

const auth = getAuth(app);

export default function Home() {
    const [userCount, setUserCount] = useState(0);
    const [temperature, setTemperature] = useState(null);
    const [city, setCity] = useState(null);
    const [cards, setCards] = useState([
        { title: "Card 1", description: "This is a sample card.", image: "https://via.placeholder.com/150" },
        { title: "Card 2", description: "This is another sample card.", image: "https://via.placeholder.com/150" },
        { title: "Card 3", description: "Yet another sample card.", image: "https://via.placeholder.com/150" },
    ]);

    useEffect(() => {
        const getUserCount = async () => {
            const querySnapshot = await getDocs(collection(db, "users"));
            setUserCount(querySnapshot.size);
        };
        getUserCount();
    }, []);

    useEffect(() => {
        const getWeather = async () => {
            try {
                const response = await axios.get(
                    `http://api.openweathermap.org/data/2.5/weather?q=Manizales&appid=247487e5a528ef75401a2aa4016916c8&units=metric`
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
            <View style={styles.statsContainer}>
                <View style={styles.statCard}>
                    <FontAwesomeIcon icon={faUserCircle} size={20} color="white" />
                    <Text style={styles.statText}>{userCount} Users</Text>
                </View>
                <View style={styles.statCard}>
                    <FontAwesomeIcon icon={faThermometerHalf} size={20} color="white" />
                    <Text style={styles.statText}>
                        {temperature}°C - {city}
                    </Text>
                </View>
            </View>

            <View style={styles.cardsContainer}>
                {cards.map((card, index) => (
                    <View key={index} style={styles.card}>
                        <Image source={{ uri: card.image }} style={styles.cardImage} />
                        <Text style={styles.cardTitle}>{card.title}</Text>
                        <Text style={styles.cardDescription}>{card.description}</Text>
                    </View>
                ))}
            </View>

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
        justifyContent: "flex-end",
        marginBottom: 20,        
    },
    statCard: {
        backgroundColor: "#4caf50",
        borderRadius: 50,
        width: 90,
        height: 90,
        justifyContent: "center",
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.8,
        shadowRadius: 3,
        // los elementos de este container quedan muy pegados y quiero separarlos un poco
        marginBottom: 10,
        marginLeft: 10,
    },
    statText: {
        color: "white",
        marginTop: 5,
        fontSize: 12,
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
