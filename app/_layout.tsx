// app/_layout.tsx
import React, { useEffect } from 'react';
import { Slot, useRouter, useSegments } from 'expo-router';
import { Provider, useSelector } from 'react-redux';
import { store, RootState } from '../src/store/store';

function AuthenticatedLayout() {
  const token = useSelector((state: RootState) => state.user.token);
  const router = useRouter();
  const segments = useSegments();

  useEffect(() => {
    // Permitir el acceso a las rutas de autenticación
    const inAuthGroup = segments[0] === "(auth)";
    if (!token && !inAuthGroup) {
      router.replace("/login"); // La ruta pública es /login, aunque el archivo esté en (auth)
    }
  }, [token, segments, router]);

  return <Slot />;
}

export default function RootLayout() {
  return (
    <Provider store={store}>
      <AuthenticatedLayout />
    </Provider>
  );
}
