#!/usr/bin/env node
import { spawnSync } from "node:child_process";
import { existsSync, readFileSync, writeFileSync } from "node:fs";
import { resolve } from "node:path";

const mode = process.argv[2] ?? "baseline";
const baselinePath = resolve("features/2026-07-02-complex/perf-baseline.json");
const typedBin = "node_modules/.pnpm/typed-tester@*/node_modules/typed-tester/bin/typed.js";
const complexityCodes = ["2589", "2590", "2859", "2321"];

function run(command, args, options = {}) {
    const result = spawnSync(command, args, {
        cwd: resolve("."),
        encoding: "utf8",
        shell: true,
        maxBuffer: 200 * 1024 * 1024,
        env: {
            ...process.env,
            FORCE_COLOR: "0",
            NO_COLOR: "1",
            ...options.env,
        },
    });

    return {
        status: result.status ?? 1,
        stdout: result.stdout ?? "",
        stderr: result.stderr ?? "",
    };
}

function stripAnsi(value) {
    return value
        .replace(/\u001B\]8;;[^\u001B\u0007]*(?:\u0007|\u001B\\)/g, "")
        .replace(/\u001B\[[0-?]*[ -/]*[@-~]/g, "");
}

function parseTime(stderr) {
    const clean = stripAnsi(stderr);
    const rssMatch = clean.match(/^\s*(\d+)\s+maximum resident set size/m);
    const realMatch = clean.match(/^\s*([\d.]+)\s+real\b/m);

    return {
        wallSeconds: realMatch ? Number(realMatch[1]) : null,
        peakRssBytes: rssMatch ? Number(rssMatch[1]) : null,
        peakRssMb: rssMatch ? Math.round(Number(rssMatch[1]) / 1024 / 1024) : null,
    };
}

function parseFileTimings(stdout) {
    const clean = stripAnsi(stdout);
    const timings = [];
    const re = /((?:tests|benches)\/[^\n]+?\.ts)[^\n]*\)\s+([\d.]+)(ms|s)(?:\s+\|[^\n]*)?\s*$/gm;
    let match;

    while ((match = re.exec(clean))) {
        const value = Number(match[2]);
        timings.push({
            file: match[1],
            ms: match[3] === "s" ? Math.round(value * 1000) : Math.round(value),
        });
    }

    return timings;
}

function countComplexityDiagnostics(output) {
    return Object.fromEntries(
        complexityCodes.map(code => [
            `TS${code}`,
            (output.match(new RegExp(`error TS${code}`, "g")) ?? []).length,
        ]),
    );
}

function totalCounts(counts) {
    return Object.values(counts).reduce((sum, count) => sum + count, 0);
}

function measure() {
    const typed = run("/usr/bin/time", [
        "-l",
        "node",
        "--max-old-space-size=12288",
        typedBin,
        "test",
        "--metrics",
        "--show-passing",
    ]);

    if (typed.status !== 0) {
        process.stdout.write(typed.stdout);
        process.stderr.write(typed.stderr);
        throw new Error(`typed test --metrics failed with exit code ${typed.status}`);
    }

    const checkTypes = run("just", ["check-types"]);
    const diagnosticOutput = `${checkTypes.stdout}\n${checkTypes.stderr}`;
    const complexityDiagnostics = countComplexityDiagnostics(diagnosticOutput);

    return {
        capturedAt: new Date().toISOString(),
        commands: {
            typeTests: "/usr/bin/time -l node --max-old-space-size=12288 node_modules/.pnpm/typed-tester@*/node_modules/typed-tester/bin/typed.js test --metrics --show-passing",
            checkTypes: "just check-types",
        },
        typeTests: {
            status: typed.status,
            ...parseTime(typed.stderr),
            fileTimings: parseFileTimings(`${typed.stdout}\n${typed.stderr}`),
        },
        checkTypes: {
            status: checkTypes.status,
            complexityDiagnostics,
            complexityTotal: totalCounts(complexityDiagnostics),
        },
    };
}

function compare(current, baseline) {
    const failures = [];
    const baselineRss = baseline.typeTests?.peakRssMb;
    const currentRss = current.typeTests?.peakRssMb;

    if (typeof baselineRss === "number" && typeof currentRss === "number") {
        const maxRss = baselineRss * 1.15;
        if (currentRss > maxRss) {
            failures.push(`type-test peak RSS grew from ${baselineRss} MB to ${currentRss} MB (> 15%)`);
        }
    }

    for (const code of Object.keys(current.checkTypes.complexityDiagnostics)) {
        const baselineCount = baseline.checkTypes?.complexityDiagnostics?.[code] ?? 0;
        const currentCount = current.checkTypes.complexityDiagnostics[code] ?? 0;
        if (currentCount > baselineCount) {
            failures.push(`${code} count rose from ${baselineCount} to ${currentCount}`);
        }
    }

    return failures;
}

try {
    const current = measure();

    if (mode === "baseline") {
        writeFileSync(baselinePath, `${JSON.stringify(current, null, 2)}\n`);
        console.log(`Wrote ${baselinePath}`);
        console.log(`type tests: ${current.typeTests.wallSeconds ?? "unknown"}s, ${current.typeTests.peakRssMb ?? "unknown"} MB RSS`);
        console.log(`complexity diagnostics: ${current.checkTypes.complexityTotal}`);
    }
    else if (mode === "compare") {
        if (!existsSync(baselinePath)) {
            throw new Error(`Missing baseline at ${baselinePath}; run 'just perf-baseline' first`);
        }

        const baseline = JSON.parse(readFileSync(baselinePath, "utf8"));
        const failures = compare(current, baseline);

        if (failures.length > 0) {
            for (const failure of failures) {
                console.error(`perf regression: ${failure}`);
            }
            process.exit(1);
        }

        console.log("Performance comparison passed");
        console.log(`type tests: ${current.typeTests.wallSeconds ?? "unknown"}s, ${current.typeTests.peakRssMb ?? "unknown"} MB RSS`);
        console.log(`complexity diagnostics: ${current.checkTypes.complexityTotal}`);
    }
    else {
        throw new Error(`Unknown mode '${mode}'`);
    }
}
catch (error) {
    console.error(error instanceof Error ? error.message : String(error));
    process.exit(1);
}
