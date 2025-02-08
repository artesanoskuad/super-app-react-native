import { RemoteVersionRepository } from "../../domain/repositories/RemoteVersionRepository";

export class RemoteVersionRepositoryHardcoded implements RemoteVersionRepository {
    async getMinVersionSupported(): Promise<string> {
        return "0.4.0"; // 🔹 Simulamos la versión mínima soportada por el backend
    }
}
