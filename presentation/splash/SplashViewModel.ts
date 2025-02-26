import { useReducer, useEffect } from "react";
import { GetSplash } from "../../domain/usecase/GetSplash";
import { SplashActionType } from "./SplashActionType";
import { splashReducer } from "./splashReducer";
import { initialSplashState } from "./SplashState";
import { NextScreenToSplash } from "../../domain/entities/NextScreenToSplash";

export const useSplashViewModel = (getSplash: GetSplash) => {
  const [state, dispatch] = useReducer(splashReducer, initialSplashState);

  useEffect(() => {
    let isMounted = true;
  
    const checkVersion = async () => {
      if (!isMounted) return;
  
      try {
        const nextScreen = await getSplash.execute();
  
        if (!isMounted) return;
        console.log("🛠️ nextScreen recibido:", nextScreen);
  
        switch (nextScreen) {
          case NextScreenToSplash.HOME:
            dispatch({ type: SplashActionType.SET_HOME });
            break;
          case NextScreenToSplash.NO_INTERNET:
            dispatch({ type: SplashActionType.SET_NO_INTERNET });
            break;
          case NextScreenToSplash.FORCE_UPDATE:
            dispatch({ type: SplashActionType.SET_FORCE_UPDATE_REQUIRED });
            break;
          case NextScreenToSplash.FORMAT_VERSION_ERROR:
            dispatch({ type: SplashActionType.SET_FORMAT_VERSION_ERROR });
            break;
          case NextScreenToSplash.SERVER_ERROR:
            dispatch({ type: SplashActionType.SET_SERVER_ERROR });
            break;
          default:
            console.log("⚠️ Estado desconocido recibido:", nextScreen);
            dispatch({ type: SplashActionType.SET_UNKNOWN_ERROR });
        }
      } catch (error) {
        if (isMounted) {
          dispatch({ type: SplashActionType.SET_SERVER_ERROR });
        }
      }
    };
  
    checkVersion();
  
    return () => {
      isMounted = false;
    };
  }, [getSplash]);
   

  return { state };
};
