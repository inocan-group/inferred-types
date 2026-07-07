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

`just test-types` runs `typed test` at the default Node heap. As of the Phase 8
closeout, the full type-test suite runs in about 20 seconds with a peak RSS of
3,602,628,608 bytes, roughly 3.36 GiB.

The source-check recipes use the check-mode tsconfigs:

```txt
modules/constants/tsconfig.check.json
modules/types/tsconfig.check.json
modules/runtime/tsconfig.check.json
```

Those configs are source-only checks. They avoid project references, `baseUrl`,
declaration emit, `.drop` / `.hold` files, and stale include entries.

`modules/types/tsconfig.check.json` maps package aliases to source and is the
canonical complexity gate. Phase 8 closes with:

```txt
just check-types
# exit 0, 0 TS2589/TS2590/TS2859/TS2321 diagnostics
```

`modules/runtime/tsconfig.check.json` uses declaration bundles for upstream
packages and a check-only self-import shim for `inferred-types/runtime`; the
runtime source graph still exceeds the practical default-heap budget for a
single whole-module `tsc` invocation and remains documented in the feature
deferral log.

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

Phase 8 refreshed the checked-in baseline with:

```txt
type tests: 18.7s, 3645 MB RSS
complexity diagnostics: 0
```

The matching `just perf-compare` run passed with:

```txt
type tests: 18.58s, 4014 MB RSS
complexity diagnostics: 0
```

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
