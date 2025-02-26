import { splashReducer, SplashState } from "./splashReducer";
import { SplashActionType } from "./SplashActionType";
import { SplashStatus } from "./SplashState";

describe("splashReducer", () => {
  const initialState: SplashState = { status: SplashStatus.LOADING };

  test("Debe manejar SET_LOADING", () => {
    const newState = splashReducer(initialState, {
      type: SplashActionType.SET_LOADING,
    });
    expect(newState.status).toBe(SplashStatus.LOADING);
  });

  test("Debe manejar SET_FORCE_UPDATE", () => {
    const newState = splashReducer(initialState, {
      type: SplashActionType.SET_FORCE_UPDATE_REQUIRED,
    });
    expect(newState.status).toBe(SplashStatus.FORCE_UPDATE);
  });

  test("Debe manejar SET_HOME", () => {
    const newState = splashReducer(initialState, {
      type: SplashActionType.SET_HOME,
    });
    expect(newState.status).toBe(SplashStatus.HOME);
  });

  test("Debe manejar SET_NO_INTERNET", () => {
    const newState = splashReducer(initialState, {
      type: SplashActionType.SET_NO_INTERNET,
    });
    expect(newState.status).toBe(SplashStatus.NO_INTERNET);
  });

  test("Debe manejar SET_SERVER_ERROR", () => {
    const newState = splashReducer(initialState, {
      type: SplashActionType.SET_SERVER_ERROR,
    });
    expect(newState.status).toBe(SplashStatus.SERVER_ERROR);
  });

  test("Debe manejar SET_FORMAT_VERSION_ERROR", () => {
    const newState = splashReducer(initialState, {
      type: SplashActionType.SET_FORMAT_VERSION_ERROR,
    });
    expect(newState.status).toBe(SplashStatus.FORMAT_VERSION_ERROR);
  });

  test("Debe retornar el estado actual si la acción no está definida", () => {
    const newState = splashReducer(initialState, {
      type: "UNKNOWN_ACTION" as SplashActionType,
    });
    expect(newState.status).toBe(SplashStatus.LOADING);
  });

  test("Debe retornar el estado actual si la acción no está definida", () => {
    const initialState: SplashState = { status: SplashStatus.LOADING };

    const newState = splashReducer(initialState, {
        type: "UNKNOWN_ACTION" as SplashActionType,
    });

    expect(newState.status).toBe(SplashStatus.LOADING);
  });

  test("Debe retornar el estado actual si recibe una acción desconocida", () => {
    const initialState: SplashState = { status: SplashStatus.LOADING };

    const newState = splashReducer(initialState, {
        type: "ACTION_NO_EXISTENTE" as SplashActionType, 
    });

    expect(newState).toEqual(initialState); 
  });

  test("Debe retornar el estado actual si recibe una acción desconocida", () => {
    const initialState: SplashState = { status: SplashStatus.LOADING };

    const newState = splashReducer(initialState, {
        type: "ACCION_DESCONOCIDA" as SplashActionType, // ✅ Acción inválida
    });

    expect(newState).toEqual(initialState); // ✅ Asegura que el estado no cambia
  });

  test("Debe retornar el estado actual si recibe una acción desconocida", () => {
    const initialState: SplashState = { status: SplashStatus.LOADING };

    const newState = splashReducer(initialState, {
        type: "INVALID_ACTION" as SplashActionType, // ✅ Acción inválida
    });

    expect(newState).toEqual(initialState); // ✅ Asegura que el estado no cambia
  });

  test("Debe retornar el estado actual si recibe una acción desconocida", () => {
    const initialState: SplashState = { status: SplashStatus.LOADING };

    const newState = splashReducer(initialState, {
        type: "ACTION_NO_EXISTENTE" as SplashActionType,
    });

    expect(newState).toEqual(initialState);
  });

  test("Debe retornar el estado actual si recibe una acción no definida", () => {
    const initialState: SplashState = { status: SplashStatus.LOADING };

    const newState = splashReducer(initialState, {
        type: "ACTION_NO_EXISTE" as SplashActionType,
    });

    expect(newState).toEqual(initialState);
  });


});
