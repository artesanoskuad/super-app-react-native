import React from "react";
import { View, Text, StyleSheet, Button, Image } from "react-native";
import { useRouter } from "expo-router";

const ForceUpdateScreen = () => {
  const router = useRouter();

  const handleUpdatePress = () => {
    // 🔹 Redirigir a la tienda (por ahora sin ID de la app)
    // Android: intent://, iOS: itms-apps://
    // Más adelante, agregaremos los enlaces correctos cuando la app esté publicada.
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>¡Es hora de actualizar!</Text>
      <Text style={styles.description}>
        Tu versión de la app está obsoleta. Por favor, actualiza para continuar.
      </Text>
      <Button title="Actualizar ahora" onPress={handleUpdatePress} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
    paddingHorizontal: 20,
  },
  image: {
    width: 200,
    height: 200,
    marginBottom: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    textAlign: "center",
    marginBottom: 20,
  },
});

export default ForceUpdateScreen;
