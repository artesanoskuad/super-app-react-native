import { InstalledVersionRepository } from '../repositories/InstalledVersionRepository';
import { RemoteVersionRepository } from '../repositories/RemoteVersionRepository';
import { VersionInfo } from '../entities/VersionInfo';
import { VersionErrorType } from '../entities/VersionErrorType';

export class GetVersionInfo {
    constructor(
        private installedVersionRepo: InstalledVersionRepository,
        private remoteVersionRepo: RemoteVersionRepository
    ) {}

    async execute(): Promise<VersionInfo> {
        try {
            const versionInstalled = await this.installedVersionRepo.getInstalledVersion();
            const minVersionSupported = await this.remoteVersionRepo.getMinVersionSupported();

            if (!this.isValidVersion(versionInstalled)) {
                throw new Error(`Formato inválido en version instalada: [${versionInstalled}]. Formato esperado [X.Y.Z]`);
            }
            
            if (!this.isValidVersion(minVersionSupported)) {
                throw new Error(`Formato inválido en version mínima soportada: [${minVersionSupported}]. Formato esperado [X.Y.Z]`);
            }

            return new VersionInfo(versionInstalled, minVersionSupported);
        } catch (error) {
            if (error instanceof Error) {
                const errorMessage = error.message || "";
        
                if (errorMessage.includes("Formato inválido en version instalada")) {
                    return new VersionInfo('', '', VersionErrorType.FORMAT_VERSION_ERROR);
                } 
                if (errorMessage.includes("Formato inválido en version mínima soportada")) {
                    return new VersionInfo('', '', VersionErrorType.FORMAT_VERSION_ERROR);
                }
                if (errorMessage.includes("NoInternetConnection")) {
                    return new VersionInfo('', '', VersionErrorType.NO_INTERNET);
                } 
                if (errorMessage.includes("ServerError")) {
                    return new VersionInfo('', '', VersionErrorType.SERVER_ERROR);
                }
            }
        
            return new VersionInfo('', '', VersionErrorType.SERVER_ERROR);
        }
    }

    private isValidVersion(version: string): boolean {
        const regex = /^\d+\.\d+\.\d+(-[a-z]+\d{2})?$/;
        return regex.test(version);
    }
}
