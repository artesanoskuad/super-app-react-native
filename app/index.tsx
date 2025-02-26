import React, { useState, useEffect } from 'react';
import { View } from 'react-native';
import { useRouter } from 'expo-router';
import { useSelector } from 'react-redux';
import { RootState } from '../src/store/store';
import SplashScreen from './SplashScreen';

export default function IndexScreen() {
    const [isLoading, setIsLoading] = useState(true);
    const router = useRouter();
    const token = useSelector((state: RootState) => state.user.token);

    useEffect(() => {
        setTimeout(() => {
            setIsLoading(false);
            if (token) {
                router.replace('/tabs');
              } else {
                router.replace('/login');
              }
        }, 3500);
    }, []);

    return (
        <View style={{ flex: 1 }}>
            {isLoading ? <SplashScreen /> : null}
        </View>
    );
}
