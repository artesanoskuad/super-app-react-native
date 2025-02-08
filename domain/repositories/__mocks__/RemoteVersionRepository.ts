import { RemoteVersionRepository } from '../RemoteVersionRepository';

export class RemoteVersionRepositoryMock implements RemoteVersionRepository {
    private minSupportedVersion = '0.3.0';

    setMinVersion(version: string) {
        this.minSupportedVersion = version;
    }

    async getMinVersionSupported(): Promise<string> {
        return this.minSupportedVersion;
    }
}
