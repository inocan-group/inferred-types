---
area: "{{ctx.area}}"
review_file: "{{ctx.area}}/reviews/{{ctx.today}}-comprehensive/review.md"
start:
    message: "👓 starting a comprehensive review of the **{{ctx.area}}** package area"
success:
    message: "✅ the comprehensive review for **{{ctx.area}}** completed: `{{review_file}}`"

failure:
    message: "💥 the comprehensive review in {{ctx.area}} did not finish successfully!"
---

You are performing a **senior-level TypeScript code review** on the **{{ctx.repo}}** repo — specifically the **{{ctx.area}}** package area.

**inferred-types** is a TypeScript monorepo whose reason for existing is preserving **narrow, literal types** while providing runtime helpers that mirror type-level behavior. Every utility is therefore judged on **two axes of equal weight**: runtime correctness (does it produce the right value?) and type-level correctness (does TypeScript infer the narrowest useful type?). Type tests are first-class, not secondary.

Your job is to produce a review that is:

- technically rigorous
- concrete and evidence-based
- prioritized by risk
- aligned with this repo's narrow-typing discipline and idiomatic TypeScript
- useful to an experienced engineer who wants actionable findings, not generic praise

Assume the audience is fluent in advanced TypeScript: conditional and mapped types, template-literal types, tuple recursion, variance, `infer`, distributive conditionals, and the type-checker's performance characteristics. The monorepo is split into `modules/constants`, `modules/types`, `modules/runtime`, and `modules/inferred-types` (the re-export package).

## Review Goals

Review the project across these dimensions:

1. **Runtime correctness**
   - Look for logic bugs, edge-case failures, incorrect assumptions, broken invariants, and misuse of APIs.
   - Identify code paths that can `throw` unexpectedly, and distinguish justified throws from places where a typed `Err<...>` or a graceful return would be more appropriate.
   - Flag functions returning mock/placeholder data, empty implementations, or errors that are silently swallowed.

2. **Type-level correctness**
   - Verify that type utilities resolve to the **narrowest useful** type — not widened, not `never`/`any` by accident.
   - Check deliberate handling of wide inputs (`string`, `number`, `boolean`): are they short-circuited to a wide result rather than distributing accidentally?
   - Look for the repo's "incomplete type" smells: pass-through utilities (`export type X<T> = T` where a transform was intended), `any` used as a cop-out, and types that always resolve to the same result regardless of input.
   - Confirm typed failures use `Err<...>` rather than silent `never`.

3. **Runtime ↔ type alignment**
   - For every runtime-mirror function (e.g. `ensureLeading` ↔ `EnsureLeading`, `withValue` ↔ `WithValue`), verify the runtime value actually matches the declared return type.
   - A pragmatic boundary cast (`as X`) is acceptable **only** when the runtime logic genuinely produces the asserted type; flag casts that paper over incorrect or incomplete implementations.

4. **TypeScript idioms & narrow-typing discipline**
   - Evaluate whether the code uses `const` inference, generic capture, and `satisfies`/`as const` idiomatically to preserve literals.
   - Call out needless widening, weak generic constraints, awkward overloads, and higher-order function shapes that lose inference between calls.
   - Suggest stronger use of the type system where it would materially improve safety or clarity.

5. **API and module design**
   - Evaluate public API shape, naming, cohesion, and the consistency of the runtime-mirror pairing convention.
   - Verify **import discipline**: code should import from `inferred-types/constants`, `inferred-types/types`, or `inferred-types/runtime`; never from `@inferred-types/*`; deep `runtime/…` / `types/…` imports only to break intra-module cycles; avoid needless relative imports.
   - Identify utilities that are too large, too coupled, or placed in the wrong module/category.

6. **Type assertions & escape hatches** (the TypeScript analog of `unsafe`)
   - Inspect every `as`, `as any`, `as unknown as`, `@ts-ignore`/`@ts-expect-error`, and non-null assertion (`!`) with care.
   - For each, state: what invariant must hold, whether the surrounding runtime logic appears to uphold it, whether it is documented/justified, and whether the assertion is minimized.
   - Call out any assertion that masks an incorrect type or hides an incomplete implementation.

7. **Type-checker performance & complexity** (this repo's signature failure mode)
   - Identify union-explosion and "complex and possibly infinite" hazards: template-literal distribution over large unions, date/time combinatorics (hour × minute × second × ms × timezone), and recursive token/interpolation/signature parsers.
   - Check for missing mitigations that are warranted: wide-input short-circuits, `As<...>` to constrain intermediates, staged parsing instead of one giant conditional, recursion-depth/bailout limits, and static double-brace token forms that avoid literal-union blow-up.
   - Note cross-module type-resolution risks (types that behave differently once exported and consumed through package boundaries).
   - Separate "clearly a problem" from "needs measuring under `tests/type-performance/` or `benches/`".

8. **Runtime performance**
   - Identify obvious inefficiencies — needless allocation, repeated work in hot paths, avoidable re-parsing — but keep this secondary to type performance for this library.
   - Do not speculate wildly; separate "likely issue" from "needs benchmarking", and note where a micro-optimization is not worth the complexity.

9. **Testing** (dual-axis)
   - Assess coverage by **symbol type**: type-only utilities need **type tests** (`type cases = [...]` with `Expect<Test<...>>` / `AssertEqual`); plain runtime functions need **runtime tests** (`expect(...)`), plus type tests when complex types are involved; runtime-mirror functions need **both** on the same result.
   - Identify missing coverage for edge cases, error/`Err` paths, boundary conditions, wide-input behavior, and parse/round-trip cases.
   - For explosion-prone utilities, check for large-union stress cases or a `tests/type-performance/` entry.
   - Point out brittle or low-value tests, and any requirement whose strongest test is at the wrong level.

10. **Documentation and maintainability**
    - Review the type-level "self-documenting" doc comments, `README.md` files inside `src` subdirectories, examples, and inline comments.
    - Identify places where invariants, wide-type handling, `Err` conditions, or tricky recursive algorithms are under-documented.
    - Call out misleading names or comments that no longer match the code, and any `TODO`/`FIXME`/`XXX`/`HACK` markers (forbidden in committed code).

11. **Tooling / quality gates**
    - Consider whether the area passes the project's gates: `pnpm lint` (ESLint + `@antfu/eslint-config`), `pnpm test` (Vitest runtime), `pnpm test:types` / `typed test` (type tests), and `pnpm build` (tsdown → ESM/CJS/d.ts).
    - Where useful, suggest targeted lint or `audit:types` improvements — but do not recommend enabling every lint blindly.

## Review Method

Use this process:

1. First, build a short mental model of the area:
   - what kind of utilities it contains (type-only, runtime, or runtime-mirror pairs)
   - key modules/categories and their public entry points
   - which utilities are on the critical path or widely re-used
   - where risk is concentrated (parsers, date/time, template literals, heavy recursion)

2. Then review the highest-risk areas first:
   - type assertions / escape hatches
   - template-literal and token/`take` parsing
   - date/time combinatorics
   - runtime ↔ type alignment boundaries
   - public APIs and import discipline
   - complex recursive/conditional type utilities
   - type-checker performance hot spots

3. Prefer findings that are:
   - specific
   - reproducible (ideally with a minimal type/value example)
   - tied to concrete code
   - explainable in TypeScript terms

4. Avoid low-value review comments such as:
   - purely stylistic nits unless they affect readability materially
   - trivial renames unless they reduce confusion
   - generic statements like "add more tests" without naming the missing cases or the required verification level

## Output Format

Produce the review in this structure:

### 1. Executive Summary

- 5–10 sentence summary of the area's quality on both axes (runtime and type-level)
- overall risk level: `low`, `medium`, or `high`
- biggest strengths
- biggest concerns
- whether the code seems production-ready, experimental, or fragile

### 2. Key Findings
For each finding, use this exact structure:

#### [Severity: Critical | High | Medium | Low] Short title

- **Location:** file/module/utility or best approximation
- **Axis:** `runtime`, `type-level`, `both`, or `tooling`
- **Why it matters:** explain the engineering impact
- **Evidence:** cite the concrete code behavior or pattern you observed (a minimal type/value example is ideal)
- **Recommendation:** give a precise fix or refactor direction
- **Confidence:** `high`, `medium`, or `low`

Focus on the most important findings first.

### 3. TypeScript / Narrow-Typing Notes

- Brief section for non-critical but meaningful improvements
- Prefer type-system, inference-preservation, and API-shape observations

### 4. Testing Gaps

- Specific missing tests, labeled by required verification level (runtime / type / both)
- Name exact scenarios worth adding (edge cases, wide inputs, `Err` paths, round trips)

### 5. Type Assertions & Escape Hatches Review

- Separate section even if the verdict is "no unjustified assertions found"
- If assertions exist (`as`, `as any`, `@ts-expect-error`, `!`, etc.), enumerate each site and review whether the runtime logic upholds the asserted type and whether it is justified

### 6. Type-Performance Watchlist

- Utilities at risk of union explosion or "complex and possibly infinite" errors
- Note whether each is measured/guarded, and what mitigation is warranted

### 7. Prioritized Next Steps

- Top 3 to 7 recommended follow-up actions in priority order

## Severity Guidance

Use these severity levels consistently:

- **Critical**: clearly broken behavior on an important path — wrong runtime value, a type that resolves incorrectly (e.g. `any`/`never` where a real type is required), a "complex and possibly infinite" error that breaks compilation, or an assertion that hides a genuine unsoundness between value and type.
- **High**: significant correctness or API-design issue, a runtime-mirror function whose value and inferred type diverge, throw risk in normal operation, an import-rule violation that risks circularity/publishability, or a major test gap (e.g. a type utility with no type tests).
- **Medium**: maintainability issue, missing edge-case/wide-input handling, meaningful type-check or runtime performance problem, confusing API, or incomplete documentation around important behavior.
- **Low**: worthwhile cleanup, minor idiomatic improvement, small docs/test polish.

## Important Constraints

- Be direct and candid.
- Do not soften serious issues.
- Do not invent facts not grounded in the code.
- If something is uncertain, say so explicitly.
- Distinguish facts from hypotheses.
- Prefer "this appears risky because..." over overclaiming.
- When recommending changes, preserve the project's likely intent and architecture unless there is a strong reason not to.
- Do not flood the review with style-only comments.
- Optimize for signal density.
- You are running in a **non-interactive session** — do not ask the user for feedback or permissions.

Now perform the review and save the results to {{review_file}}

- now set the `created` frontmatter property of {{review_file}} to "{{ctx.now}}"
- now set the `agent` frontmatter property of {{review_file}} to "{{env.AGENT}}"
- now set the `yolo` frontmatter property of {{review_file}} to "{{env.YOLO}}"
