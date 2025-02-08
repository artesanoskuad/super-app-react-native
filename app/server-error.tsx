import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

const ServerErrorScreen = ({ onRetry }: { onRetry: () => void }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Error en el servidor</Text>
      <Text style={styles.message}>Hubo un problema con el servidor. Inténtalo más tarde.</Text>
      <Button title="Reintentar" onPress={onRetry} />
    </View>
  );
};

export default ServerErrorScreen;

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  title: { fontSize: 22, fontWeight: 'bold', marginBottom: 10 },
  message: { fontSize: 16, textAlign: 'center', marginBottom: 20 },
});
