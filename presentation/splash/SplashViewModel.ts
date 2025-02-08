import { useReducer, useEffect } from "react";
import { GetSplash } from "../../domain/usecase/GetSplash";
import { SplashActionType } from "./SplashActionType";
import { splashReducer } from "./splashReducer";
import { initialSplashState } from "./SplashState";
import { NextScreenToSplash } from "../../domain/entities/NextScreenToSplash";

export const useSplashViewModel = (getSplash: GetSplash) => {
  const [state, dispatch] = useReducer(splashReducer, initialSplashState);

  useEffect(() => {
    const checkVersion = async () => {
        dispatch({ type: SplashActionType.SET_LOADING });

        try {
            const nextScreen = await getSplash.execute();
            console.log("🔍 GetSplash ejecutado:", nextScreen); // Debug

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
                    console.log("🔍 Dispatch ejecutando SET_SERVER_ERROR");
                    dispatch({ type: SplashActionType.SET_SERVER_ERROR });
                    break;
                default:
                    dispatch({ type: SplashActionType.SET_HOME });
            }
        } catch (error) {
            console.log("🔴 Excepción en checkVersion:", error);
            console.log("🔥 Dispatch ejecutando SET_SERVER_ERROR desde catch"); 
            dispatch({ type: SplashActionType.SET_SERVER_ERROR });
        }
    };

    checkVersion();
}, [getSplash]);


  return { state };
};
