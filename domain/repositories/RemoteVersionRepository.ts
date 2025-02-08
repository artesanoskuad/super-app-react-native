export interface RemoteVersionRepository {
    getMinVersionSupported(): Promise<string>;
}
