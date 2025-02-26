import { SplashStatus } from "./SplashState";
import { SplashActionType } from "./SplashActionType";

export type SplashState = {
    status: SplashStatus;
};

const initialState: SplashState = {
    status: SplashStatus.LOADING,
};

export const splashReducer = (
    state: SplashState = initialState,
    action: { type: SplashActionType }
): SplashState => {
    switch (action.type) {
        case SplashActionType.SET_LOADING:
            return { status: SplashStatus.LOADING };
        case SplashActionType.SET_NO_INTERNET:
            return { status: SplashStatus.NO_INTERNET };
        case SplashActionType.SET_FORCE_UPDATE_REQUIRED:
            return { status: SplashStatus.FORCE_UPDATE };
        case SplashActionType.SET_HOME:
            return { status: SplashStatus.HOME };
        case SplashActionType.SET_SERVER_ERROR:
            return { status: SplashStatus.SERVER_ERROR };
        case SplashActionType.SET_FORMAT_VERSION_ERROR:
            return { status: SplashStatus.FORMAT_VERSION_ERROR };
        case SplashActionType.SET_UNKNOWN_ERROR:
            return { status: SplashStatus.UNKNOWN_ERROR };
                  
        default:
            return state;
    }
};
