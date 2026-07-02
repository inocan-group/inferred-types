---
agent: "/"
total_phases: 6
created: 2026-07-01
start_phase: 1
yolo: "true"
source_files_during_phase_1: []
docs_updated_during_phase_1:
  - features/2026-07-01-type-complexity/plan.md
docs_created_during_phase_1:
  - .ai/logs/type-complexity-phase1-isolation-log.md
skills_files_updated_during_phase_1: []
source_files_during_phase_2:
  - modules/types/src/boolean-logic/operators/datetime/IsLeapYear.ts
docs_updated_during_phase_2:
  - features/2026-07-01-type-complexity/plan.md
  - .ai/logs/type-complexity-phase1-isolation-log.md
docs_created_during_phase_2: []
skills_files_updated_during_phase_2: []
source_files_during_phase_3: []
docs_updated_during_phase_3:
  - features/2026-07-01-type-complexity/plan.md
  - .ai/logs/type-complexity-phase1-isolation-log.md
docs_created_during_phase_3: []
skills_files_updated_during_phase_3: []
source_files_during_phase_4: []
docs_updated_during_phase_4:
  - features/2026-07-01-type-complexity/plan.md
  - .ai/logs/type-complexity-phase1-isolation-log.md
docs_created_during_phase_4:
  - features/2026-07-01-type-complexity/escalation-isleapyear-redesign.md
skills_files_updated_during_phase_4: []
source_files_during_phase_5: []
docs_updated_during_phase_5:
  - features/2026-07-01-type-complexity/plan.md
docs_created_during_phase_5:
  - features/2026-07-01-type-complexity/stage2-findings.md
skills_files_updated_during_phase_5: []
packages:
  - modules/types
source_files_during_phase_6: []
docs_updated_during_phase_6:
  - features/2026-07-01-type-complexity/spec.md
  - features/2026-07-01-type-complexity/plan.md
  - .ai/logs/type-complexity-phase1-isolation-log.md
docs_created_during_phase_6:
  - features/2026-07-01-type-complexity-phase2/spec.md
skills_files_updated_during_phase_6: []
source_code:
  - modules/types/src/boolean-logic/operators/datetime/IsLeapYear.ts
documentation:
  - features/2026-07-01-type-complexity/plan.md
  - .ai/logs/type-complexity-phase1-isolation-log.md
  - features/2026-07-01-type-complexity/escalation-isleapyear-redesign.md
  - features/2026-07-01-type-complexity/stage2-findings.md
  - features/2026-07-01-type-complexity/spec.md
  - features/2026-07-01-type-complexity-phase2/spec.md
---

# Execution Plan — Type Complexity Stabilization (Phase 1)

Source spec: [`spec.md`](./spec.md)

## Plan-Level Context

- **Scope:** Restore `just test-types` to a non-crashing state across the full `tests/` tree, then produce a written diagnosis (no fixes) for the directories that still surface type errors.
- **Strategy:** Two-stage. Stage 1 isolates and stabilizes every crashing file (test-file-level fixes preferred; shared-utility root causes escalated, not silently patched). Stage 2 produces a findings report per type-error directory that a follow-up Phase 2 feature will act on.
- **Crash definition (from spec):** Any failure mode that prevents `just test-types` from completing normally — process exit, OOM, TypeScript stack overflow / "infinite instantiation depth", hang, or timeout.
- **Fidelity floor (Q3 decision):** Existing assertions are the floor. Widening is allowed only to stop a crash, must be recorded as an explicit test/expectation change with justification, and any broken assertion must be documented.
- **Hybrid-with-escalation (Q1 decision):** Test-file fixes first. If a shared utility in `modules/types/src/` (or elsewhere) must change to stop a crash, preserve runtime/type parity and open a separate design-review escalation for the underlying fix.
- **Key in-repo facts that shape the plan:**
  - Type tests run via the custom `typed` CLI: `just test-types` → `node_modules/.bin/typed test`. Per-directory filtering is supported (e.g. `typed test datetime`).
  - Crash directories identified in the spec: `tests/boolean-logic` (specifically `tests/boolean-logic/operators`) and `tests/datetime`.
  - Type-error directories identified in the spec (Stage 2 scope, **no fixes**): `tests/domains`, `tests/literals`, `tests/take`, `tests/interpolation`, `tests/type-conversions`, `tests/types`, and `tests/boolean-logic/combinators` (the combinators subdirectory is a type-error case, not a crash case).
  - `pnpm test:types` is the npm-script alias; `just test-types` is the canonical entry point referenced by the spec's Success Criteria and Definition of Done.
  - Runtime tests (`pnpm test:runtime`) must remain green throughout; any shared-utility change must preserve runtime/type parity.
- **Explicitly out of scope:**
  - Implementing fixes for Stage 2 type errors (deferred to a follow-up Phase 2 feature, created in Phase 6).
  - Establishing a type-complexity budget (Q3 decision — may be proposed later as a separate architectural task).
  - Type-performance benchmarking.

## Dependency Graph (phases)

```
Phase 1 (baseline + isolate crash files + log)
   │
   ├─▶ Phase 2 (stabilize tests/boolean-logic/operators) ──┐
   │                                                        │ (parallelizable)
   └─▶ Phase 3 (stabilize tests/datetime)            ──────┘
                                                             │
                                                             ▼
                                          Phase 4 (full `just test-types` green + Stage 1 deliverables + escalations)
                                                             │
                                                             ▼
                                          Phase 5 (Stage 2 findings report — per-directory subtasks parallelizable)
                                                             │
                                                             ▼
                                          Phase 6 (Phase 2 feature request + spec `clarified: complete` + final validation)
```

Phases 2 and 3 are mutually parallelizable (independent test trees) but both depend on Phase 1. Phases 4 → 5 → 6 are strictly sequential.

---

## Phase 1 — Baseline Snapshot and Crash File Isolation

**Goal:** Confirm the crash end-to-end, drill from "crash directory" down to the exact crashing **files** under `tests/boolean-logic/operators` and `tests/datetime`, record each file's crash mode, and stand up the phase log.

**Parallelizable:** No — establishes the baseline that every later phase depends on. (The two crash directories can be drilled independently, but both feed a single log and a single confirmed baseline.)

### Tasks

- [x] Run `just test-types` from repo root and capture: exit code, last file processed before termination, terminal error string, and approximate memory/high-water mark if observable. Confirm the run does not complete normally.
- [x] Run `just test-types boolean-logic` and `just test-types datetime` in isolation to confirm both reproduce the crash independently of the full run.
- [x] Drill `tests/boolean-logic/operators`: enumerate every `*.test.ts` file (including nested subdirectories: `containers/`, `datetime/`, `dictionary/`, `functions/`, `literal/`, `scalar/`, `sets/`, `unions/`), and run each individually via `just test-types <relative-name>` to classify it as **crashes** or **runs**. Record the crash mode per crashing file (exit / OOM / stack overflow / infinite instantiation depth / hang-timeout) and the offending type expression(s) where identifiable.
- [x] Drill `tests/datetime`: enumerate every `*.test.ts` file, run each individually, and record the same per-file crash mode classification.
- [x] Confirm `tests/boolean-logic/combinators` is **not** a crash directory (per spec: it is a Stage 2 type-error case) — record this explicitly to prevent misclassification in Phase 5.
- [x] Run `just test-runtime` and capture the green baseline (regression anchor for Phases 2–4).
- [x] Create the phase log at `.ai/logs/type-complexity-phase1-isolation-log.md` with:
      - [x] `## Starting Test Position` section containing the captured `just test-types` failure output (XML or fenced block).
      - [x] `## Crash File Inventory` section listing every crashing file with its crash mode and offending type expression.
      - [x] `## Runtime Baseline` section recording the `just test-runtime` result.
      - [x] `## Repo Starting Position` section (last local commit, last remote commit, dirty files).
- [x] Identify any patterns common across crash points (e.g. deeply recursive template literals, specific utility families) and record them in the log under `## Cross-Cutting Patterns`.

### Validation Checkpoint

- The phase log exists at `.ai/logs/type-complexity-phase1-isolation-log.md` with all four required sections populated.
- Every file under `tests/boolean-logic/operators/**` and `tests/datetime/**` is classified as either "crashes (mode: …)" or "runs".
- `tests/boolean-logic/combinators` is explicitly recorded as a Stage 2 (type-error) directory, not a crash directory.
- `just test-runtime` remains green (regression anchor captured, not yet relied upon).

### Rollback

None — Phase 1 is read-only with respect to source/tests. The log file can be deleted if the phase is abandoned.

---

## Phase 2 — Stabilize `tests/boolean-logic/operators`

**Goal:** Every previously crashing file under `tests/boolean-logic/operators/**` runs to completion under `just test-types`. Type resolution is preserved wherever possible; unavoidable widenings are documented; shared-utility root causes are escalated, not silently patched.

**Preconditions:** Phase 1 complete (crash file inventory exists).

**Parallelizable:** Yes — independent of Phase 3 (`tests/datetime`). Individual crashing files within `operators/**` can be fixed concurrently as long as they touch disjoint type utilities.

### Tasks

- [x] For each crashing file in `tests/boolean-logic/operators/**` (per the Phase 1 inventory), in priority order:
      - [x] Reproduce the crash in isolation to confirm the mode before editing.
      - [x] Apply the **preferred test-file-level fix**: simplify or split the offending test cases (e.g. narrow a union, break up a deeply-nested conditional type, remove an infinite-recursion case) so the file completes without crash.
      - [x] Only if no test-file fix suffices: modify the responsible shared utility under `modules/types/src/` (or elsewhere) strictly to stop the crash, **preserving runtime/type parity**. Then immediately open a Phase 4 escalation entry naming the utility, the change, and the underlying root cause to address later.
      - [x] If any widening is unavoidable, record the specific assertion/expectation changed and a one-line justification in the phase log.
      - [x] Re-run the individual file: `just test-types <file>` — must complete (pass or produce only **type errors**, never a crash).
- [x] Re-run `just test-types boolean-logic` at the directory level — must complete without crash. (Type errors in `tests/boolean-logic/combinators` are expected and remain Stage 2 territory.)
- [x] Run `just test-runtime` — must remain green (regression anchor from Phase 1).
- [x] Update `.ai/logs/type-complexity-phase1-isolation-log.md` (or append a `## Phase 2 Stabilization Notes` section) capturing:
      - [x] Per-file: fix strategy applied (test-level vs. shared-utility), crash mode that was resolved, any widening with justification.
      - [x] List of shared utilities touched, if any, with pointer(s) to Phase 4 escalation entries.

### Validation Checkpoint

- `just test-types boolean-logic` completes end-to-end without crashing.
- Every file flagged as crashing in Phase 1 under `operators/**` now runs individually without crash.
- `just test-runtime` is green.
- Every shared-utility change (if any) has a corresponding escalation entry and preserves runtime/type parity.
- Every widening (if any) is documented with a justification; no assertion was changed silently.

### Rollback

Revert the Phase 2 commits. `tests/boolean-logic/operators` returns to its Phase 1 crashing state; runtime tests remain unaffected because parity is enforced on every shared-utility change.

---

## Phase 3 — Stabilize `tests/datetime`

**Goal:** Every previously crashing file under `tests/datetime/**` runs to completion under `just test-types`, using the same hybrid-with-escalation discipline as Phase 2.

**Preconditions:** Phase 1 complete (crash file inventory exists). Independent of Phase 2.

**Parallelizable:** Yes — fully parallelizable with Phase 2. Individual crashing files within `datetime/**` can be fixed concurrently when they touch disjoint type utilities.

### Tasks

- [x] For each crashing file in `tests/datetime/**` (per the Phase 1 inventory), in priority order:
      - [x] Reproduce the crash in isolation to confirm the mode before editing.
      - [x] Apply the **preferred test-file-level fix**: simplify or split the offending test cases so the file completes without crash.
      - [x] Only if no test-file fix suffices: modify the responsible shared utility under `modules/types/src/` (or `modules/runtime/src/datetime/` where type-level behavior lives) strictly to stop the crash, **preserving runtime/type parity**. Open a Phase 4 escalation entry.
      - [x] If any widening is unavoidable, record the specific assertion/expectation changed and a one-line justification in the phase log.
      - [x] Re-run the individual file: `just test-types <file>` — must complete (pass or produce only **type errors**, never a crash).
- [x] Re-run `just test-types datetime` at the directory level — must complete without crash.
- [x] Run `just test-runtime` — must remain green (regression anchor from Phase 1).
- [x] Append a `## Phase 3 Stabilization Notes` section to the log capturing per-file fix strategies, widenings, and shared utilities touched.

### Validation Checkpoint

- `just test-types datetime` completes end-to-end without crashing.
- Every file flagged as crashing in Phase 1 under `datetime/**` now runs individually without crash.
- `just test-runtime` is green.
- Every shared-utility change (if any) has a corresponding Phase 4 escalation entry and preserves runtime/type parity.
- Every widening (if any) is documented with a justification; no assertion was changed silently.

### Rollback

Revert the Phase 3 commits. `tests/datetime` returns to its Phase 1 crashing state; runtime tests remain unaffected.

---

## Phase 4 — Stage 1 Validation and Escalation Tracking

**Goal:** Prove that `just test-types` at the repo root completes end-to-end without crashing, and assemble the Stage 1 deliverables enumerated in the spec's Outputs and Definition of Done #1. This is the synchronization point after Phases 2 and 3.

**Preconditions:** Phase 2 **and** Phase 3 both complete.

**Parallelizable:** No — this phase is the gate that confirms Stage 1 is done.

### Tasks

- [x] Run the full `just test-types` from repo root — must complete without crash (exit normally; type-error diagnostics from Stage 2 directories are acceptable and expected).
- [x] Run `just test-runtime` — must remain green (final Stage 1 regression confirmation).
- [x] Compile the **previously-crashing file list** with crash modes, drawing on the Phase 1 inventory and the Phase 2/3 stabilization notes. Save it under `## Resolved Crash Files` in the log.
- [x] Compile the **type-resolution change ledger**: every widening or assertion change made in Phases 2/3, each with its justification. Save it under `## Type-Resolution Changes` in the log.
- [x] Compile the **escalation ledger**: one entry per shared-utility root cause deferred beyond a test-file fix. Each entry names the utility, the file path, the minimal change applied to stop the crash, and the underlying root cause that needs a proper fix. Save it under `## Shared-Utility Escalations` in the log.
- [x] For each escalation entry, create a tracked task (issue / tracker item / TODO-on-paper per team convention) so the underlying utility fix is picked up in a future phase. The spec requires these to be "separate design-review task(s)"; they must not be silently absorbed into this feature.

### Validation Checkpoint

- `just test-types` exits normally (no crash, no hang, no OOM, no stack overflow).
- The log contains populated `## Resolved Crash Files`, `## Type-Resolution Changes`, and `## Shared-Utility Escalations` sections.
- Every escalation entry has a corresponding tracked task created.
- `just test-runtime` is green.
- Spec's Stage 1 Outputs are all satisfied: (a) `just test-types` no longer crashes, (b) previously crashing files are listed with crash modes, (c) type-resolution changes are documented, (d) shared-utility escalations are tracked.

### Rollback

None — Phase 4 is documentation and validation only; no source changes.

---

## Phase 5 — Stage 2 Type-Error Diagnosis (Findings Report)

**Goal:** Produce the Stage 2 findings document at `features/2026-07-01-type-complexity/stage2-findings.md` with one section per affected type-error directory. **No code fixes.** Each section describes the errors, proposes solution options, and recommends next steps — ready to be consumed by a future Phase 2 feature.

**Preconditions:** Phase 4 complete (`just test-types` runs cleanly, so diagnostic output is reliable).

**Parallelizable:** Yes — the seven type-error directories are independent and can be diagnosed concurrently as seven sub-tasks that converge on a single findings document.

### Tasks

- [x] Create `features/2026-07-01-type-complexity/stage2-findings.md` with a table-of-contents skeleton listing all seven type-error directories.
- [x] For **each** of the seven type-error directories, produce one findings section (parallelizable sub-tasks):
      - [x] `tests/domains`
      - [x] `tests/literals`
      - [x] `tests/take`
      - [x] `tests/interpolation`
      - [x] `tests/type-conversions`
      - [x] `tests/types`
      - [x] `tests/boolean-logic/combinators`
      Each section must contain:
      - [x] **Description of type errors:** concrete list of failing assertions with the offending type expressions and the actual vs. expected types (copy from `just test-types <dir>` output).
      - [x] **Proposed solution / solution options:** at least one candidate fix per error class (test-level vs. utility-level, with trade-offs noted).
      - [x] **Recommended next steps:** the preferred option and any prerequisites (e.g. utility redesign, parity impact, follow-up benchmark).
- [x] Cross-link related errors across sections where the same utility appears to be the root cause (e.g. a shared template-literal or recursion-heavy type surfacing in multiple directories).
- [x] Add a top-level **Executive Summary** to the findings document that: counts the total errors per directory, highlights any shared root causes, and proposes the recommended Phase 2 sequencing.
- [x] Verify the findings document contains **no implementation changes** — only diagnosis and recommendations (spec Boundary for Stage 2).

### Validation Checkpoint

- `features/2026-07-01-type-complexity/stage2-findings.md` exists with exactly seven directory sections plus an Executive Summary.
- Each section has all three required subsections (Description, Proposed solution(s), Recommended next steps).
- No source or test files were modified in this phase (`git diff -- 'modules/**' 'tests/**'` is empty for the phase's commits).
- The findings are concrete enough that Phase 2 acceptance criteria can be derived directly from them.

### Rollback

Delete `features/2026-07-01-type-complexity/stage2-findings.md`. No code changes to revert.

---

## Phase 6 — Phase 2 Feature Request and Final Closeout

**Goal:** Convert the Stage 2 findings into a tracked follow-up Phase 2 feature with explicit acceptance criteria, confirm no forbidden markers were introduced, and flip the spec's `clarified` frontmatter to `complete`.

**Preconditions:** Phase 5 complete (findings document exists).

**Parallelizable:** No — final closeout.

### Tasks

- [x] Create the follow-up **Phase 2** feature request (file under `features/` using the team's naming convention, e.g. `features/<date>-type-complexity-phase2/spec.md`) with:
      - [x] Explicit **acceptance criteria** derived from the Stage 2 findings (one acceptance bullet per fix recommendation, mapped back to the findings sections).
      - [x] A referenced link to `features/2026-07-01-type-complexity/stage2-findings.md` as the canonical input.
      - [x] Scope boundaries restating Q1's hybrid-with-escalation policy and Q3's existing-assertions-floor policy so Phase 2 inherits them.
- [x] Scan every file touched by Phases 1–5 for forbidden markers:
      - [x] Run `rg -i "TODO|FIXME|XXX|HACK" modules/ tests/ features/2026-07-01-type-complexity/` and confirm zero matches were **introduced** by this feature (pre-existing matches must be enumerated and explicitly left untouched).
- [x] Update `features/2026-07-01-type-complexity/spec.md` frontmatter: change `clarified: opencode/k2p7` to `clarified: complete`.
- [x] Run the final validation pass:
      - [x] `just test-types` — completes without crash (re-confirm Phase 4 gate still holds after Phase 5 doc work).
      - [x] `just test-runtime` — green.
      - [x] `features/2026-07-01-type-complexity/stage2-findings.md` — present with seven sections.
      - [x] Phase 2 feature spec — present with acceptance criteria.
      - [x] Forbidden-marker scan — clean for newly introduced markers.
- [x] Verify all four spec Definition-of-Done items are satisfied and record a brief closeout note in the phase log under `## Final Closeout`.

### Validation Checkpoint

- A Phase 2 feature spec exists, references the findings document, and contains explicit, findings-derived acceptance criteria.
- `rg -i "TODO|FIXME|XXX|HACK"` introduces zero new matches attributable to this feature.
- `spec.md` frontmatter reads `clarified: complete`.
- All four Definition-of-Done items from the spec are verifiably met:
  1. Stage 1 complete (`just test-types` completes; crash files listed with modes; widenings documented; escalations tracked).
  2. Stage 2 complete (findings report with one section per type-error directory; Phase 2 feature with acceptance criteria created).
  3. No TODO/FIXME/XXX/HACK markers introduced.
  4. Spec updated with `clarified: complete`.
- `just test-types` and `just test-runtime` both green at the final commit.

### Rollback

Revert the spec frontmatter change (`clarified: complete` → `clarified: opencode/k2p7`) and delete the Phase 2 feature spec. Stage 1 stabilization commits and the Stage 2 findings document are intentionally retained because they capture real resolved/diagnosed state.

---

## Cross-Cutting Notes

- **Crash vs. type error:** The spec draws a hard line. A **crash** (Stage 1) prevents `just test-types` from completing at all. A **type error** (Stage 2) is a failing assertion in an otherwise-completing run. Phase 5 must not fix type errors; Phases 2–4 must not silently absorb them either.
- **`tests/boolean-logic` split:** The `boolean-logic` directory straddles both stages — `operators/**` is Stage 1 (crash), `combinators/**` is Stage 2 (type error). Phase 1 records this explicitly; Phases 2 and 5 honor the split.
- **Fidelity floor (Q3):** No assertion may be broken silently. Every widening or expectation change must be (a) unavoidable to stop a crash, (b) explicitly recorded in the log with a justification. When in doubt, prefer splitting a test case over widening its expectation.
- **Hybrid-with-escalation (Q1):** Test-file fixes are the default. Shared-utility changes are permitted only as the last resort to stop a crash, must preserve runtime/type parity, and always produce a Phase 4 escalation entry so the root cause is not buried.
- **Filtered vs. full type tests:** Per the spec, `just test-types` (full suite) is the authoritative crash gate. Filtered runs (`just test-types <dir>`) are used during Phases 2 and 3 for tight feedback loops, but the full run in Phase 4 is the binding validation.
- **Runtime parity:** `just test-runtime` is the regression anchor captured in Phase 1 and re-verified in every subsequent phase. Any shared-utility change that risks runtime behavior must be validated against it.
- **Out-of-scope reminders:** A type-complexity budget, type-performance benchmarks, and the actual Stage 2 fixes are all explicitly out of scope and left to follow-up work.
- **Open questions (deferred to plan consumers):**
  - Should the Phase 2 feature request target all seven Stage 2 directories in a single phase, or split (e.g. shared-utility root causes first, then per-directory cleanups)?
  - Should a type-complexity / type-performance budget be proposed as a parallel architectural feature alongside Phase 2?
