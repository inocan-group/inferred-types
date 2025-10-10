import { describe, it, expect } from "vitest";
import { execSync } from "node:child_process";
import { join } from "node:path";

/**
 * Tests that the scripts/invalid-imports.sh script correctly detects
 * problematic import patterns using test fixtures.
 */
describe("invalid-imports.sh pattern detection", () => {
    const problemsDir = join(process.cwd(), "tests/fixtures/import-problems/problems");
    const validDir = join(process.cwd(), "tests/fixtures/import-problems/valid");
    const scriptPath = join(process.cwd(), "scripts/invalid-imports.sh");

    const runScript = (directory: string): { exitCode: number; stdout: string } => {
        try {
            const stdout = execSync(`bash "${scriptPath}" "${directory}"`, {
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

    const countOccurrences = (xml: string, sectionName: string): number => {
        const regex = new RegExp(`<section name="${sectionName}">([\\s\\S]*?)</section>`, "g");
        const match = xml.match(regex);
        if (!match) return 0;

        const sectionContent = match[0];
        const instanceMatches = sectionContent.match(/<instance/g);
        return instanceMatches ? instanceMatches.length : 0;
    };

    describe("with problematic imports", () => {
        it("debug: shows script output", () => {
            const result = runScript(problemsDir);
            console.log("Exit code:", result.exitCode);
            console.log("STDOUT length:", result.stdout.length);
            console.log("STDOUT:", result.stdout);
        });

        it("detects invalid-runtime-alias-depth pattern", () => {
            const result = runScript(problemsDir);
            const count = countOccurrences(result.stdout, "invalid-runtime-alias-depth");

            expect(count).toBe(1);
            expect(result.stdout).toContain("invalid-runtime-depth.ts");
        });

        it("detects invalid-type-alias-depth pattern", () => {
            const result = runScript(problemsDir);
            const count = countOccurrences(result.stdout, "invalid-type-alias-depth");

            expect(count).toBe(1);
            expect(result.stdout).toContain("invalid-type-depth.ts");
        });

        it("detects relative-path imports and exports", () => {
            const result = runScript(problemsDir);
            const count = countOccurrences(result.stdout, "relative-path");

            expect(count).toBe(2);
            expect(result.stdout).toContain("relative-import.ts");
            expect(result.stdout).toContain("relative-export.ts");
        });

        it("detects forbidden-const-aliases pattern", () => {
            const result = runScript(problemsDir);
            const count = countOccurrences(result.stdout, "forbidden-const-aliases");

            expect(count).toBe(1);
            expect(result.stdout).toContain("forbidden-const-alias.ts");
        });

        it("detects missing-type-modifier pattern", () => {
            const result = runScript(problemsDir);
            const count = countOccurrences(result.stdout, "missing-type-modifier");

            expect(count).toBe(1);
            expect(result.stdout).toContain("missing-type-modifier.ts");
        });

        it("detects multiple-imports-same-source pattern", () => {
            const result = runScript(problemsDir);
            const count = countOccurrences(result.stdout, "multiple-imports-same-source");

            expect(count).toBe(2);
            expect(result.stdout).toContain("multiple-imports.ts");
        });

        it("exits with code 1 when problems are detected", () => {
            const result = runScript(problemsDir);
            expect(result.exitCode).toBe(1);
        });

        it("produces valid XML structure", () => {
            const result = runScript(problemsDir);

            expect(result.stdout).toContain("<invalid-imports>");
            expect(result.stdout).toContain("</invalid-imports>");
            expect(result.stdout).toMatch(/<section name="[^"]+"/);
            expect(result.stdout).toContain("</section>");
        });

        it("includes all expected sections", () => {
            const result = runScript(problemsDir);

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

    describe("with valid imports", () => {
        it("finds no problems in valid imports", () => {
            const result = runScript(validDir);

            const problemSections = [
                "invalid-runtime-alias-depth",
                "invalid-type-alias-depth",
                "relative-path",
                "forbidden-const-aliases",
                "missing-type-modifier",
                "multiple-imports-same-source",
            ];

            for (const section of problemSections) {
                const count = countOccurrences(result.stdout, section);
                expect(count).toBe(0);
            }
        });

        it("exits with code 0 when no problems are detected", () => {
            const result = runScript(validDir);
            expect(result.exitCode).toBe(0);
        });

        it("still produces valid XML structure", () => {
            const result = runScript(validDir);

            expect(result.stdout).toContain("<invalid-imports>");
            expect(result.stdout).toContain("</invalid-imports>");
        });
    });
});
