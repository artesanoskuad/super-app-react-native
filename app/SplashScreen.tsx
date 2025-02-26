import React, { useEffect } from "react";
import { View, Text, ActivityIndicator, StyleSheet } from "react-native";
import { useSplashViewModel } from "./../presentation/splash/SplashViewModel";
import { GetSplash } from "../domain/usecase/GetSplash";
import { GetVersionInfo } from "../domain/usecase/GetVersionInfo";
import { IsForceUpdate } from "../domain/usecase/IsForceUpdate";
import { InstalledVersionRepositoryHardcoded } from "./../data/repositories/InstalledVersionRepositoryHardcoded";
import { RemoteVersionRepositoryHardcoded } from "./../data/repositories/RemoteVersionRepositoryHardcoded";
import { useRouter } from "expo-router";
import { SplashStatus } from "../presentation/splash/SplashState";

// 🔹 Configuración del caso de uso con datos hardcodeados por ahora
const installedVersionRepo = new InstalledVersionRepositoryHardcoded();
const remoteVersionRepo = new RemoteVersionRepositoryHardcoded();
const getVersionInfo = new GetVersionInfo(installedVersionRepo, remoteVersionRepo)
const isForceUpdate = new IsForceUpdate();
const getSplash = new GetSplash(getVersionInfo, isForceUpdate);

const SplashScreen = () => {
  const { state } = useSplashViewModel(getSplash);
  const router = useRouter();

  useEffect(() => {
    switch (state.status) {
      case SplashStatus.HOME:
        router.replace("/tabs");
        break;
      case SplashStatus.FORCE_UPDATE:
        router.replace("/force-update");
        break;
      case SplashStatus.NO_INTERNET:
        router.replace("/no-internet");
        break;
      case SplashStatus.SERVER_ERROR:
        router.replace("/server-error");
        break;
      case SplashStatus.FORMAT_VERSION_ERROR:
        router.replace("/format-error");
        break;
    }
  }, [state.status, router]);

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Cargando...</Text>
      <ActivityIndicator size="large" color="#007AFF" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  text: {
    fontSize: 18,
    marginBottom: 10,
    color: "#333",
  },
});

export default SplashScreen;
