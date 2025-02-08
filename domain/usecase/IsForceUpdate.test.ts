import { IsForceUpdate } from "./IsForceUpdate";

describe("IsForceUpdate", () => {
    let isForceUpdate: IsForceUpdate;

    beforeEach(() => {
        isForceUpdate = new IsForceUpdate();
    });

    test("Debería retornar true si la versión instalada es menor que la mínima soportada", async () => {
        const result = await isForceUpdate.execute("1.1.0", "1.2.0");
        expect(result).toBe(true);
    });

    test("Debería retornar false si la versión instalada es igual o mayor que la mínima soportada", async () => {
        const result1 = await isForceUpdate.execute("1.2.0", "1.2.0");
        const result2 = await isForceUpdate.execute("1.3.0", "1.2.0");
        expect(result1).toBe(false);
        expect(result2).toBe(false);
    });

    test("Debería lanzar un error si la versión instalada tiene un formato inválido", async () => {
        await expect(isForceUpdate.execute("1.2", "1.2.0")).rejects.toThrow("Formato inválido [1.2]. Formato esperado [X.Y.Z]");
    });

    test("Debería lanzar un error si la versión mínima soportada tiene un formato inválido", async () => {
        await expect(isForceUpdate.execute("1.2.0", "1.2")).rejects.toThrow("Formato inválido [1.2]. Formato esperado [X.Y.Z]");
    });
});
