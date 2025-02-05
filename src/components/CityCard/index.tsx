import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { Link } from "expo-router";

interface CityProps {
    city: {
        name: string;
        image: string;
    };
}

const CityCard: React.FC<CityProps> = ({ city }) => {
    return (
        <Link href={`/tabs/cities/${city.name}`} asChild>
            <TouchableOpacity style={styles.card}>
                <Image source={{ uri: city.image }} style={styles.image} />
                <Text style={styles.cityName}>{city.name}</Text>
            </TouchableOpacity>
        </Link>
    );
};

const styles = StyleSheet.create({
    card: {
        margin: 10,
        alignItems: 'center',
    },
    image: {
        width: 150,
        height: 100,
        borderRadius: 10,
    },
    cityName: {
        marginTop: 5,
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default CityCard;
