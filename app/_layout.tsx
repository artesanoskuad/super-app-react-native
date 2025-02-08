import { Stack } from "expo-router";

export default function Layout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="tabs" options={{ headerShown: false }} />
      <Stack.Screen name="force-update" options={{ title: "Actualización Requerida" }} />
      <Stack.Screen name="no-internet" options={{ title: "Sin Conexión" }} />
      <Stack.Screen name="server-error" options={{ title: "Error del Servidor" }} />
      <Stack.Screen name="format-error" options={{ title: "Error de Formato" }} />
    </Stack>
  );
}
