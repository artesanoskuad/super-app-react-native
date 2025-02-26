import { GetVersionInfo } from './GetVersionInfo';
import { InstalledVersionRepositoryMock } from '../repositories/__mocks__/InstalledVersionRepository';
import { RemoteVersionRepositoryMock } from '../repositories/__mocks__/RemoteVersionRepository';
import { VersionInfo } from '../entities/VersionInfo';
import { VersionErrorType } from '../entities/VersionErrorType';

describe('GetVersionInfo', () => {
    let installedRepo: InstalledVersionRepositoryMock;
    let remoteRepo: RemoteVersionRepositoryMock;
    let getVersionInfo: GetVersionInfo;

    beforeEach(() => {
        installedRepo = new InstalledVersionRepositoryMock();
        remoteRepo = new RemoteVersionRepositoryMock();
        getVersionInfo = new GetVersionInfo(installedRepo, remoteRepo);
    });

    test('Debería retornar la versión instalada y la versión mínima soportada correctamente', async () => {
        installedRepo.setVersion('1.2.0');
        remoteRepo.setMinVersion('1.3.0');

        const result = await getVersionInfo.execute();
        expect(result).toEqual(new VersionInfo('1.2.0', '1.3.0'));
    });

    test('Debería retornar error NO_INTERNET si no hay conexión', async () => {
        jest.spyOn(remoteRepo, 'getMinVersionSupported').mockRejectedValue(new Error('NoInternetConnection'));

        const result = await getVersionInfo.execute();
        expect(result).toEqual(new VersionInfo('', '', VersionErrorType.NO_INTERNET));
    });

    test('Debería retornar error SERVER_ERROR si hay un error en el backend', async () => {
        jest.spyOn(remoteRepo, 'getMinVersionSupported').mockRejectedValue(new Error('ServerError'));

        const result = await getVersionInfo.execute();
        expect(result).toEqual(new VersionInfo('', '', VersionErrorType.SERVER_ERROR));
    });

    test('Debería retornar error FORMAT_VERSION_ERROR si la versión tiene un formato inválido', async () => {
        installedRepo.setVersion('1.2'); // Formato inválido
        remoteRepo.setMinVersion('1.2.0');

        const result = await getVersionInfo.execute();
        expect(result).toEqual(new VersionInfo('', '', VersionErrorType.FORMAT_VERSION_ERROR));
    });

    test("Debe manejar error si la versión mínima soportada tiene formato inválido", async () => {
        jest.spyOn(installedRepo, "getInstalledVersion").mockResolvedValue("1.2.0");
        jest.spyOn(remoteRepo, "getMinVersionSupported").mockResolvedValue("1.2"); // Formato incorrecto
    
        const result = await getVersionInfo.execute();
    
        expect(result).toEqual(new VersionInfo('', '', VersionErrorType.FORMAT_VERSION_ERROR));
    }); 

    test("Debe retornar SERVER_ERROR si ocurre un error inesperado", async () => {
        jest.spyOn(installedRepo, "getInstalledVersion").mockResolvedValue("1.2.0");
        jest.spyOn(remoteRepo, "getMinVersionSupported").mockRejectedValue(new Error("Error inesperado"));
    
        const result = await getVersionInfo.execute();
        expect(result.error).toBe(VersionErrorType.SERVER_ERROR);
    });

    test("Debe manejar errores inesperados y devolver SERVER_ERROR", async () => {
        jest.spyOn(installedRepo, "getInstalledVersion").mockRejectedValue(new Error("Unexpected Error"));
        jest.spyOn(remoteRepo, "getMinVersionSupported").mockRejectedValue(new Error("Error inesperado"));
    
        const result = await getVersionInfo.execute();
        expect(result.error).toBe(VersionErrorType.SERVER_ERROR);
    });
    
    
});
