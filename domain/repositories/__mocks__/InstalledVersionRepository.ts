import { InstalledVersionRepository } from '../InstalledVersionRepository';

export class InstalledVersionRepositoryMock implements InstalledVersionRepository {
    private version = '0.4.0';

    setVersion(version: string) {
        this.version = version;
    }

    async getInstalledVersion(): Promise<string> {
        return this.version;
    }
}
