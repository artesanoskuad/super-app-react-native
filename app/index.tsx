import React, { useState, useEffect } from 'react';
import { View } from 'react-native';
import { useRouter } from 'expo-router';
import SplashScreen from './SplashScreen'; // Importamos el Splash como un componente

export default function IndexScreen() {
    const [isLoading, setIsLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        setTimeout(() => {
            setIsLoading(false);
            router.replace('/tabs'); // Redirige a la pantalla principal después del Splash
        }, 3500);
    }, []);

    return (
        <View style={{ flex: 1 }}>
            {isLoading ? <SplashScreen /> : null}
        </View>
    );
}
