import { describe, expect, it } from "vitest";

import { spawnSync } from "node:child_process";
import { cwd } from "node:process";
import { join} from "pathe";

describe("Test Transpiled Code", () => {
    const dir = join(cwd(), "/modules");

    it("constants", () => {
        const t = spawnSync("node", [join(dir, "/constants/dist/index.js")]);

        expect(t.status).toBe(0);
    });

    it("types", () => {
        const t = spawnSync("node", [join(dir, "/types/dist/index.js")]);

        expect(t.status).toBe(0);
    });

    it("runtime", () => {
        const t = spawnSync("node", [join(dir, "/runtime/dist/index.js")]);

        expect(t.status).toBe(0);
    });

    it("inferred-types", () => {
        const t = spawnSync("node", [join(dir, "/inferred-types/dist/index.js")]);

        expect(t.status).toBe(0);
    });


});
