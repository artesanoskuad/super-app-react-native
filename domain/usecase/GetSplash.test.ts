import { GetSplash } from './GetSplash';
import { GetVersionInfo } from './GetVersionInfo';
import { IsForceUpdate } from './IsForceUpdate';
import { NextScreenToSplash } from '../entities/NextScreenToSplash';
import { InstalledVersionRepositoryMock } from '../repositories/__mocks__/InstalledVersionRepository';
import { RemoteVersionRepositoryMock } from '../repositories/__mocks__/RemoteVersionRepository';

describe('GetSplash', () => {
    let installedRepo: InstalledVersionRepositoryMock;
    let remoteRepo: RemoteVersionRepositoryMock;
    let getVersionInfo: GetVersionInfo;
    let isForceUpdate: IsForceUpdate;
    let getSplash: GetSplash;

    beforeEach(() => {
        installedRepo = new InstalledVersionRepositoryMock();
        remoteRepo = new RemoteVersionRepositoryMock();
        getVersionInfo = new GetVersionInfo(installedRepo, remoteRepo);
        isForceUpdate = new IsForceUpdate();
        getSplash = new GetSplash(getVersionInfo, isForceUpdate);
    });

    test('Debería retornar HOME si la versión instalada es compatible', async () => {
        installedRepo.setVersion('1.3.0');
        remoteRepo.setMinVersion('1.2.0');

        const result = await getSplash.execute();
        expect(result).toBe(NextScreenToSplash.HOME);
    });

    test('Debería retornar FORCE_UPDATE si la versión instalada es menor a la mínima soportada', async () => {
        installedRepo.setVersion('1.1.0');
        remoteRepo.setMinVersion('1.2.0');

        const result = await getSplash.execute();
        expect(result).toBe(NextScreenToSplash.FORCE_UPDATE);
    });

    test('Debería retornar NO_INTERNET si no hay conexión', async () => {
        jest.spyOn(remoteRepo, 'getMinVersionSupported').mockRejectedValue(new Error('NoInternetConnection'));

        const result = await getSplash.execute();
        expect(result).toBe(NextScreenToSplash.NO_INTERNET);
    });

    test('Debería retornar SERVER_ERROR si hay un error en el backend', async () => {
        jest.spyOn(remoteRepo, 'getMinVersionSupported').mockRejectedValue(new Error('ServerError'));

        const result = await getSplash.execute();
        expect(result).toBe(NextScreenToSplash.SERVER_ERROR);
    });

    test('Debería retornar FORMAT_VERSION_ERROR si la versión tiene un formato inválido', async () => {
        installedRepo.setVersion('1.2'); // Formato inválido
        remoteRepo.setMinVersion('1.2.0');

        const result = await getSplash.execute();
        expect(result).toBe(NextScreenToSplash.FORMAT_VERSION_ERROR);
    });
});
