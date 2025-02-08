import { GetVersionInfo } from './GetVersionInfo';
import { IsForceUpdate } from './IsForceUpdate';
import { NextScreenToSplash } from '../entities/NextScreenToSplash';
import { VersionErrorType } from '../entities/VersionErrorType';

export class GetSplash {
    constructor(
        private getVersionInfo: GetVersionInfo,
        private isForceUpdate: IsForceUpdate
    ) {}

    async execute(): Promise<NextScreenToSplash> {
        const versionInfo = await this.getVersionInfo.execute();

        if (versionInfo.error) {
            switch (versionInfo.error) {
                case VersionErrorType.NO_INTERNET:
                    return NextScreenToSplash.NO_INTERNET;
                case VersionErrorType.SERVER_ERROR:
                    return NextScreenToSplash.SERVER_ERROR;
                case VersionErrorType.FORMAT_VERSION_ERROR:
                    return NextScreenToSplash.FORMAT_VERSION_ERROR;
            }
        }

        const requiresUpdate = await this.isForceUpdate.execute(
            versionInfo.versionInstalled,
            versionInfo.minVersionSupported
        );
        return requiresUpdate ? NextScreenToSplash.FORCE_UPDATE : NextScreenToSplash.HOME;
    }
}
