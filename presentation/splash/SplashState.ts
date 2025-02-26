export enum SplashStatus {
  LOADING = 'LOADING',
  NO_INTERNET = 'NO_INTERNET',
  FORCE_UPDATE = 'FORCE_UPDATE',
  HOME = 'HOME',
  SERVER_ERROR = 'SERVER_ERROR',
  FORMAT_VERSION_ERROR = 'FORMAT_VERSION_ERROR',
  UNKNOWN_ERROR = 'UNKNOWN_ERROR'
}

export type SplashState = {
  status: SplashStatus;
};

export const initialSplashState: SplashState = {
  status: SplashStatus.LOADING,
};