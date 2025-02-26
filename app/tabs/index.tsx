// HomeScreen.tsx
import React from 'react';
import { View, StyleSheet, ActivityIndicator, Text } from 'react-native';
import Hero from '../../src/components/Hero';
import Carousel from '../../src/components/Carousel';
import useCities from '../../src/hooks/useCities';

export default function HomeScreen() {
  const { cities, loading, error } = useCities();

  if (loading) return <ActivityIndicator size="large" color="#0000ff" />;
  if (error) return <Text>Error al cargar ciudades</Text>;

  return (
    <View style={styles.container}>
      <Hero title="MyTinerary" subtitle="Encuentra tu itinerario de viaje perfecto" />
      <Carousel cities={cities} />
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
