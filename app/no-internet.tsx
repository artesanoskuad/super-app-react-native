import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

const NoInternetScreen = ({ onRetry }: { onRetry: () => void }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sin conexión a Internet</Text>
      <Text style={styles.message}>Por favor, verifica tu conexión e inténtalo de nuevo.</Text>
      <Button title="Reintentar" onPress={onRetry} />
    </View>
  );
};

export default NoInternetScreen;

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  title: { fontSize: 22, fontWeight: 'bold', marginBottom: 10 },
  message: { fontSize: 16, textAlign: 'center', marginBottom: 20 },
});
