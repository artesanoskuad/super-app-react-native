import { renderHook, act } from "@testing-library/react-hooks";
import { useSplashViewModel } from "./SplashViewModel";
import { NextScreenToSplash } from "../../domain/entities/NextScreenToSplash";
import { GetSplash } from "../../domain/usecase/GetSplash";
import { GetVersionInfo } from "../../domain/usecase/GetVersionInfo";
import { IsForceUpdate } from "../../domain/usecase/IsForceUpdate";
import { InstalledVersionRepository } from "../../domain/repositories/InstalledVersionRepository";
import { RemoteVersionRepository } from "../../domain/repositories/RemoteVersionRepository";

jest.mock("../../domain/repositories/InstalledVersionRepository");
jest.mock("../../domain/repositories/RemoteVersionRepository");
jest.mock("../../domain/usecase/IsForceUpdate");

describe("SplashViewModel", () => {
  let installedVersionRepoMock: jest.Mocked<InstalledVersionRepository>;
  let remoteVersionRepoMock: jest.Mocked<RemoteVersionRepository>;
  let isForceUpdateMock: jest.Mocked<IsForceUpdate>;
  let getVersionInfo: GetVersionInfo;
  let getSplash: GetSplash;

  beforeEach(() => {
    installedVersionRepoMock = {
      getInstalledVersion: jest.fn().mockResolvedValue("1.2.0"),
    } as jest.Mocked<InstalledVersionRepository>;

    remoteVersionRepoMock = {
      getMinVersionSupported: jest.fn().mockResolvedValue("1.2.0"),
    } as jest.Mocked<RemoteVersionRepository>;

    isForceUpdateMock = new IsForceUpdate() as jest.Mocked<IsForceUpdate>;

    getVersionInfo = new GetVersionInfo(installedVersionRepoMock, remoteVersionRepoMock);
    getSplash = new GetSplash(getVersionInfo, isForceUpdateMock);
  });

  test("Debe cambiar el estado a FORCE_UPDATE cuando GetSplash devuelve FORCE_UPDATE", async () => {
    jest.spyOn(getSplash, "execute").mockResolvedValue(NextScreenToSplash.FORCE_UPDATE);

    const { result, waitForNextUpdate } = renderHook(() =>
      useSplashViewModel(getSplash)
    );

    await waitForNextUpdate();
    expect(result.current.state.status).toBe(NextScreenToSplash.FORCE_UPDATE);
  });

  test("Debe cambiar el estado a NO_INTERNET cuando GetSplash devuelve NO_INTERNET", async () => {
    jest.spyOn(getSplash, "execute").mockResolvedValue(NextScreenToSplash.NO_INTERNET);

    const { result, waitForNextUpdate } = renderHook(() =>
      useSplashViewModel(getSplash)
    );

    await waitForNextUpdate();
    expect(result.current.state.status).toBe(NextScreenToSplash.NO_INTERNET);
  });

  test("Debe cambiar el estado a FORMAT_VERSION_ERROR cuando GetSplash devuelve FORMAT_VERSION_ERROR", async () => {
    jest.spyOn(getSplash, "execute").mockResolvedValue(NextScreenToSplash.FORMAT_VERSION_ERROR);

    const { result, waitForNextUpdate } = renderHook(() =>
      useSplashViewModel(getSplash)
    );

    await waitForNextUpdate();
    expect(result.current.state.status).toBe(NextScreenToSplash.FORMAT_VERSION_ERROR);
  });

  test("Debe manejar errores inesperados y establecer estado en ERROR", async () => {
    jest.spyOn(getSplash, "execute").mockRejectedValue(new Error("Error desconocido"));

    const { result, waitForNextUpdate } = renderHook(() =>
      useSplashViewModel(getSplash)
    );

    await waitForNextUpdate();
    expect(result.current.state.status).toBe(NextScreenToSplash.SERVER_ERROR);
  });

  test("Debe manejar un error inesperado y cambiar el estado a ERROR", async () => {
    jest.spyOn(getSplash, "execute").mockRejectedValue(new Error("Error inesperado"));

    const { result, waitForNextUpdate } = renderHook(() =>
        useSplashViewModel(getSplash)
    );

    await waitForNextUpdate();
    expect(result.current.state.status).toBe(NextScreenToSplash.SERVER_ERROR);
  });

  test("Debe manejar una excepción de tipo 'Error' y cambiar el estado a ERROR", async () => {
    jest.spyOn(getSplash, "execute").mockRejectedValue(new Error("Error inesperado"));

    const { result, waitForNextUpdate } = renderHook(() =>
        useSplashViewModel(getSplash)
    );

    await waitForNextUpdate();
    expect(result.current.state.status).toBe(NextScreenToSplash.SERVER_ERROR);
  });

  test("Debe manejar una excepción sin mensaje y cambiar el estado a ERROR", async () => {
    jest.spyOn(getSplash, "execute").mockRejectedValue(undefined);

    const { result, waitForNextUpdate } = renderHook(() =>
        useSplashViewModel(getSplash)
    );

    await waitForNextUpdate();
    expect(result.current.state.status).toBe(NextScreenToSplash.SERVER_ERROR);
  });

  test("Debe manejar un error de tipo ServerError y cambiar el estado a SERVER_ERROR", async () => {
    jest.spyOn(getSplash, "execute").mockRejectedValue(new Error("ServerError"));

    const { result, waitForNextUpdate } = renderHook(() =>
        useSplashViewModel(getSplash)
    );

    await waitForNextUpdate();
    expect(result.current.state.status).toBe(NextScreenToSplash.SERVER_ERROR);
  });

  test("Debe manejar un error de formato de versión y cambiar el estado a FORMAT_VERSION_ERROR", async () => {
    jest.spyOn(getSplash, "execute").mockResolvedValue(NextScreenToSplash.FORMAT_VERSION_ERROR);

    const { result, waitForNextUpdate } = renderHook(() =>
        useSplashViewModel(getSplash)
    );

    await waitForNextUpdate();
    expect(result.current.state.status).toBe(NextScreenToSplash.FORMAT_VERSION_ERROR);
  });

  test("Debe cambiar el estado a HOME cuando GetSplash devuelve HOME", async () => {
    jest.spyOn(getSplash, "execute").mockResolvedValue(NextScreenToSplash.HOME);

    const { result, waitForNextUpdate } = renderHook(() => useSplashViewModel(getSplash));

    await waitForNextUpdate(); // ✅ Espera a que el estado cambie

    expect(result.current.state.status).toBe(NextScreenToSplash.HOME);
  });

  test("Debe manejar un error desconocido y cambiar el estado a SERVER_ERROR", async () => {
    jest.spyOn(getSplash, "execute").mockRejectedValue(new Error("UnknownError"));

    const { result } = renderHook(() => useSplashViewModel(getSplash));

    await act(async () => {});

    console.log("🔍 Estado final en test:", result.current.state.status); // Debug
    expect(result.current.state.status).toBe(NextScreenToSplash.SERVER_ERROR);
  });

});
