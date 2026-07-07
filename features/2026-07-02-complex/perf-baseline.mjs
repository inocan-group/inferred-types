#!/usr/bin/env node
import { spawnSync } from "node:child_process";
import { existsSync, readFileSync, writeFileSync } from "node:fs";
import { resolve } from "node:path";

const mode = process.argv[2] ?? "baseline";
const baselinePath = resolve("features/2026-07-02-complex/perf-baseline.json");
const deferredPath = resolve("features/2026-07-02-complex/deferred.md");
const complexityCodes = ["2589", "2590", "2859", "2321"];
const complexitySuppressionPattern = /@ts-expect-error TS(?:2589|2590|2859|2321)/;
const sourceCheckRecipes = ["check-constants", "check-types", "check-runtime"];
const g1TypeTestLimits = {
    wallSeconds: 60,
    peakRssBytes: Math.round(3.5 * 1024 ** 3),
    peakRssMiB: Math.round(3.5 * 1024),
    convention: "GiB",
};

function run(command, args, options = {}) {
    const env = {
        ...process.env,
        FORCE_COLOR: "0",
        NO_COLOR: "1",
        ...options.env,
    };

    if (options.defaultHeap) {
        delete env.NODE_OPTIONS;
    }

    const result = spawnSync(command, args, {
        cwd: resolve("."),
        encoding: "utf8",
        shell: true,
        maxBuffer: 200 * 1024 * 1024,
        env,
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

function combineCounts(items) {
    return Object.fromEntries(
        complexityCodes.map((code) => {
            const key = `TS${code}`;
            const total = items.reduce((sum, item) => sum + (item.complexityDiagnostics?.[key] ?? 0), 0);
            return [key, total];
        }),
    );
}

function sumNumbers(values) {
    return values.reduce(
        (sum, value) => typeof value === "number" ? sum + value : sum,
        0,
    );
}

function commandText(command, args) {
    return [command, ...args].join(" ");
}

function collectComplexitySuppressions() {
    const scan = run("rg", [
        "-n",
        "\"@ts-expect-error TS(2589|2590|2859|2321)\"",
        "modules/types/src",
        "modules/runtime/src",
        "modules/constants/src",
    ]);

    if (scan.status > 1) {
        process.stdout.write(scan.stdout);
        process.stderr.write(scan.stderr);
        throw new Error(`complexity suppression scan failed with exit code ${scan.status}`);
    }

    return stripAnsi(scan.stdout)
        .split("\n")
        .filter(Boolean)
        .map((line) => {
            const [file, lineNumber, ...rest] = line.split(":");
            return {
                file,
                line: Number(lineNumber),
                text: rest.join(":").trim(),
            };
        })
        .filter(suppression => complexitySuppressionPattern.test(suppression.text));
}

function validateTrackedSuppressions(suppressions) {
    const deferred = existsSync(deferredPath) ? readFileSync(deferredPath, "utf8") : "";
    const failures = [];

    for (const suppression of suppressions) {
        if (!deferred.includes(suppression.file)) {
            failures.push(`${suppression.file}:${suppression.line} is not listed in ${deferredPath}`);
        }
    }

    return failures;
}

function runTimed(command, args, options = {}) {
    const result = run("/usr/bin/time", ["-l", command, ...args], options);
    return {
        command: commandText(command, args),
        status: result.status,
        stdout: result.stdout,
        stderr: result.stderr,
        ...parseTime(result.stderr),
    };
}

function measureTypeTests() {
    const typed = runTimed("pnpm", ["test:types", "--metrics", "--show-passing"], {
        defaultHeap: true,
    });

    if (typed.status !== 0) {
        process.stdout.write(typed.stdout);
        process.stderr.write(typed.stderr);
        throw new Error(`pnpm test:types --metrics --show-passing failed with exit code ${typed.status}`);
    }

    return {
        status: typed.status,
        wallSeconds: typed.wallSeconds,
        peakRssBytes: typed.peakRssBytes,
        peakRssMb: typed.peakRssMb,
        fileTimings: parseFileTimings(`${typed.stdout}\n${typed.stderr}`),
    };
}

function measureSourceCheck(recipe) {
    const check = runTimed("just", [recipe], {
        defaultHeap: true,
    });
    const diagnosticOutput = `${check.stdout}\n${check.stderr}`;
    const complexityDiagnostics = countComplexityDiagnostics(diagnosticOutput);

    return {
        status: check.status,
        wallSeconds: check.wallSeconds,
        peakRssBytes: check.peakRssBytes,
        peakRssMb: check.peakRssMb,
        complexityDiagnostics,
        complexityTotal: totalCounts(complexityDiagnostics),
    };
}

function summarizeSourceChecks(sourceChecks) {
    return Object.entries(sourceChecks.checks)
        .map(([recipe, check]) => `${recipe}=${check.status}`)
        .join(", ");
}

function summarizeSlowestFiles(typeTests, count = 3) {
    return typeTests.fileTimings
        .slice()
        .sort((a, b) => b.ms - a.ms)
        .slice(0, count)
        .map(timing => `${timing.file} ${timing.ms}ms`)
        .join("; ");
}

function printSummary(current) {
    console.log(`type tests: ${current.typeTests.wallSeconds ?? "unknown"}s, ${current.typeTests.peakRssMb ?? "unknown"} MiB RSS`);
    console.log(`G1 limits: <= ${g1TypeTestLimits.wallSeconds}s, <= ${g1TypeTestLimits.peakRssMiB} MiB RSS (${g1TypeTestLimits.convention})`);
    console.log(`type-test file timings: ${current.typeTests.fileTimings.length} files; slowest ${summarizeSlowestFiles(current.typeTests)}`);
    console.log(`source checks: ${summarizeSourceChecks(current.sourceChecks)}; ${current.sourceChecks.wallSeconds ?? "unknown"}s, ${current.sourceChecks.peakRssMb ?? "unknown"} MiB peak RSS`);
    console.log(`complexity diagnostics: ${current.sourceChecks.complexityTotal}`);
    console.log(`tracked complexity suppressions: ${current.complexitySuppressions.total}`);
}

function measure() {
    const typeTests = measureTypeTests();
    const checks = Object.fromEntries(
        sourceCheckRecipes.map(recipe => [recipe, measureSourceCheck(recipe)]),
    );
    const sourceCheckValues = Object.values(checks);
    const complexityDiagnostics = combineCounts(sourceCheckValues);
    const complexitySuppressions = collectComplexitySuppressions();
    const undocumentedComplexitySuppressions = validateTrackedSuppressions(complexitySuppressions);

    return {
        capturedAt: new Date().toISOString(),
        commands: {
            typeTests: "/usr/bin/time -l pnpm test:types --metrics --show-passing",
            checkConstants: "just check-constants",
            checkTypes: "just check-types",
            checkRuntime: "just check-runtime",
            complexitySuppressions: "rg -n \"@ts-expect-error TS(2589|2590|2859|2321)\" modules/types/src modules/runtime/src modules/constants/src",
        },
        thresholds: {
            typeTests: g1TypeTestLimits,
        },
        typeTests,
        sourceChecks: {
            status: sourceCheckValues.every(check => check.status === 0) ? 0 : 1,
            wallSeconds: Math.round(sumNumbers(sourceCheckValues.map(check => check.wallSeconds)) * 100) / 100,
            peakRssMb: Math.max(...sourceCheckValues.map(check => check.peakRssMb ?? 0)),
            complexityDiagnostics,
            complexityTotal: totalCounts(complexityDiagnostics),
            checks,
        },
        complexitySuppressions: {
            total: complexitySuppressions.length,
            entries: complexitySuppressions,
            undocumented: undocumentedComplexitySuppressions,
        },
    };
}

function compare(current, baseline) {
    const failures = [];
    const baselineRss = baseline.typeTests?.peakRssMb;
    const currentRss = current.typeTests?.peakRssMb;
    const currentRssBytes = current.typeTests?.peakRssBytes;
    const currentWallSeconds = current.typeTests?.wallSeconds;
    const sourceChecks = current.sourceChecks?.checks ?? {};

    if (typeof currentWallSeconds === "number" && currentWallSeconds > g1TypeTestLimits.wallSeconds) {
        failures.push(`type-test wall time ${currentWallSeconds}s exceeds G1 limit ${g1TypeTestLimits.wallSeconds}s`);
    }

    if (typeof currentRssBytes === "number" && currentRssBytes > g1TypeTestLimits.peakRssBytes) {
        failures.push(`type-test peak RSS ${currentRssBytes} bytes exceeds G1 limit ${g1TypeTestLimits.peakRssBytes} bytes (${g1TypeTestLimits.peakRssMiB} MiB)`);
    }

    if (typeof baselineRss === "number" && typeof currentRss === "number") {
        const maxRss = baselineRss * 1.15;
        if (currentRss > maxRss) {
            failures.push(`type-test peak RSS grew from ${baselineRss} MiB to ${currentRss} MiB (> 15%)`);
        }
    }

    for (const [recipe, check] of Object.entries(sourceChecks)) {
        if (check.status !== 0) {
            failures.push(`just ${recipe} failed with exit code ${check.status}`);
        }
    }

    for (const code of Object.keys(current.sourceChecks.complexityDiagnostics)) {
        const baselineCount = baseline.sourceChecks?.complexityDiagnostics?.[code]
            ?? baseline.checkTypes?.complexityDiagnostics?.[code]
            ?? 0;
        const currentCount = current.sourceChecks.complexityDiagnostics[code] ?? 0;
        if (currentCount > baselineCount) {
            failures.push(`${code} count rose from ${baselineCount} to ${currentCount}`);
        }
    }

    for (const suppression of current.complexitySuppressions.undocumented) {
        failures.push(`undocumented complexity suppression: ${suppression}`);
    }

    return failures;
}

try {
    const current = measure();

    if (mode === "baseline") {
        writeFileSync(baselinePath, `${JSON.stringify(current, null, 2)}\n`);
        console.log(`Wrote ${baselinePath}`);
        printSummary(current);
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
        printSummary(current);
    }
    else {
        throw new Error(`Unknown mode '${mode}'`);
    }
}
catch (error) {
    console.error(error instanceof Error ? error.message : String(error));
    process.exit(1);
}
