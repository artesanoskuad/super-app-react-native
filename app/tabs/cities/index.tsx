// CitiesScreen.tsx
import React from 'react';
import { View, FlatList, StyleSheet, ActivityIndicator, Text } from 'react-native';
import CityCard from '../../../src/components/CityCard';
import useCities from '../../../src/hooks/useCities';
import { City } from '../../../src/api/citiesApi';

export default function CitiesScreen() {
  const { cities, loading, error } = useCities();

  if (loading) return <ActivityIndicator size="large" color="#0000ff" />;
  if (error) return <Text>Error al cargar ciudades</Text>;

  return (
    <View style={styles.container}>
      <FlatList<City>
        data={cities}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => <CityCard city={item} />}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
});
