import React, { useState } from 'react';
import { View, FlatList, StyleSheet, ActivityIndicator, Text, TextInput } from 'react-native';
import CityCard from '../../../src/components/CityCard';
import useCities from '../../../src/hooks/useCities';
import { City } from '../../../src/api/citiesApi';

export default function CitiesScreen() {
  const { cities, loading, error } = useCities();
  const [searchText, setSearchText] = useState('');

  if (loading) return <ActivityIndicator size="large" color="#0000ff" />;
  if (error) return <Text>Error al cargar ciudades</Text>;

  // Filtra las ciudades según el texto ingresado (sin distinguir mayúsculas/minúsculas)
  const filteredCities = cities.filter(city =>
    city.name.toLowerCase().includes(searchText.toLowerCase())
  );

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.searchInput}
        placeholder="Buscar ciudad..."
        value={searchText}
        onChangeText={setSearchText}
      />
      <FlatList<City>
        data={filteredCities}
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
  searchInput: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 4,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
});
