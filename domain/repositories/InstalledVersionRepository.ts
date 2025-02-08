export interface InstalledVersionRepository {
    getInstalledVersion(): Promise<string>;
}
