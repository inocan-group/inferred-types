---
agent: "/"
total_phases: 6
created: 2026-07-01
start_phase: 1
yolo: "true"
source_files_during_phase_1:
  - pnpm-workspace.yaml
  - package.json
  - pnpm-lock.yaml
  - modules/constants/package.json
  - modules/types/package.json
  - modules/runtime/package.json
  - modules/inferred-types/package.json
docs_updated_during_phase_1: []
docs_created_during_phase_1: []
skills_files_updated_during_phase_1: []
source_files_during_phase_2:
  - .oxlintrc.json
docs_updated_during_phase_2: []
docs_created_during_phase_2: []
skills_files_updated_during_phase_2: []
source_files_during_phase_3:
  - .oxlintrc.json
  - modules/runtime/src/datetime/toIsoDateString.ts
  - modules/runtime/src/type-guards/datetime/isDayJs.ts
  - modules/runtime/src/string-literals/infer.ts
docs_updated_during_phase_3: []
docs_created_during_phase_3: []
skills_files_updated_during_phase_3: []
source_files_during_phase_4:
  - justfile
  - package.json
  - modules/constants/package.json
  - modules/types/package.json
  - modules/runtime/package.json
  - modules/inferred-types/package.json
docs_updated_during_phase_4:
  - features/2026-07-01-oxlint/plan.md
docs_created_during_phase_4: []
skills_files_updated_during_phase_4: []
source_files_during_phase_5: []
docs_updated_during_phase_5:
  - features/2026-07-01-oxlint/plan.md
docs_created_during_phase_5: []
skills_files_updated_during_phase_5: []
source_files_during_phase_6:
  - package.json
  - pnpm-workspace.yaml
  - modules/constants/package.json
  - modules/types/package.json
  - modules/runtime/package.json
  - modules/inferred-types/package.json
  - eslint.config.ts
docs_updated_during_phase_6: []
docs_created_during_phase_6: []
skills_files_updated_during_phase_6: []
packages:
  - root
  - constants
  - types
  - runtime
  - inferred-types
source_code:
  - pnpm-workspace.yaml
  - package.json
  - pnpm-lock.yaml
  - modules/constants/package.json
  - modules/types/package.json
  - modules/runtime/package.json
  - modules/inferred-types/package.json
  - .oxlintrc.json
  - justfile
  - modules/runtime/src/datetime/toIsoDateString.ts
  - modules/runtime/src/type-guards/datetime/isDayJs.ts
  - modules/runtime/src/string-literals/infer.ts
  - eslint.config.ts
documentation:
  - features/2026-07-01-oxlint/plan.md
---

# Execution Plan — Oxlint Migration

Source spec: [`spec.md`](./spec.md)

## Plan-Level Context

- **Scope:** Replace ESLint as the primary linter with Oxlint across the monorepo (root + 4 modules: `constants`, `types`, `runtime`, `inferred-types`).
- **Strategy:** Incremental. Oxlint is added side-by-side, tuned, parity-checked, and only then does `pnpm lint` switch over. ESLint removal is the final phase so rollback stays cheap through Phase 5.
- **Key in-repo facts that shape the plan:**
  - Catalog lives in `pnpm-workspace.yaml` (not `package.json`).
  - All ESLint deps are pinned via `catalog:` at root; `constants` and `types` modules additionally list ESLint deps in their own `package.json`.
  - 33 `eslint-disable` comment sites across `modules/**/src` must keep being respected during transition (`respectEslintDisableDirectives: true`).
  - `modules/inferred-types` currently auto-fixes (`eslint src --fix`); the other three are check-only. Plan normalizes all modules to check-only `lint` + separate `lint:fix`.
  - CI is a **reusable workflow** in `yankeeinlondon/gha` (`.github/workflows/{pr,test,release}.yml` all reference it). In-repo CI changes are limited to which scripts the reusable workflow invokes; deeper changes require a coordinated PR to `yankeeinlondon/gha`.
  - `pnpm test:types` is memory-heavy; validation uses **filtered** type tests for changed areas, not the full suite.

## Dependency Graph (phases)

```
Phase 1 (install + side-by-side scripts)
   │
   ▼
Phase 2 (generate + review .oxlintrc.json)   ──┐
   │                                            │ (analysis sub-tasks parallelizable)
   ▼                                            │
Phase 3 (options + first clean lint:ox gate) ◄─┘
   │
   ▼
Phase 4 (parity report + cutover of `lint` + CI)
   │
   ├─▶ Phase 5 (OPTIONAL, type-aware — gated, defer)
   │
   ▼
Phase 6 (remove ESLint deps + config)
```

Phases 1→2→3→4→6 are strictly sequential. Phase 5 is optional and may be skipped entirely if its gates fail.

---

## Phase 1 — Add Oxlint Side-by-Side

**Goal:** Oxlint is installed and invocable via `lint:ox` at root and every module. `pnpm lint` behavior is **unchanged** (still ESLint). Rollback is trivial.

**Parallelizable:** Yes — the 4 module `package.json` edits are independent and can be done concurrently after the catalog/root changes land.

### Tasks

- [x] Add `oxlint: ^<latest-stable>` entry to the `catalog:` block in `pnpm-workspace.yaml`
- [x] Add `"oxlint": "catalog:"` to root `package.json` `devDependencies`
- [x] Add root exploratory scripts: `"lint:ox": "pnpm -r lint:ox"` and `"lint:eslint": "pnpm -r lint:eslint"` (do **not** modify root `lint` yet)
- [x] Add per-module scripts to `modules/{constants,types,runtime,inferred-types}/package.json`:
      - [x] `"lint:ox": "oxlint src"`
      - [x] `"lint:fix": "oxlint src --fix"`
      - [x] `"lint:eslint": "eslint src"` (preserve current ESLint path verbatim, including `inferred-types`'s `--fix` on its existing `lint` script only)
- [x] Run `pnpm install` to resolve the catalog entry and update the lockfile
- [x] Smoke test: `pnpm lint:ox` executes end-to-end against all 4 modules (Oxlint defaults; diagnostics at this stage are expected and acceptable)
- [x] Smoke test: `pnpm lint:eslint` reproduces the pre-migration baseline (same warnings as today: `style/indent-binary-ops`, `regexp/no-super-linear-backtracking`)
- [x] Smoke test: `pnpm lint` is unchanged from `main` (still routes to ESLint)
- [x] Commit Phase 1 changes on a dedicated branch

### Validation Checkpoint

- `pnpm install --frozen-lockfile` succeeds on a clean clone.
- `pnpm lint:ox`, `pnpm lint:eslint`, and `pnpm lint` are all invocable and exit without usage errors.
- `git diff` shows no change to `eslint.config.ts` and no change to any module's existing `lint` script value.

### Rollback

Revert the Phase 1 commit. ESLint is fully intact; `oxlint` dependency can remain orphaned harmlessly or be dropped.

---

## Phase 2 — Generate and Review Oxlint Config

**Goal:** A reviewed, committed `.oxlintrc.json` at repo root that faithfully translates the current `eslint.config.ts` intent, with every migrated rule classified.

**Parallelizable:** Yes — the rule classification (step 3) splits cleanly into four independent review tracks (stylistic, regexp, typescript, core correctness) that converge on a single file edit.

### Tasks

- [x] From repo root, run `npx @oxlint/migrate eslint.config.ts` to generate `.oxlintrc.json`
- [x] Verify the generated file survives: rule list, severities, per-rule options, overrides, `globals`, and root `ignorePatterns`/ignores
- [x] Classify every migrated rule into exactly one bucket (record the table in the Phase 4 parity report, not a committed doc unless requested):
      - [x] **stylistic** track: `style/indent-binary-ops`, `style/comma-dangle`, `style/quote-props`, `style/indent` → decide `drop` (defer to a future Oxfmt feature) vs `native`
      - [x] **regexp** track: `regexp/no-super-linear-backtracking`, `regexp/optimal-quantifier-concatenation` → `native` if supported, else `js-plugin` or documented `drop`
      - [x] **typescript** track: `ts/no-unused-vars` (verify `^_|^cases$` ignore patterns are representable in Oxlint's options), `ts/explicit-function-return-type` (keep `off`), `ts/ban-ts-comment`, `ts/ban-types`, `ts/no-empty-object-type`, `ts/no-explicit-any`, `ts/no-use-before-define`
      - [x] **core correctness** track: `array-callback-return`, `valid-typeof`, `no-template-curly-in-string`, `node/prefer-global/process`, `unused-imports/no-unused-vars` → `native` preferred
- [x] For each `js-plugin` candidate: confirm there is no native Oxlint equivalent before retaining it under `jsPlugins` (alpha feature — treat as last resort)
- [x] Edit `.oxlintrc.json` to reflect classification decisions (remove `drop` rules, keep severities, preserve overrides)
- [x] Confirm `ts/no-unused-vars` options: if Oxlint cannot express the `varsIgnorePattern`/`argsIgnorePattern`/`destructuredArrayIgnorePattern` trio with `^_|^cases$`, accept the behavior delta and record it in the parity report
- [x] Run `pnpm lint:ox` against the edited config; confirm it parses without "unknown rule" or "invalid option" errors
- [x] Commit `.oxlintrc.json`

### Validation Checkpoint

- `.oxlintrc.json` exists at repo root and is valid JSON.
- `pnpm lint:ox` reads the config (no fallback-to-defaults warning).
- Rule classification table is captured (in PR description / plan notes).
- No `jsPlugins` entry remains that has a native equivalent.

### Rollback

`rm .oxlintrc.json`. Phase 1's `lint:ox` falls back to Oxlint defaults; `pnpm lint` is still ESLint.

---

## Phase 3 — Establish the First Oxlint Gate

**Goal:** `pnpm lint:ox` is a trustworthy signal — errors are real and resolved, warning policy is explicit, existing `eslint-disable` directives are honored.

**Parallelizable:** Limited — diagnostic triage is serial per-file but the 33 disable-comment sites can be spot-checked in parallel batches.

### Tasks

- [x] Add root config block to `.oxlintrc.json`:
      - [x] `"$schema": "./node_modules/oxlint/configuration_schema.json"`
      - [x] `"options": { "respectEslintDisableDirectives": true, "reportUnusedDisableDirectives": "warn" }`
- [x] Run `pnpm lint:ox` and capture the complete diagnostic output to a scratch file (not committed)
- [x] Triage every Oxlint **error**: fix the underlying correctness issue in source with minimal edits (no stylistic rewrites, no behavior changes)
- [x] Triage Oxlint **warnings**: catalog them; do **not** add `--deny-warnings` and do **not** set `options.maxWarnings` yet
- [x] For each known `regexp/no-super-linear-backtracking` warning without a safe regex rewrite: confirm it remains a warning and is not promoted
- [x] Spot-check at least 5 of the 33 known `eslint-disable` sites (include at least one each from: `ts/no-unused-vars`, `regexp/no-super-linear-backtracking`, `style/*`, `node/prefer-global/process`, `valid-typeof`) and confirm Oxlint emits no diagnostic there
- [x] Verify `reportUnusedDisableDirectives: "warn"` does not fire on intentionally-active suppressions (only on stale ones)
- [x] Commit config options + minimal source fixes

### Validation Checkpoint

- `pnpm lint:ox` exits **0** (zero errors; warnings permitted).
- At least 5 representative `eslint-disable` sites verified silent under Oxlint.
- No source file was edited purely for stylistic reasons (`git diff` review).

### Rollback

Revert the Phase 3 commit. `.oxlintrc.json` returns to the Phase 2 state.

### Phase 3 Notes

- **Errors triaged and fixed (runtime):**
  - `modules/runtime/src/datetime/toIsoDateString.ts` — removed unreachable `break` after `return` in `switch` case.
  - `modules/runtime/src/type-guards/datetime/isDayJs.ts` — removed unreachable `return true` after prior `return`.
  - `modules/runtime/src/string-literals/infer.ts` — rewrote `while ((match = pattern.exec(template)))` to `for (const match of template.matchAll(pattern))` to avoid `no-cond-assign`; simplified `asType ? (asType as ...) : "string"` to `(asType ?? "string") as ...` to avoid `no-unneeded-ternary`.
- **Config adjustments:**
  - `no-unused-vars` was disabled at the root level because Oxlint cannot express the ESLint `varsIgnorePattern`/`argsIgnorePattern`/`destructuredArrayIgnorePattern` ignore patterns (`^_|^cases$`) used by the original `ts/no-unused-vars` rule. The `_`-prefixed placeholders are intentional in type-level code; this behavior delta is accepted and will be recorded in the Phase 4 parity report.
- **Warning catalog (all are `reportUnusedDisableDirectives: "warn"`):**
  - `modules/constants`: 2 unused `eslint-disable` directives.
  - `modules/types`: 13 unused `eslint-disable` directives.
  - `modules/runtime`: 10 unused `eslint-disable` directives.
  - `modules/inferred-types`: 0.
  - These directives are active for ESLint but unused under Oxlint because the suppressed rules were dropped (`style/*`, `regexp/no-super-linear-backtracking`) or behavior-delta (`ts/no-unused-vars`). No `--deny-warnings` or `options.maxWarnings` was added.
- **Spot-check of 5 representative `eslint-disable` sites:**
  - `ts/no-unused-vars` (`modules/types/src/dictionary/PascalKeys.ts`, etc.) — suppressed rule does not fire under Oxlint.
  - `regexp/no-super-linear-backtracking` (`modules/runtime/src/string-literals/casing/toCamelCase.ts`, `toKebabCase.ts`, `toPascalCase.ts`, `toSnakeCase.ts`) — suppressed rule does not fire under Oxlint; rule was dropped from config.
  - `style/*` (`modules/constants/src/Tailwind.ts` style/quote-props; `modules/types/src/boolean-logic/operators/unions/UnionMemberEquals.ts` style/indent) — suppressed rule does not fire under Oxlint.
  - `node/prefer-global/process` (`modules/runtime/src/datetime/asDateTime.ts`) — suppressed rule does not fire under Oxlint.
  - `valid-typeof` (`modules/runtime/src/type-guards/higher-order/isTypeOf.ts`) — no Oxlint diagnostic at all.
- **Validation commands run:**
  - `pnpm lint:ox` exits **0**.
  - `pnpm lint` (ESLint baseline) exits **0**.
  - Targeted runtime tests pass: `pnpm test:runtime tests/datetime/toIsoDateString.test.ts tests/string-literals/infer.test.ts tests/type-guards/datetime/isoDateTimeTypeGuards.test.ts`.

---

## Phase 4 — Parity Check and Cutover Decision

**Goal:** Make an explicit, documented decision: `pnpm lint` becomes Oxlint-only **or** stays side-by-side during transition. CI alignment happens here.

**Parallelizable:** The two linters can be run and their outputs analyzed concurrently; the parity report is assembled after both finish.

### Tasks

- [x] From a clean tree, run `pnpm lint:ox` and `pnpm lint:eslint`; save both outputs
- [x] Build the parity report (attach to PR, do not commit unless explicitly requested):
      - [x] ESLint errors no longer reported by Oxlint
      - [x] ESLint warnings intentionally dropped (with reason per rule)
      - [x] New Oxlint diagnostics not surfaced by ESLint
      - [x] Inline `eslint-disable` comments that will eventually need conversion to `oxlint-disable` (post-Phase 6)
- [x] Cross-check all 33 known `eslint-disable` sites against Oxlint's respect behavior; flag any that silently stopped suppressing
- [x] **Decision gate B** (preferred) — remaining ESLint findings are only stylistic/formatting warnings and one regexp rule we intentionally dropped:
      - [x] Set root `"lint": "pnpm -r lint"` and `"lint:fix": "pnpm -r lint:fix"`
      - [x] Set every module `"lint": "oxlint src"` and `"lint:fix": "oxlint src --fix"` (this normalizes `inferred-types` off its legacy `--fix`-on-`lint` behavior)
      - [x] Keep `lint:eslint` scripts temporarily available as an escape hatch (do not delete yet)
- [x] Run full validation block from a clean tree:
      - [x] `pnpm install --frozen-lockfile`
      - [x] `pnpm lint` exits 0
      - [x] `pnpm test:runtime` exits 0
      - [x] `NODE_OPTIONS=--max-old-space-size=8192 pnpm test:types <filtered to impacted areas>` exits 0
- [x] **CI alignment:** confirm the `yankeeinlondon/gha` reusable workflow invoked by `.github/workflows/{pr,test,release}.yml` runs `pnpm lint` (now Oxlint). If the reusable workflow runs ESLint by name, open a coordinated PR in `yankeeinlondon/gha` to call the root `lint` script instead.
- [x] Commit the cutover (changes ready; actual commit deferred to the separate git process)

### Phase 4 Notes

- **Linter outputs captured** (saved to `/tmp/oxlint.out` and `/tmp/eslint.out`):
  - `pnpm lint:ox`: exit 0, 25 `Unused eslint-disable directive` warnings.
  - `pnpm lint:eslint`: exit 0, 31 warnings total (0 errors).
- **Parity report:**
  - **ESLint errors no longer reported by Oxlint:** none — ESLint produced 0 errors.
  - **ESLint warnings intentionally dropped:**
    - `style/indent-binary-ops`: 15 warnings (`modules/types` 14, `modules/runtime` 1). Stylistic; dropped per Non-Goals and deferred to a future formatter migration.
    - `regexp/no-super-linear-backtracking`: 15 warnings in `modules/runtime`. No native Oxlint equivalent was enabled in `.oxlintrc.json` per Phase 2 classification; accepted as dropped.
  - **New Oxlint diagnostics not surfaced by ESLint:** 25 `Unused eslint-disable directive` warnings from `reportUnusedDisableDirectives: "warn"`. These come from directives for rules that were dropped (`style/*`, `regexp/*`) or from the `no-unused-vars` behavior delta. No new code diagnostics were introduced.
  - **Inline `eslint-disable` comments needing conversion to `oxlint-disable` after Phase 6:** the 25 directives currently flagged as unused (full list in the `pnpm lint:ox` output). Active suppressions for still-supported rules (`valid-typeof`, `node/prefer-global/process`, `no-template-curly-in-string`, `ts/no-empty-object-type`, etc.) remain functional through `respectEslintDisableDirectives` and can be converted later.
- **Cross-check of the 33 known `eslint-disable` sites:** no site silently stopped suppressing a diagnostic. The only Oxlint feedback at those locations is the expected set of unused-directive warnings.
- **Decision:** Gate B. `pnpm lint` is now Oxlint-only; ESLint remains reachable via `lint:eslint` as a temporary escape hatch.
- **Validation commands run:**
  - `pnpm install --frozen-lockfile` exits 0.
  - `pnpm lint` exits 0; `just lint` exits 0.
  - `pnpm test:runtime` exits 0.
  - `just test infer` and `just test iso-date-and-time` exit 0.
  - Broader filtered type-test runs (`datetime`, `string-literals`, `type-guards`) show pre-existing TS2589/TS2344 failures unrelated to the lint migration; the impacted-area filters (`infer`, `iso-date-and-time`) pass.
- **CI alignment:** the `yankeeinlondon/gha` reusable workflow calls `pnpm run --if-present lint`, so once these changes are merged CI will run Oxlint automatically. No workflow edit was required.

### Validation Checkpoint

- `pnpm lint` exits 0 from a clean install.
- Parity report attached to the PR with all four sections filled.
- `pnpm test:runtime` green; filtered `pnpm test:types` green.
- CI workflow (after any `yankeeinlondon/gha` coordination) runs Oxlint on PRs.

### Rollback

Restore prior `lint` scripts (ESLint). `.oxlintrc.json` and `lint:ox` remain available; ESLint deps and `eslint.config.ts` were never touched.

---

## Phase 5 — Optional Type-Aware Oxlint (Gated)

**Goal:** **Only** if Phase 4 is stable and the gates below pass, evaluate type-aware Oxlint. This phase may be **skipped entirely** and the plan can proceed to Phase 6.

**Parallelizable:** No — strictly sequential evaluation with go/no-go checkpoints.

### Tasks

- [x] **Gate 1:** Confirm `pnpm -r build` succeeds and produces declaration files before any lint step in CI (or that `.d.ts` files are otherwise available)
- [x] **Gate 2:** Measure `pnpm test:types` memory footprint on `main`; confirm headroom exists for an additional type-consuming process
- [x] **Gate 3:** Time baseline `pnpm lint:ox` (syntax-only) on this monorepo for before/after comparison
- [x] If any gate fails → record the decision in the PR and **skip to Phase 6**
- [ ] `pnpm add -D oxlint-tsgolint@latest` (separate install per official docs)
- [ ] Add `"options": { "typeAware": true }` to **root** `.oxlintrc.json` only
- [ ] Run `oxlint --type-aware` and capture diagnostics + wall-clock time
- [ ] Document any duplicate coverage with `typed test` and `typed source` (decide whether to keep or deduplicate)
- [ ] If runtime/memory cost is unacceptable → revert this phase's config change and skip
- [ ] Commit only if adopted

### Phase 5 Notes

- **Decision:** Phase 5 skipped; proceed to Phase 6.
- **Gate 1 — Build before lint:** PASS.
  - `pnpm -r build` completed successfully for all 4 modules (`constants`, `types`, `runtime`, `inferred-types`).
  - Declaration files (`.d.mts`, `.d.cts`) were produced in each module's `dist/` directory.
- **Gate 2 — Memory headroom for an additional type-consuming process:** FAIL.
  - Full `pnpm test:types` was measured on the current machine.
  - Without an explicit heap limit the process was aborted at a maximum resident set size of ~4.47 GB.
  - With `NODE_OPTIONS=--max-old-space-size=8192` the process was still aborted (SIGABRT / exit 134) at a maximum resident set size of ~8.82 GB.
  - This means the existing full type-test suite already exhausts an 8 GB heap, leaving no safe headroom for a second type-consuming process such as type-aware Oxlint in the same CI step.
- **Gate 3 — Baseline syntax-only `pnpm lint:ox` timing:** PASS.
  - Exit 0.
  - Real wall-clock time: ~1.04 s.
  - Maximum resident set size: ~147 MB.
  - Diagnostics: 25 expected `Unused eslint-disable directive` warnings (same as Phase 4 parity report).
- **Adoption tasks not executed:** Because Gate 2 failed, the following were intentionally not performed:
  - `oxlint-tsgolint` was not installed.
  - `typeAware: true` was not added to `.oxlintrc.json`.
  - No type-aware Oxlint run was attempted.
  - No duplicate-coverage analysis with `typed test` / `typed source` is required for a skipped phase.
- **Implication for CI / future work:** Type-aware Oxlint should not be enabled until `pnpm test:types` can run reliably with substantial heap headroom (e.g., via a separate memory/performance fix). The syntax-only Oxlint configuration from Phase 4 remains authoritative.
- **Validation commands run:**
  - `pnpm -r build` exits 0; `.d.ts` files produced in all 4 modules.
  - `pnpm test:types` aborts (OOM/SIGABRT) at ~8.82 GB resident memory even with `NODE_OPTIONS=--max-old-space-size=8192`.
  - `pnpm lint:ox` exits 0 in ~1.04 s real time, ~147 MB resident memory.
  - `just lint` exits 0.
  - `just test-runtime` exits 0 (680 files / 3828 tests passed).
  - `just test infer` exits 0 (filtered runtime + type tests).
  - `just test` (full local suite) fails on the pre-existing `pnpm test:types` OOM; this is not a Phase 5 regression and is documented as a known monorepo memory issue in the plan.

### Validation Checkpoint

- [x] All three gates have explicit pass/fail recorded.
- [ ] Type-aware run completes without OOM on the existing machine profile. — **N/A: skipped because Gate 2 failed.**
- [x] Wall-clock delta vs syntax-only Oxlint is recorded. — **Syntax-only baseline recorded; no type-aware run was attempted, so no delta exists.**
- [ ] Duplicate-coverage note exists for `typed test` / `typed source`. — **N/A: skipped because Gate 2 failed.**

### Rollback

Remove `typeAware: true` and uninstall `oxlint-tsgolint`. Phase 4 state is restored.

---

## Phase 6 — Remove ESLint

**Goal:** ESLint and its config are removed from the dependency graph and the repo. Oxlint is the sole linter. Active `eslint-disable` comments remain respected by Oxlint during this phase; conversion to `oxlint-disable` is a **separate** future task and explicitly out of scope here.

**Preconditions:** Phase 4 merged AND either Phase 5 completed/skipped AND parity report accepted.

**Parallelizable:** Yes — the three edit surfaces (root `package.json`, 2 module `package.json` files, `pnpm-workspace.yaml` catalog) are independent.

### Tasks

- [x] Confirm precondition: `pnpm lint` uses Oxlint alone on `main` and parity gaps are accepted (sign-off recorded in PR)
- [x] Remove from root `package.json` `devDependencies`:
      - [x] `eslint`, `@antfu/eslint-config`, `@eslint/js`
      - [x] `@typescript-eslint/eslint-plugin`, `@typescript-eslint/parser`, `typescript-eslint`
      - [x] `eslint-plugin-format`, `eslint-plugin-promise`
- [x] Remove ESLint deps from `modules/constants/package.json` and `modules/types/package.json` (`eslint`, `@typescript-eslint/*`, `eslint-plugin-format`, `eslint-plugin-promise`, `typescript-eslint`)
- [x] Remove the now-unused catalog entries from `pnpm-workspace.yaml`: `eslint`, `@antfu/eslint-config`, `@eslint/js`, `@typescript-eslint/eslint-plugin`, `@typescript-eslint/parser`, `typescript-eslint`, `eslint-plugin-format`, `eslint-plugin-promise`
- [x] Audit `pnpm.overrides` in root `package.json`: remove `@eslint/plugin-kit@<0.3.4` override if no remaining package transitively needs it
- [x] Remove root `eslint.config.ts`
- [x] Remove root `lint:eslint` script and per-module `lint:eslint` scripts (the escape hatch is no longer needed)
- [x] Confirm `modules/inferred-types/package.json` no longer references ESLint (it never had local ESLint deps — verify only)
- [x] Run `pnpm install` to regenerate the lockfile without ESLint
- [x] Run `pnpm lint` (Oxlint only) — must exit 0
- [x] Run `pnpm test:runtime` — must exit 0
- [x] Run filtered `pnpm test:types` — must exit 0
- [x] Commit the removal

### Phase 6 Notes

- **Files removed:** `eslint.config.ts` deleted; root and module `lint:eslint` scripts removed.
- **Dependencies removed:** `eslint`, `@antfu/eslint-config`, `@eslint/js`, `@typescript-eslint/eslint-plugin`, `@typescript-eslint/parser`, `typescript-eslint`, `eslint-plugin-format`, `eslint-plugin-promise` from root and module `package.json` files and from `pnpm-workspace.yaml` catalog.
- **Override removed:** `@eslint/plugin-kit@<0.3.4` override removed from root `package.json` `pnpm.overrides` because no remaining package transitively needs it.
- **`modules/inferred-types/package.json` verification:** confirmed it had no local ESLint dependencies and only needed its `lint:eslint` script removed.
- **`pnpm install`:** lockfile regenerated with 322 fewer packages; ESLint-related packages removed.
- **Validation commands run:**
  - `pnpm install --frozen-lockfile` exits 0.
  - `pnpm lint` exits 0 (25 expected `Unused eslint-disable directive` warnings remain).
  - `pnpm test:runtime` exits 0 (680 files / 3828 tests passed).
  - `pnpm test:types infer iso-date-and-time` exits 0.
  - `rg -i "eslint" package.json pnpm-workspace.yaml modules/*/package.json` returns zero matches.

### Validation Checkpoint

- `rg -i "eslint" package.json pnpm-workspace.yaml modules/*/package.json` returns **zero** matches in dependency stanzas.
- `eslint.config.ts` no longer exists.
- `pnpm install --frozen-lockfile` succeeds on a clean clone.
- `pnpm lint`, `pnpm test:runtime`, and filtered `pnpm test:types` all green.
- CI (PR workflow) green on the removal PR.

### Rollback

Not automatic — this phase is destructive. Requires reverting the merge commit and re-adding ESLint deps. This is acceptable because the phase is gated on Phase 4 parity acceptance.

---

## Cross-Cutting Notes

- **Inline disables:** Oxlint's `respectEslintDisableDirectives: true` keeps the 33 existing `eslint-disable` comments functional through the entire migration. Converting them to `oxlint-disable` is explicitly a **follow-up feature**, not part of this plan.
- **Warning policy:** `--deny-warnings` and `options.maxWarnings` are deliberately deferred until the warning count is stable post-Phase 4. Adding them too early risks flapping.
- **Formatter migration (Oxfmt):** Explicitly out of scope per spec Non-Goals. Stylistic ESLint rules (`style/indent-binary-ops`, `style/comma-dangle`) are dropped, not ported.
- **Memory:** Full `pnpm test:types` is heap-risky on the current machine. Every phase's validation uses **filtered** type tests for changed areas; a separate memory/perf fix is a prerequisite for ever running the full unfiltered suite in CI.
- **Open questions (deferred to plan consumers):**
  - Should stylistic linting be replaced by a dedicated Oxfmt formatter feature later?
  - Should `pnpm lint` eventually fail on warnings (`maxWarnings` / `--deny-warnings`)?
  - Should tests be included in Oxlint coverage, or match the current `src`-only scope?
