import { InstalledVersionRepository } from '../repositories/InstalledVersionRepository';
import { RemoteVersionRepository } from '../repositories/RemoteVersionRepository';

export class IsForceUpdate {
    async execute(installedVersion: string, minVersionSupported: string): Promise<boolean> {
        if (!this.isValidVersion(installedVersion)) {
            throw new Error(`Formato inválido [${installedVersion}]. Formato esperado [X.Y.Z]`);
        } 

        if (!this.isValidVersion(minVersionSupported)) {
            throw new Error(`Formato inválido [${minVersionSupported}]. Formato esperado [X.Y.Z]`);
        } 

        return this.requiresForceUpdate(installedVersion, minVersionSupported);
    }

    private requiresForceUpdate(installed: string, minSupported: string): boolean {
        const [installedMajor, installedMinor, installedPatch] = installed.split('.').map(Number);
        const [minMajor, minMinor, minPatch] = minSupported.split('.').map(Number);

        return installedMajor < minMajor ||
               (installedMajor === minMajor && installedMinor < minMinor) ||
               (installedMajor === minMajor && installedMinor === minMinor && installedPatch < minPatch);
    }

    private isValidVersion(version: string): boolean {
        const regex = /^\d+\.\d+\.\d+(-[a-z]+\d{2})?$/;
        return regex.test(version);
    }
}
