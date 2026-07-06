# Type Performance Guide

This repo treats type-level performance as a first-class correctness concern.
The library intentionally preserves narrow literal types, but a utility is not
healthy if normal type tests, source checks, or editor tooling require unusual
amounts of memory.

## Current Workflows

Use the root `justfile` recipes for repeatable measurements:

```sh
just test-types
just check-constants
just check-types
just check-runtime
just check
just perf-baseline
just perf-compare
```

`just test-types` runs `typed test` with an 8 GB Node heap. This is a temporary
Phase-1 stopgap while the type-cost remediation phases reduce the suite below
the default heap again.

The source-check recipes use the check-mode tsconfigs:

```txt
modules/constants/tsconfig.check.json
modules/types/tsconfig.check.json
modules/runtime/tsconfig.check.json
```

Those configs are source-only checks. They avoid project references, build
artifacts, `baseUrl`, declaration emit, `.drop` / `.hold` files, and stale
include entries. They map `inferred-types/*` and local deep aliases directly to
source files so diagnostics point at the implementation being changed.

## Baselines

`just perf-baseline` writes:

```txt
features/2026-07-02-complex/perf-baseline.json
```

The baseline captures:

- full `typed test --metrics` wall time from `/usr/bin/time -l`
- full type-test peak RSS
- per-file timings reported by `typed`
- complexity-class diagnostic counts from `just check-types`

`just perf-compare` re-runs the same measurements and fails if:

- any `TS2589`, `TS2590`, `TS2859`, or `TS2321` diagnostic count rises
- full suite peak RSS grows by more than 15 percent

The baseline is machine-dependent by design. Treat it as a point-in-time guard
for this feature branch, not as a portable benchmark for all machines.

## Scoped Tracing

Do not generate or analyze whole-module traces for this repo. The type surface is
large enough that full-module trace generation and `@typescript/analyze-trace`
can consume more memory than the source check itself.

Trace one file or one small source subtree at a time:

```sh
rm -rf traces/current
NODE_OPTIONS=--max-old-space-size=12288 \
  ./node_modules/.bin/tsc \
  -p modules/types/tsconfig.check.json \
  --noEmit \
  --generateTrace traces/current \
  --pretty false

npx @typescript/analyze-trace traces/current
```

For test-file hotspots, prefer an individual type-test run first:

```sh
node --max-old-space-size=8192 \
  node_modules/.pnpm/typed-tester@*/node_modules/typed-tester/bin/typed.js \
  test tests/datetime/daysInMonth.test.ts --metrics
```

If a trace is needed after that, create a small scratch probe that imports only
the target utility and representative inputs. Keep probes under the active
feature directory or a disposable scratch path, not under `tests/`.

## Optimization Patterns

Prefer these fixes in order:

1. Add explicit return annotations to exported generic runtime mirrors.
2. Return wide-but-correct types early for wide inputs.
3. Bind expensive conditional results once with `extends infer R`.
4. Replace cartesian template-literal unions with structural validators.
5. Split large conditionals into smaller phases.

Every change must preserve existing assertions unless a deliberate widening is
documented in the feature log with a concrete reason.
