import { InstalledVersionRepository } from "../../domain/repositories/InstalledVersionRepository";

export class InstalledVersionRepositoryHardcoded implements InstalledVersionRepository {
    async getInstalledVersion(): Promise<string> {
        return "0.3.0"; // 🔹 Simulamos la versión instalada en el dispositivo
    }
}
