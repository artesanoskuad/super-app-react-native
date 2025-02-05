import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useLocalSearchParams, Stack } from "expo-router";

export default function CityDetailScreen() {
    const { name } = useLocalSearchParams();

    return (
        <>
            <Stack.Screen options={{ title: name as string }} />
            <View style={styles.container}>
                <Text style={styles.title}>Ciudad: {name}</Text>
            </View>
        </>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
    },
});
