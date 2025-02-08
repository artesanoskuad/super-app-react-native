import { VersionErrorType } from './VersionErrorType';

export class VersionInfo {
    constructor(
        public readonly versionInstalled: string,
        public readonly minVersionSupported: string,
        public readonly error?: VersionErrorType
    ) {}
}
