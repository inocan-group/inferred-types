import { describe, it, expect } from "vitest";
import { execSync } from "node:child_process";
import { join } from "node:path";

/**
 * Tests that the scripts/invalid-imports.sh script works correctly.
 *
 * Fixture files with known problematic patterns are available in
 * `tests/fixtures/import-problems/` for manual testing and reference.
 *
 * To manually test pattern detection:
 * ```bash
 * cd tests/fixtures/import-problems
 * bash ../../../scripts/invalid-imports.sh
 * ```
 */
describe("invalid-imports.sh script validation", () => {
    const rootDir = process.cwd();
    const scriptPath = join(rootDir, "scripts/invalid-imports.sh");

    const runScript = (): { exitCode: number; stdout: string } => {
        try {
            const stdout = execSync(`bash "${scriptPath}"`, {
                cwd: rootDir,
                encoding: "utf-8",
                stdio: ["pipe", "pipe", "pipe"],
            });
            return { exitCode: 0, stdout };
        } catch (error: any) {
            return {
                exitCode: error.status || 1,
                stdout: error.stdout?.toString() || "",
            };
        }
    };

    it("validates the codebase has no import problems", () => {
        const result = runScript();

        // The main codebase should pass all checks (exit code 0)
        if (result.exitCode !== 0) {
            console.log("\nCodebase has import problems:");
            console.log(result.stdout);
        }

        expect(result.exitCode).toBe(0);
    });

    it("produces valid XML structure", () => {
        const result = runScript();

        // Check XML structure
        expect(result.stdout).toContain("<invalid-imports>");
        expect(result.stdout).toContain("</invalid-imports>");
        expect(result.stdout).toMatch(/<section name="[^"]+"/);
        expect(result.stdout).toContain("</section>");
    });

    it("includes all expected sections", () => {
        const result = runScript();

        const expectedSections = [
            "invalid-runtime-alias-depth",
            "invalid-type-alias-depth",
            "unspecified-path-alias",
            "relative-path",
            "forbidden-@-import",
            "forbidden-runtime-import",
            "forbidden-const-aliases",
            "missing-type-modifier",
            "multiple-imports-same-source",
        ];

        for (const section of expectedSections) {
            expect(result.stdout).toContain(`<section name="${section}">`);
        }
    });
});
