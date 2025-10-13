import { beforeAll, describe, expect, it } from "vitest";

import { spawnSync } from "node:child_process";
import { existsSync } from "node:fs";
import { cwd } from "node:process";
import { join} from "pathe";

describe("Test Transpiled Code", () => {
    const dir = join(cwd(), "/modules");

    const modules = {
        "constants": join(dir, "/constants/dist/index.js"),
        "types": join(dir, "/types/dist/index.js"),
        "runtime": join(dir, "/runtime/dist/index.js"),
        "inferred-types": join(dir, "/inferred-types/dist/index.js"),
    };

    function checkAllFilesExist(): boolean {
        return Object.values(modules).every(path => existsSync(path));
    }

    function getMissingFiles(): string[] {
        return Object.entries(modules)
            .filter(([, path]) => !existsSync(path))
            .map(([name, path]) => `${name} (${path})`);
    }

    beforeAll(() => {
        if (!checkAllFilesExist()) {
            const missing = getMissingFiles();
            console.warn(
                `⚠️  Skipping transpiled code tests: Transpiled code not found. ` +
                `Run 'pnpm build' first. Missing: ${missing.join(", ")}`
            );
        }
    });

    function testModule(name: string, path: string) {
        const result = spawnSync("node", [path], { encoding: "utf-8" });

        if (result.status !== 0) {
            const errorMsg = [
                `Module ${name} failed with exit code ${result.status}`,
                result.stderr ? `STDERR: ${result.stderr}` : "",
                result.stdout ? `STDOUT: ${result.stdout}` : "",
            ].filter(Boolean).join("\n");

            throw new Error(errorMsg);
        }

        expect(result.status).toBe(0);
    }

    it.skipIf(!checkAllFilesExist())("constants", () => {
        testModule("constants", modules["constants"]);
    });

    it.skipIf(!checkAllFilesExist())("types", () => {
        testModule("types", modules["types"]);
    });

    it.skipIf(!checkAllFilesExist())("runtime", () => {
        testModule("runtime", modules["runtime"]);
    });

    it.skipIf(!checkAllFilesExist())("inferred-types", () => {
        testModule("inferred-types", modules["inferred-types"]);
    });
});
