---
title: Type Complexity Stabilization – Phase 1
status: draft
clarified: complete
date: 2026-07-01
review_iterations: 3
---

# Type Complexity Stabilization – Phase 1

## Problem Statement

Running `just test-types` at the repository root currently crashes. To restore the type-test suite, we must isolate the failure points to the test-file level, stop the crashes, and document the remaining type errors for a planned follow-up phase.

## Scope

This task covers the top-level test directories under `tests/`:

- tests/api
- tests/assertions
- tests/base-types
- tests/boolean-logic
- tests/classes
- tests/containers
- tests/datetime
- tests/dictionary
- tests/domains
- tests/errors
- tests/fixtures
- tests/functions
- tests/globals-and-transpiled
- tests/initializers
- tests/interpolation
- tests/lists
- tests/literals
- tests/numeric
- tests/queues
- tests/regex
- tests/runtime
- tests/sets
- tests/string-literals
- tests/take
- tests/tuples
- tests/type-conversions
- tests/types
- tests/unit
- tests/validation

## Current State

### Type-error directories (Stage 2)

Tests run, but some assertions fail:

- tests/domains
- tests/literals
- tests/take
- tests/interpolation
- tests/type-conversions
- tests/types
- tests/boolean-logic/combinators (note: this sub-directory is treated as a type-error case, not a crash case)

### Crash directories (Stage 1)

Tests cannot complete:

- tests/boolean-logic (specifically `tests/boolean-logic/operators`)
- tests/datetime

A **crash** is any failure mode that prevents `just test-types` from completing normally, including but not limited to:

- process exit
- out-of-memory (OOM)
- TypeScript stack overflow or "infinite instantiation depth" errors
- hangs or timeouts

The exact crash mode for each affected file will be diagnosed and recorded.

## Clarifications

The following decisions were made during the clarification review and govern this work:

### Q1: May we modify underlying type utilities to fix crashes, or are changes limited to test files?

**Decision:** Hybrid with escalation.

- First attempt the fix at the test-file level (e.g., simplify or split test cases).
- If the root cause is clearly in `modules/types/src/` or another shared utility, a test-level fix may be applied to stop the crash, but a separate design-review task/escalation must be created to address the underlying utility.
- Runtime/type parity must be preserved for any utility changes.
- Test-only fixes are preferred when they avoid masking real bugs.

### Q2: What is the exact deliverable for Stage 2?

**Decision:** Stage 2 diagnosis is in-scope; fixes are deferred to a planned Phase 2.

- Stage 2 deliverable is a written findings/report that describes each type-error directory in detail, proposes a solution, and recommends next steps.
- No code fixes for Stage 2 type errors are in scope for this task.
- A follow-up Phase 2 task/feature will be created with explicit acceptance criteria to implement the fixes.

### Q3: How should we measure, document, and verify acceptable "slight widening" of types?

**Decision:** Existing tests are the fidelity floor.

- Any change that breaks an existing assertion is unacceptable unless the assertion is explicitly updated and documented.
- Widening is allowed only when unavoidable to stop a crash, and must be recorded as an explicit test/expectation change with a clear justification.
- A type-complexity budget is out-of-scope for this task, but may be proposed as a follow-up architectural task.

## STAGE 1: Crash Isolation and Stabilization

### Goal

Make `just test-types` complete successfully by isolating and stabilizing every crashing file.

### Inputs

- The set of directories/files identified as crashing under "Crash directories" above.
- Existing type tests for each affected area.

### Work

1. Increase granularity until the crashing test files are identified.
2. For each crashing file:
   - Record the crash mode (exit, OOM, stack overflow, hang, etc.).
   - Identify any patterns common across failure points.
   - Modify the file so it no longer crashes.
   - Preserve the intended level of type resolution wherever possible.
   - If widening is unavoidable, document the change and justification.
3. Prefer test-file-level fixes.
4. If a shared utility in `modules/types/src/` or elsewhere must change to stop a crash:
   - Preserve runtime/type parity.
   - Create a separate design-review task/escalation for the underlying utility fix.

### Outputs

- `just test-types` no longer crashes.
- A list of previously crashing files and their crash modes.
- A list of any type-resolution changes made, with justifications.
- Escalation tasks for any shared-utility root causes deferred beyond test-file fixes.

### Boundaries

- Fixes are limited to stopping crashes.
- Non-crashing type errors are handled in Stage 2.

## STAGE 2: Type-Error Diagnosis

### Goal

Produce a written findings report for every type-error directory so a future Phase 2 can implement fixes with clear acceptance criteria.

### Inputs

- The set of directories identified as having type errors under "Type-error directories" above.

### Work

1. For each affected directory, create one section in the findings document that includes:
   - A detailed description of the type errors.
   - A proposed solution or solution options.
   - Recommended next steps.
2. Do not implement fixes in this stage.

### Outputs

- A Stage 2 findings document at `features/2026-07-01-type-complexity/stage2-findings.md` (or an equivalent agreed location) with one section per affected directory.
- A task/feature request for Phase 2 with explicit acceptance criteria.

### Boundaries

- No code fixes for type errors.
- The report may recommend test changes or utility changes, but implementation is deferred.

## Success Criteria

- `just test-types` at the repo root no longer crashes.
- All previously crashing directories/files have been isolated and stabilized.
- The Stage 2 findings document exists with one section per affected type-error directory.

## Definition of Done

1. Stage 1 is complete:
   - `just test-types` completes without crashing.
   - Previously crashing files are listed with crash modes.
   - Any unavoidable type-resolution changes are documented.
   - Any deferred shared-utility escalations are tracked as separate tasks.
2. Stage 2 is complete:
   - A findings report exists with one section per type-error directory.
   - A follow-up Phase 2 task/feature with acceptance criteria has been created.
3. No TODO/FIXME/XXX/HACK markers are introduced.
4. The spec is updated with `clarified: complete` in the frontmatter.
