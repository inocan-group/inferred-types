---
title: Tooling Gaps — Type Validity & Performance Evaluation
date: 2026-07-06
status: informational
scope: secondary exercise — none of these block the spec; the spec routes around them
tools:
  - typed-tester@0.13.2 (the `typed` CLI)
  - "@typescript/analyze-trace"
  - repo scripts / docs
---

# Tooling Gaps

Observed while evaluating the tooling for `features/2026-07-02-complex/spec.md`.
Everything here was reproduced on 2026-07-06 (TS 6.0.3, Node 22.20.0). Per the
feature's direction, these are documented for a **separate tooling exercise**;
the spec's plan deliberately works around them rather than fixing them.

## `typed` CLI (typed-tester@0.13.2)

### 1. `typed source` scaling makes the audits unusable

- `typed source -c modules/constants/tsconfig.json` (57 files): **~1 s**. ✅
- `typed source -c modules/types/tsconfig.json` (1,214 files): OOMs at default heap;
  at a **12 GB** heap it completes but takes **881 s (~14.7 min)**.
- Plain `tsc --noEmit` on the same config produces equivalent diagnostics in roughly
  the same class of time/heap — so the tool adds a large constant factor on top of an
  already-expensive check rather than the localized, incremental analysis it aims for.
- Impact: `pnpm audit:types` / `pnpm audit:runtime` are effectively dead commands.
- Note: its final summary (errors by code, `--json` support) is genuinely useful —
  the 197-error inventory in the spec came from it. The per-file detail, however, is
  only in the streamed output, and there is no way to sort/limit (the README's
  `--only-top=10` belongs to a `diagnostics` command that doesn't exist; see #3).

### 2. No heap management for its own workload

`typed test` on this repo needs ~6.2 GB but the CLI neither raises its own
`max-old-space-size`, chunks the work, nor warns on impending OOM — it just dies with
a V8 stack trace. Today `pnpm test:types` (default heap) crashes while the justfile
recipe (manual 8 GB flag) works. A `--heap` option, a self-re-exec with a larger
heap, or per-file worker processes would all fix this class of failure.

### 3. README / CLI drift

- README documents `typed diagnostics`, `typed graph`, `typed coverage` — **none exist**.
  Actual commands: `test | deps | source | symbols | files | imports` (several undocumented).
- `--help` output is truncated mid-option (e.g. `typed test --help` ends at
  `--files  l`), and `typed test --help` **exits 1**.
- README references cache flags (`--clear`) and behaviors that can't be verified
  against the actual option list (`show-passing, ignore-outside, files, slow,
  only-errors, show-symbols, metrics, filter, graph, clear-cache, depth, runtime,
  types, case-sensitive, clear, external, deep, config, json, quiet, verbose, warn`).

### 4. Filter/scoping problems in the exploratory commands

- `typed deps <filter>` / `typed symbols <filter>` scan **all 2,505 files** reachable
  from the *root* `tsconfig.json` — including `scripts/`, `.claude/hooks/`, and config
  files — with progress spam every 25 files. There is no `-c <tsconfig>` scoping on
  these commands (only `source` has it), so module-scoped dependency queries aren't possible.
- `typed files <filter>` appears to **ignore the filter entirely** (returns
  `vitest.config.ts`, `scripts/view-metrics.ts`, `.claude/hooks/*`, … for
  `typed files AfterFirstChar`).

### 5. Slow-file reporting is binary

The end-of-run "7 slow files detected" list has no timings, no threshold, and no
configurability. Per-file timing exists behind `--metrics`, but there is no
machine-readable output for `test` runs (the `--json` flag is only honored by
`source`), so a CI perf-regression gate can't be built directly on the runner.
This forced the spec's G6 guard to wrap the CLI in `/usr/bin/time` + `--metrics`
scraping instead.

### 6. Cache freshness is opaque

`.dependencies.json` (4.2 MB) in the repo root is dated **2025-10-18** and its
companion `.symbols.json` is absent. There's no `typed cache status` /
staleness reporting, so it's unclear whether runs use stale symbol graphs. Given the
docs' own advice ("if you're ever feeling uncertain … `--clear`"), a cache-info
command and automatic staleness detection would materially increase trust. Also
worth deciding: neither cache file is in `.gitignore` today.

### 7. Program construction fights the monorepo's project references

`typed source -c modules/types/tsconfig.json` reports **57 × TS6307**
("file not listed within the file list of project") and the underlying tsc run
emits **103 × TS6305** ("output file has not been built") because the modules'
tsconfigs use `composite` + `references` while dist is built by tsdown, not tsc.
Not strictly the tool's fault — but the tool has no way to override/relax project
references, so it inherits the breakage. (The spec's Phase 1 introduces
`tsconfig.check.json` files that sidestep this for both `tsc` and `typed`.)

### 11. No standard way to scope `tsc` diagnostics to one file

`tsc -p` always type-checks **every file in the program**, so a "probe" file importing
the `inferred-types/types` barrel pays the full whole-module cost (~13 min) even when
you only care about the probe. This is what makes `typed`'s scoped checking valuable —
and why this feature ships `measure-file.mjs` (in this directory): a ~40-line
compiler-API harness that builds the program but requests diagnostics for a single
target file, reporting check time, instantiation count, type count, and heap. It was
the tool that isolated the runtime-mirror annotation root cause. Worth folding into
`typed` as a `typed measure <file>` command.

## `@typescript/analyze-trace`

### 8. Whole-module traces are un-analyzable

A `--generateTrace` capture of the full `modules/types` check produces a trace that
`analyze-trace` cannot process even with a **12 GB** heap (OOM after ~8 min). Scoped
traces (single test file / single `src` subdirectory) work fine. Practical rule
adopted by the spec: **never trace whole modules**. A future improvement would be a
streaming analyzer or trace-splitting helper.

## Repo scripts & docs

### 9. `docs/type-performance.md` is partially fictional

References `./scripts/detect-regressions.sh` (doesn't exist), `typed test --filter X`
/ `--verbose` semantics that don't match the CLI, and a `traces/` layout
(`analysis.json`, `latest ->` symlink) that doesn't exist. `scripts/benchmark-performance.sh`
and `benchmark-types.sh` are stale one-off experiments that generate throwaway
comparison files rather than measuring current reality. Plan Phase 1 rewrites this doc.

### 10. Module tsconfigs contain latent breakage

Not a tool per se, but it breaks every tool downstream:

- `modules/runtime/tsconfig.json` uses `baseUrl` → hard error **TS5101** under TS 6
  ("will stop functioning in TypeScript 7.0") the moment build-info reuse doesn't
  short-circuit the run.
- `modules/types/tsconfig.json` has a malformed-looking `include` entry
  (`"src/string-literals/character-sets/Opt"`) and a stray key inside a `references`
  entry; `modules/runtime` includes `.drop`/`.hold` files.
- Consequence measured: `tsc -p modules/runtime --noEmit` returns config errors or
  ~500 × TS6305 and never a real check — the runtime module currently has **no
  working vanilla-tsc validation path**. (Fixed by spec Phase 1 via check-mode configs.)

## What already works well (keep)

- `typed test` as a runner: green-suite detection, assertion counting, per-file
  `--metrics`, filtering by path fragment — all solid and fast per-file.
- `typed source --json` summary (error-code histogram) — used to build this feature's inventory.
- The AST/symbol-graph caching *concept* is the right shape for this repo's problem;
  the gaps above are implementation maturity, not design.

## Suggested priority for a future tooling exercise

1. Heap management / worker isolation for `typed test` (#2) — removes the OOM class entirely.
2. Machine-readable `typed test` output + timed slow-file report (#5) — enables a real CI perf gate.
3. `typed source` scaling (#1) — incremental/per-directory analysis instead of one giant program.
4. Scoping (`-c`) and filter fixes for `deps`/`symbols`/`files` (#4).
5. README/help truth-up (#3) and cache introspection (#6).
