import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

const FormatVersionErrorScreen = ({ onRetry }: { onRetry: () => void }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Error de versión</Text>
      <Text style={styles.message}>
        La versión de la aplicación no es válida. Contacta con soporte.
      </Text>
      <Button title="Reintentar" onPress={onRetry} />
    </View>
  );
};

export default FormatVersionErrorScreen;

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  title: { fontSize: 22, fontWeight: 'bold', marginBottom: 10 },
  message: { fontSize: 16, textAlign: 'center', marginBottom: 20 },
});
