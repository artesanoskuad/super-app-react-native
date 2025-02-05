import React from 'react';
import { View, StyleSheet } from 'react-native';
import Hero from '../../src/components/Hero';
import Carousel from '../../src/components/Carousel';

const cityData = [
    { name: 'Paris', image: 'https://fastwaytours.com/wp-content/uploads/2023/10/paris-1-1536x864.jpg' },
    { name: 'New York', image: 'https://res.cloudinary.com/dtljonz0f/image/upload/c_auto,ar_4:3,w_2048,g_auto/f_auto/q_auto/shutterstock_329662223_ss_non-editorial_3_csm8lw?_a=BAVARSAP0' },
    { name: 'Puente Alto City', image: 'https://plazapuentealto.cl/wp-content/uploads/2009/05/mr.jpg' },
    { name: 'Tokyo', image: 'https://www.civitatis.com/blog/wp-content/uploads/2022/11/calle-akihabara-tokio.jpg' }
];

export default function HomeScreen() {
    return (
        <View style={styles.container}>
            <Hero title="MyTinerary" subtitle="Encuentra tu itinerario de viaje perfecto" />
            <Carousel cities={cityData} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
});
