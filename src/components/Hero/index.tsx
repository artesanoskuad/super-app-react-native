import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

interface HeroProps {
    title: string;
    subtitle: string;
}

const Hero: React.FC<HeroProps> = ({ title, subtitle }) => {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>{title}</Text>
            <Text style={styles.subtitle}>{subtitle}</Text>
            <Button title="Explore" onPress={() => {}} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
        backgroundColor: '#f8f9fa',
    },
    title: {
        fontSize: 32,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    subtitle: {
        fontSize: 18,
        color: '#555',
        marginBottom: 20,
    },
});

export default Hero;
