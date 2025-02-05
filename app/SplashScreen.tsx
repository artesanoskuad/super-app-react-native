import { View, StyleSheet } from 'react-native';
import LottieView from 'lottie-react-native';

export default function SplashScreen() {
    
    return (
        <View style={styles.container}>
            <LottieView
                source={require('../assets/animations/splash.json')} // Asegúrate de que el archivo existe
                autoPlay
                loop
                style={styles.animation}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    animation: {
        width: 200,
        height: 200,
    },
});
