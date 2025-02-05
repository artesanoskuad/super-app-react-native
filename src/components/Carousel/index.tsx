import React from 'react';
import { View, Text, Image, FlatList, StyleSheet } from 'react-native';

interface City {
    name: string;
    image: string;
}

interface CarouselProps {
    cities: City[];
}

const Carousel: React.FC<CarouselProps> = ({ cities }) => {
    return (
        <FlatList
            data={cities}
            horizontal
            keyExtractor={(item) => item.name}
            renderItem={({ item }) => (
                <View style={styles.card}>
                    <Image source={{ uri: item.image }} style={styles.image} />
                    <Text style={styles.cityName}>{item.name}</Text>
                </View>
            )}
        />
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

export default Carousel;
