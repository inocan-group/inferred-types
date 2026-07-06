---
title: Type Performance Stabilization
status: ready for planning
date: 2026-07-06
supersedes: the 2026-07-02 "Source Type-Complexity Inventory" draft of this spec
packages:
  - modules/types
  - modules/runtime
  - modules/constants
prior_work:
  - features/2026-07-01-type-complexity/spec.md
  - features/2026-07-01-type-complexity-phase2/spec.md
baseline_artifacts:
  - features/2026-07-02-complex/types-module-diagnostics-2026-07-06.txt
  - features/2026-07-02-complex/unannotated-runtime-functions-2026-07-06.txt
related:
  - features/2026-07-02-complex/tool-gaps.md
source_files:
  - features/2026-07-02-complex/perf-baseline.mjs
  - justfile
  - modules/constants/tsconfig.check.json
  - modules/runtime/src/boolean-logic/ifArrayPartial.ts
  - modules/runtime/src/boolean-logic/ifScalar.ts
  - modules/runtime/src/css/createCssKeyframe.ts
  - modules/runtime/src/datetime/asDateTime.ts
  - modules/runtime/src/lists/joinWith.ts
  - modules/runtime/src/regex/createTemplateRegExp.ts
  - modules/runtime/tsconfig.check.json
  - modules/types/src/assertions/Test.ts
  - modules/types/tsconfig.check.json
  - package.json
documentation:
  - docs/type-performance.md
  - features/2026-07-02-complex/perf-baseline.json
  - features/2026-07-02-complex/plan.md
  - features/2026-07-02-complex/spec.md
  - features/2026-07-02-complex/types-module-diagnostics-2026-07-06.txt
skills: []
---

# Type Performance Stabilization

## Purpose

The July-1 type-complexity efforts succeeded: `just test-types` is green (0 errors across 3,637 tests / 10,240 assertions). The diagnostic seed set the earlier draft of this spec was built on is therefore **stale** — every `TS2589` test failure it inventoried has been fixed.

What remains is a **performance and type-health problem**, not a correctness problem in tests:

1. The type-test suite only completes with an 8 GB Node heap (peak RSS **6.16 GB**). The canonical `pnpm test:types` script runs at the default heap and **crashes with a V8 OOM today**.
2. A handful of test files dominate cost — the worst single file takes **29 s / 4.1 GB** on its own.
3. Whole-module source checking is effectively impossible: `tsc --noEmit` over `modules/types` **OOMs at the default heap**, and needs ~10 GB and 10+ minutes to finish.
4. When whole-module checking *is* forced to completion, it reveals **~75 complexity-class diagnostics** (`TS2589`, `TS2590`, `TS2859`, `TS2321`) plus ~100 real correctness errors in source files that the green test suite never exercises in that instantiation context.
5. The audit scripts (`pnpm audit:types` / `audit:runtime`) are unusable at practical settings, and `modules/runtime` has **no working vanilla-`tsc` check path at all** (project-reference and `baseUrl` config failures).

The goal of this feature: **reduce the type-instantiation cost of the library's source so that standard tooling works at standard settings, while retaining the narrow type resolution the library exists to provide.**

## Measured Baseline (2026-07-06)

All numbers measured on this repo at commit `1ba9d602`, TypeScript 6.0.3, Node 22.20.0, Apple Silicon.

### Test-suite surface

| Measurement | Command | Result |
| --- | --- | --- |
| Full type-test suite (8 GB heap) | `just test-types` | exit 0, ~66 s wall, **6.16 GB peak RSS** |
| Full type-test suite (default heap) | `pnpm test:types` | **crashes** (V8 OOM, `ELIFECYCLE`) |
| Combined runtime + type tests | `just test` / `pnpm test` | **crashes** — `scripts/test-with-args.mjs` invokes `pnpm test:types` at the default heap, so the primary local test command dies in its type-test stage |
| Control file | `typed test tests/string-literals/EnsureLeading.test.ts` | 0.4 s check / 1.7 s total |

Slow files as flagged by the runner, timed individually (8 GB heap):

| Test file | Wall | Peak RSS |
| --- | --- | --- |
| `tests/datetime/daysInMonth.test.ts` | **29.3 s** | **4.1 GB** |
| `tests/numeric/Increment.test.ts` | 11.4 s | 2.8 GB |
| `tests/numeric/Decrement.test.ts` | 11.2 s | 2.8 GB |
| `tests/runtime/input-tokens/FromInputToken.test.ts` | 3.8 s | 1.1 GB |
| `tests/string-literals/PhoneNumbers.test.ts` | 2.9 s | 1.0 GB |
| `tests/datetime/AsDateMeta.test.ts` | 2.9 s | 0.9 GB |
| `tests/type-guards/tw/isTailwindColorClass.test.ts` | 2.5 s | 0.8 GB |

Note the two-orders-of-magnitude spread between the control file and `daysInMonth` — cost is concentrated, which makes this tractable.

### Source-check surface

| Measurement | Command | Result |
| --- | --- | --- |
| `modules/types` check, default heap | `tsc -p modules/types/tsconfig.json --noEmit` | **OOM crash** after ~131 s |
| `modules/types` check, 10 GB heap + trace | same + `NODE_OPTIONS`, `--generateTrace` | 785 s, **10.6 GB peak RSS**, ~300 error lines |
| `modules/types` audit, 12 GB heap | `typed source -c modules/types/tsconfig.json ...` | completes in **881 s**; 197 errors / 82 files |
| `modules/runtime` check | `tsc -p modules/runtime/tsconfig.json --noEmit` | **unusable** — `TS5101` (`baseUrl` deprecated under TS 6), then ~500 × `TS6305` (references expect tsc-built dist, but dist is built by tsdown) |
| `modules/constants` audit | `pnpm audit:constants` | fine — 57 files, ~1 s, clean |

### Complexity-class diagnostics in `modules/types` source

From the full `tsc --noEmit` run (raw output preserved at
`features/2026-07-02-complex/types-module-diagnostics-2026-07-06.txt`):

| Code | Meaning | Count |
| --- | --- | --- |
| TS2589 | instantiation excessively deep | **66** |
| TS2321 | excessive stack depth comparing types | 4 |
| TS2590 | union too complex to represent | 3 |
| TS2859 | excessive complexity comparing types | 2 |
| TS6305 | reference/dist mismatch (config artifact) | 103 |
| TS2344 / TS2322 / TS2304 / TS2536 / TS2300 / others | correctness errors surfaced only in whole-module context | ~118 |

The 42 files carrying complexity-class errors cluster heavily:

- **Numeric-literal arithmetic** (24 errors): `Mod`, `Multiply`, `Divide`, `Add`, `Sum`, `Subtract`, `Delta`, `Increment`, `ShiftDecimalPlace`, `CompareNumbers`, `CSV`, plus comparison operators `IsLessThan`, `IsGreaterThan`, and `FixedLengthArray`.
- **Lists** (11 errors): `TakeFirst`, `Slice`, `IndexOf`, `Longest`, `BeforeLast`, `AsNumericArray`, `IsValidIndex`.
- **String mutation / parsing** (11 errors): `NestedSplit`, `Repeat`, `Split`, `Split2`, `ReplaceFromTo`, `HexToDecimal`, `IsPercentage`.
- **Datetime** (7 errors): `DaysInMonth`, `IsSameYear`, `IsSameMonthYear`, `IsLeapYear`, `AsTwoDigitMonth`, `AsFourDigitYear`, `AsRelativeDate`.
- **Generated string-literal unions** (4 errors): `Url`, `html/tag`, `Network-operators`, interpolation templates.

### Root cause confirmed by probes (2026-07-06): un-annotated generic runtime mirrors

Per-file compiler-API probes (checking only the probe file, mirroring how `typed` scopes
its work) isolated where the dominant test-suite cost actually lives — and it is **not**
in the type utilities themselves:

| Probe | Instantiations | Check time |
| --- | --- | --- |
| `DaysInMonth<"2024-02-28T12:00:00Z">` (worst type-level input) | 9,686 | 0.3 s |
| *All* type-only blocks of `daysInMonth.test.ts` together | 48,750 | 0.6 s |
| **One call** `daysInMonth("02", 2024)` (runtime mirror, un-annotated) | **1,673,688** | **39 s** |
| Same signature `declare`d with explicit `: DaysInMonth<TMonth, TYear>` | **3,584** | <1 s |
| `Increment.test.ts` before annotating `increment()` | **10,433,225** | 42.5 s |
| `Increment.test.ts` after one-line return annotation | **6,825** | 0.5 s |

Mechanism: a generic runtime mirror without a declared return type forces the checker to
**infer the return type from the function body**, evaluating every helper call
(`asTwoDigitMonth`, `isLeapYear`, `err`, `asNumber`, …) with *unresolved generic* type
arguments — the context where wide-input early-returns cannot fire and conditional types
distribute across whole constraint unions. Since the function already ends in
`as SomeUtility<T>`, adding the annotation is **behavior- and narrowness-identical**: call
sites get exactly the same type, and the body-inference cost disappears entirely.

**Population:** the runtime module exports 441 generic functions; **210 have no return
annotation** (inventory: `unannotated-runtime-functions-2026-07-06.txt`). Not all are
expensive — cost tracks how type-heavy the body's helpers are — but the worst test files
map directly onto this list.

**Exemplar fixes already applied** (one line each; all runtime + type tests pass with
unchanged assertions):

| Fix | Test-file effect |
| --- | --- |
| `daysInMonth()` annotated | 29.3 s / 4.1 GB → **4.4 s / 0.86 GB** |
| `increment()` annotated | 11.4 s / 2.8 GB → **0.5 s check** |
| `decrement()` annotated | 11.2 s / 2.8 GB → **0.35 s check** |
| **Full suite** after these three | 66 s / 6.16 GB → **23.5 s / 4.67 GB** |

This resolves the `DaysInMonth` concern **without any precision loss** — the
lose-precision fallback authorized for `daysInMonth` was not needed. The remaining
suite excess over the default heap is expected to fall further as the annotation audit
(W2) proceeds through the other 207 functions.

### Known expensive mechanisms (source-level survey)

- **`Test<...>` triple-instantiates `Assert<...>`** (`modules/types/src/assertions/Test.ts` ~lines 233–261): once inside `IsAny<...>`, once inside `IsNever<...>`, once as the result. This multiplies the cost of *every one of the 10,240 assertions*.
- **Recompute-in-false-branch pattern**: `TakeDate.WithContext` instantiates `Take<T>` three times (condition + both branches); `GetInputToken.Iterate` instantiates each of its ~14 `Process<IT_Take*<T>>` handlers twice. The fix idiom (bind once via `extends infer R` and branch on `R`) is already used elsewhere in the repo.
- **Cartesian template-literal unions**: `TwTarget__Color` ≈ 2,440 members (5 targets × 244 color-luminosity × `Opt<>` doubling); `FullTailwindColorClass` further multiplies by modifier orderings. `PhoneNumber`'s default shape multiplies `NumericChar` × delimiter × `Opt<>` template branches — while its actual validators are currently **commented out** (`Process<T>` ≈ identity), so the cost buys nothing.
- **Deep conditional dispatch + parse chains**: `DaysInMonth` is a ~10-level dispatch that funnels into the `ParseDate` → `TakeYear`/`TakeMonth`/`TakeDate` chain with branded shape validation and an 80-member `IsoModernDoubleLeap` union membership test.
- **Whole-module tracing is not viable**: `@typescript/analyze-trace` OOMs even at a 12 GB heap on the full-module trace. All trace-based work must be scoped to a single test file or `src` subdirectory.

## Goals and Acceptance Criteria

Every goal is measured by a command that exists (or is added in W1). "Baseline hardware" = the machine profile above; absolute numbers may be re-baselined once in W1, but *relative* targets stand.

- **G1 — Suite runs at default heap.** `pnpm test:types` **and the combined `just test` / `pnpm test`** (no `NODE_OPTIONS`, no heap flag) complete successfully. Peak RSS of the full type-test run ≤ **3.5 GB**. Wall time ≤ 60 s.
- **G2 — No pathological test files.** No single test file exceeds **5 s wall or 1.5 GB peak RSS** when run individually via `typed test <file>`. (Today: `daysInMonth` 29.3 s / 4.1 GB.)
- **G3 — Complexity-class source diagnostics reach zero.** `TS2589 + TS2590 + TS2859 + TS2321` across `modules/types` source: **75 → 0**. Any individual diagnostic that cannot be eliminated without sacrificing documented resolution behavior must instead be listed in a `deferred.md` in this feature directory with a per-symbol justification — an empty deferred list is the target, and the list may not exceed 5 entries.
- **G4 — Whole-module checking works.** Dedicated check-mode tsconfigs (W1) allow `tsc --noEmit` to complete for **each** of `constants`, `types`, `runtime` at the default Node heap; `modules/types` in ≤ 180 s. All non-complexity errors (TS2344/TS2304/TS2322/etc., including `modules/runtime/src/api/handleDoneFn.ts`) are fixed or explicitly deferred under the same rules as G3.
- **G5 — Resolution is retained.** All existing type-test assertions pass **unchanged**. Widening an assertion or a public utility's output type requires the same explicit documentation used in the phase-2 log ("Assertion Widenings"), and is acceptable only when the current narrow output is itself accidental (e.g. an `any` leak) or undocumented.
- **G6 — Regression guard exists.** A `just` recipe captures the suite's wall time, peak RSS, per-file timings (`typed test --metrics`), and complexity-diagnostic counts into a checked-in baseline file, and a companion recipe compares a fresh run against it. Regression = any complexity-class diagnostic reappearing, or suite peak RSS growing > 15 %.
- **G7 — Audits have a working path.** `just` recipes exist that produce localized source diagnostics for each module in ≤ 5 minutes at ≤ 8 GB heap, using the W1 check-mode tsconfigs with plain `tsc` (machine-readable via `--pretty false`). Whether `typed source` itself is also fixed is out of scope (see `tool-gaps.md`).

## Scope

1. **Measurement & config foundation (W1)** — check-mode tsconfigs, baseline capture, scoped-trace workflow, `just` recipes. This is a prerequisite for everything else and fixes the TS6305/TS5101/`baseUrl` config artifacts.
2. **Cross-cutting idiom fixes (W2)** — **runtime-mirror return-annotation audit first** (210 inventoried functions; the single highest-leverage class of fix, proven by the exemplars above); then `Test<...>` single-instantiation; then eliminate recompute-in-false-branch in measured hot paths.
3. **Hot-cluster remediation (W3–W6)** — numeric-literal arithmetic, datetime family, generated template-literal unions (Tailwind / Phone / Url / html-tag), lists & string-mutation recursion. Driven strictly by the diagnostics inventory and the slow-file list; each cluster is measured before and after.
4. **Source-error burn-down (W7)** — the ~118 non-complexity errors, including the runtime module's real errors, so that G4's "clean check" is meaningful.

### Out of scope

- **Fixing `typed-tester` itself.** Its gaps are documented in [`tool-gaps.md`](./tool-gaps.md) and treated as a separate, secondary exercise. This spec only requires that we stop *depending* on its broken paths (G7).
- New public APIs or behavioral changes to runtime functions.
- Type-performance work on the published `dist` artifacts / consumer-side `.d.ts` benchmarks (worth a future spec; noted in tool-gaps).
- The `deno.jsonc` / JSR publishing surface.

## Constraints and Policies (inherited from phase 2, still binding)

- **Runtime/type parity**: any type utility change must keep its runtime mirror aligned; affected runtime tests must stay green.
- **Existing-assertions floor**: no assertion is silently widened; every intentional widening is recorded with justification.
- **Escalation**: a fix requiring a new public API, a materially broader public type contract, intentional loss of narrow inference in an exported utility, or a runtime behavior change stops that slice and escalates for design review.
- **No TODO/FIXME markers**; no `any` cop-outs — an explicit, typed bail-out (e.g. returning a wide-but-correct type for wide inputs) is the sanctioned pattern, `any` leakage is not.
- **Preferred optimization patterns** (in priority order): **explicit return annotations on generic runtime mirrors** (the function's final cast type *is* the annotation — never let call sites trigger body inference); wide-input early return; bind-once via `infer` instead of re-instantiating; replace cartesian template unions with validation-shaped conditionals (`IsX<T>` checking rather than membership in a materialized union); phase-split large conditionals; bounded lookup tables only when small (≤ ~100 members).
- **New-code rule going forward**: every exported generic runtime function declares its return type explicitly. (Worth encoding as an ESLint `explicit-module-boundary-types`-style check once the audit lands.)

## Verification Commands

```sh
# suite health (must work with no heap flag after G1)
pnpm test:types

# per-file cost
node --max-old-space-size=8192 node_modules/typed-tester/bin/typed.js test <file> --metrics

# whole-module checks (check-mode configs created in W1)
just check-types      # tsc --noEmit over modules/types
just check-runtime
just check-constants

# complexity-diagnostic count (the G3 number)
just check-types 2>&1 | grep -cE "error TS(2589|2590|2859|2321)"

# regression guard
just perf-baseline    # capture
just perf-compare     # compare against checked-in baseline

# scoped tracing for a hotspot under investigation (never whole-module)
tsc --noEmit -p <check-config> --generateTrace <dir> ... && npx @typescript/analyze-trace <dir>
```

## Risks

- **Instantiation-context sensitivity.** A utility can be clean in a test file yet blow up in whole-module context (this is exactly what the 75 diagnostics show), and vice versa. Mitigation: G2 (test context) and G3/G4 (module context) are *both* acceptance gates; nothing closes on one gate alone.
- **Fix-one-regress-another.** The numeric, list, and string clusters share primitives (`FixedLengthArray`, `Chars`, `AsNumber`). Mitigation: the G6 regression guard is built in W1, *before* remediation begins, and every phase ends with a full-suite + full-check run.
- **TypeScript 6 behavior.** Some diagnostics (e.g. `TS5101`, stricter depth limits) are TS-6-era. The baseline pins TS 6.0.3; do not upgrade TS mid-feature.
- **Assertion-cost fix ripples everywhere.** Changing `Test<...>` touches every test transitively. It must land as its own isolated change with a full-suite before/after measurement and zero assertion-outcome changes.

## Open Questions

1. Is the 5-entry ceiling on the deferred list (G3/G4) acceptable, or should deferral be disallowed entirely?
2. `PhoneNumber`'s validators are commented out, so its expensive default shape currently buys no validation. Should W5 restore (bounded) validation, or simplify the shape and document the looser contract? Restoring validation is assumed unless overridden.
3. Should the G6 baseline file live in-repo (versioned, machine-dependent numbers) or in `features/` as a point-in-time artifact? In-repo with relative-threshold comparison is assumed.
