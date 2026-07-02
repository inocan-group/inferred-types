---
review_iterations: 3
---

# Oxlint Migration Spec

## Status

Draft: 2026-07-01

## Objective

Replace the monorepo's ESLint-based lint workflow with Oxlint while preserving the parts of the current lint contract that matter for `inferred-types`: TypeScript correctness checks, common correctness rules, import/runtime hygiene, and fast local/CI feedback.

The migration should be incremental. Oxlint should become the primary linter first, ESLint should remain available temporarily for parity checks, and ESLint dependencies should be removed only after unsupported or intentionally dropped rules are documented.

## Current State

The repository currently uses a root `eslint.config.ts` powered by `@antfu/eslint-config`.

Current root lint command:

```sh
pnpm lint
```

Current package lint commands:

```sh
pnpm -C modules/constants lint   # eslint src
pnpm -C modules/types lint       # eslint src
pnpm -C modules/runtime lint     # eslint src
pnpm -C modules/inferred-types lint # eslint src --fix
```

Current ESLint dependency surface includes:

- `eslint`
- `@antfu/eslint-config`
- `@eslint/js`
- `@typescript-eslint/eslint-plugin`
- `@typescript-eslint/parser`
- `typescript-eslint`
- `eslint-plugin-format`
- `eslint-plugin-promise`

The active config also pulls in Antfu-managed rule groups such as stylistic, regexp, TypeScript, promise, node, Vue, unused-imports, and related ecosystem rules. Current lint passes with warnings from `style/indent-binary-ops` and `regexp/no-super-linear-backtracking`, so the migration must decide whether these stay as warnings, move to Oxlint equivalents, or are explicitly dropped.

## External Research Summary

Oxlint's official migration docs say ESLint flat configs can be converted with `@oxlint/migrate`, which reads the flat config, converts supported rules, preserves severities/options, preserves overrides, converts globals, and preserves root ignores in the generated `.oxlintrc.json`.

Oxlint supports incremental adoption. If not all required ESLint rules are covered, the recommended bridge is to run Oxlint first and ESLint second, optionally using `eslint-plugin-oxlint` to disable duplicate ESLint rules.

Oxlint config supports `rules`, `categories`, built-in `plugins`, `jsPlugins`, `overrides`, `ignorePatterns`, `env`, `globals`, `settings`, and root `options`.

Oxlint supports ESLint-style severities, including `"off"`, `"warn"`, and `"error"`. It also supports warning gates through `--deny-warnings`, `--max-warnings`, or config options.

Oxlint has built-in plugin namespaces for common ecosystems, including TypeScript, promise, node, vitest, vue, jsdoc, import, unicorn, react, and others. JavaScript plugin support exists for ESLint-compatible plugins, but it is marked alpha and should be treated as a fallback rather than the default path.

Type-aware linting exists but requires `oxlint-tsgolint`. Official docs recommend installing it separately and, in monorepos, ensuring dependencies are installed and dependent packages are built before running type-aware linting. This repo's full type-test suite is already memory-intensive, so type-aware Oxlint should be a later phase, not the first cutover.

Primary references:

- https://oxc.rs/docs/guide/usage/linter/migrate-from-eslint
- https://oxc.rs/docs/guide/usage/linter/config.html
- https://oxc.rs/docs/guide/usage/linter/config-file-reference.html
- https://oxc.rs/docs/guide/usage/linter/plugins.html
- https://oxc.rs/docs/guide/usage/linter/type-aware.html
- https://oxc.rs/docs/guide/usage/linter/cli.html

## Goals

- Make `pnpm lint` use Oxlint as the default linter.
- Preserve lint coverage for correctness-oriented rules where Oxlint has native support.
- Avoid keeping ESLint in the steady-state dependency graph.
- Keep lint fast enough for local use and CI.
- Make warning behavior explicit instead of relying on accidental ESLint defaults.
- Preserve existing inline `eslint-disable` comments during the transition where Oxlint can respect them.

## Non-Goals

- Do not migrate formatting to Oxfmt in this feature. Formatting is adjacent, but Oxlint is a linter. Any move from ESLint stylistic/format rules to Oxfmt should be a separate feature.
- Do not enable Oxlint type-aware linting in the first cutover.
- Do not remove ESLint in the same change that introduces Oxlint unless the parity report shows no meaningful unsupported rules.
- Do not rewrite source files only to satisfy new stylistic opinions.

## Proposed Migration

### Phase 1: Add Oxlint Side-By-Side

Add catalog entries:

```yaml
catalog:
  oxlint: ^latest
```

Add root dev dependency:

```json
{
  "devDependencies": {
    "oxlint": "catalog:"
  }
}
```

Keep ESLint dependencies during this phase.

Add exploratory scripts:

```json
{
  "scripts": {
    "lint:ox": "pnpm -r lint:ox",
    "lint:eslint": "pnpm -r lint:eslint"
  }
}
```

Update module scripts temporarily:

```json
{
  "scripts": {
    "lint": "oxlint src",
    "lint:ox": "oxlint src",
    "lint:eslint": "eslint src"
  }
}
```

For `modules/inferred-types`, use `oxlint src --fix` only if we explicitly want `pnpm -C modules/inferred-types lint` to retain the current auto-fix behavior. Otherwise normalize all modules to check-only lint and add `lint:fix`.

### Phase 2: Generate and Review Oxlint Config

Run the migration tool from the repo root:

```sh
npx @oxlint/migrate eslint.config.ts
```

Expected output:

```text
.oxlintrc.json
```

Review the generated config manually. The review should classify rules into:

- `native`: supported directly by Oxlint.
- `js-plugin`: migrated through Oxlint JavaScript plugin support.
- `unsupported`: not available in Oxlint.
- `drop`: stylistic or noisy rule intentionally removed.
- `defer`: candidate for a later type-aware phase.

Prefer native Oxlint rules over JavaScript plugins. Use `jsPlugins` only when the rule is materially valuable and there is no native equivalent.

### Phase 3: Establish the First Oxlint Gate

Run:

```sh
pnpm lint:ox
```

Fix errors that represent real correctness issues.

For warnings, set an explicit policy:

- Do not use `--deny-warnings` initially.
- Add `options.maxWarnings` only after the warning count is stable.
- Keep known regex backtracking warnings as warnings unless a safe regex rewrite is obvious.

Recommended root config options:

```json
{
  "$schema": "./node_modules/oxlint/configuration_schema.json",
  "options": {
    "respectEslintDisableDirectives": true,
    "reportUnusedDisableDirectives": "warn"
  }
}
```

`respectEslintDisableDirectives` is important because this repo already contains `eslint-disable` comments in source and tests.

### Phase 4: Parity Check Against ESLint

Run both linters:

```sh
pnpm lint:ox
pnpm lint:eslint
```

Create a short parity report in the PR description, not as a committed docs file unless explicitly requested. The report should answer:

- Which ESLint errors are no longer reported by Oxlint?
- Which ESLint warnings are intentionally dropped?
- Which Oxlint diagnostics are new?
- Which inline disable comments need conversion from `eslint-disable` to `oxlint-disable` later?

If ESLint still catches important issues that Oxlint does not, keep side-by-side execution:

```json
{
  "scripts": {
    "lint": "pnpm lint:ox && pnpm lint:eslint"
  }
}
```

If the remaining ESLint findings are only stylistic/formatting warnings we intend to drop, make Oxlint the only lint command.

### Phase 5: Optional Type-Aware Oxlint

Only after the syntax-only Oxlint migration is stable, evaluate:

```sh
pnpm add -D oxlint-tsgolint@latest
oxlint --type-aware
```

Do not enable this by default until:

- `pnpm -r build` succeeds before lint in CI or dependent declaration files are otherwise available.
- Runtime and type-test memory pressure is understood.
- Type-aware Oxlint runtime is measured on this monorepo.
- Any duplicate coverage with `typed test` and `typed source` is documented.

If adopted, add:

```json
{
  "options": {
    "typeAware": true
  }
}
```

to the root Oxlint config only.

### Phase 6: Remove ESLint

Remove ESLint only when `pnpm lint` uses Oxlint alone and parity gaps are accepted.

Remove from `package.json`, module package files, and `pnpm-workspace.yaml` catalog where no longer used:

- `eslint`
- `@antfu/eslint-config`
- `@eslint/js`
- `@typescript-eslint/eslint-plugin`
- `@typescript-eslint/parser`
- `typescript-eslint`
- `eslint-plugin-format`
- `eslint-plugin-promise`
- any ESLint-only overrides such as `@eslint/plugin-kit` if they become unnecessary

Delete `eslint.config.ts` after the Oxlint config is authoritative.

## Rule Mapping Notes

Current explicit ESLint customizations:

| ESLint rule/config | Current behavior | Oxlint migration plan |
| --- | --- | --- |
| `style/indent-binary-ops` | warning | Drop or defer to formatter migration; this is stylistic and currently noisy. |
| `array-callback-return` | warning | Map to Oxlint native ESLint-compatible rule if generated. |
| `valid-typeof` | warning | Map to Oxlint native ESLint-compatible rule if generated. |
| `style/comma-dangle` | warning | Drop or defer to formatter migration. |
| `regexp/no-super-linear-backtracking` | warning | Keep as warning only if native/plugin-supported; otherwise document as dropped or JS-plugin fallback. |
| `ts/explicit-function-return-type` | off | Keep off. |
| `ts/no-unused-vars` | warning with `_`/`cases` ignores | Map to Oxlint TypeScript unused-vars equivalent if option-compatible; otherwise preserve with JS plugin or accept slight behavior difference. |

Current inline disables that need compatibility review include:

- `regexp/no-super-linear-backtracking`
- `ts/ban-ts-comment`
- `ts/ban-types`
- `ts/no-empty-object-type`
- `ts/no-unused-vars`
- `unused-imports/no-unused-vars`
- `node/prefer-global/process`
- `valid-typeof`
- stylistic rules such as `style/quote-props` and `style/indent`

Oxlint should initially respect existing `eslint-disable` directives. Later cleanup can convert active suppressions to `oxlint-disable` comments once ESLint is removed.

## Script Design

Steady-state recommended scripts:

Root:

```json
{
  "scripts": {
    "lint": "pnpm -r lint",
    "lint:fix": "pnpm -r lint:fix"
  }
}
```

Modules:

```json
{
  "scripts": {
    "lint": "oxlint src",
    "lint:fix": "oxlint src --fix"
  }
}
```

During transition:

```json
{
  "scripts": {
    "lint": "pnpm lint:ox && pnpm lint:eslint",
    "lint:ox": "pnpm -r lint:ox",
    "lint:eslint": "pnpm -r lint:eslint"
  }
}
```

## CI Plan

Update CI only after local parity is understood.

Recommended first CI shape:

```sh
pnpm install --frozen-lockfile
pnpm lint:ox
pnpm test:runtime
pnpm test:types
```

If ESLint is retained during transition:

```sh
pnpm lint:ox
pnpm lint:eslint
```

When Oxlint becomes authoritative, remove ESLint from CI and package dependencies.

## Validation

Minimum validation for the migration PR:

```sh
pnpm install --frozen-lockfile
pnpm lint:ox
pnpm lint:eslint   # only during parity phase
pnpm test:runtime
NODE_OPTIONS=--max-old-space-size=8192 pnpm test:types <filtered impacted areas>
```

Full `pnpm test:types` currently risks Node heap exhaustion on this machine, so use filtered type tests for source areas changed by lint fixes. If the full suite is required, first establish a separate memory/performance fix.

Acceptance criteria:

- `pnpm lint` exits 0 with Oxlint as the primary linter.
- Oxlint config is committed and documented by the script names.
- ESLint is either removed or isolated behind an explicit `lint:eslint` compatibility script.
- No source behavior changes are introduced solely for lint migration.
- Existing test commands used by CI still pass or have documented pre-existing blockers.

## Rollback Plan

The rollback path is simple during Phases 1-4:

- Revert package scripts from `oxlint src` back to `eslint src`.
- Keep or restore `eslint.config.ts`.
- Remove `.oxlintrc.json`.
- Remove `oxlint` from package dependencies and catalog.

Do not delete ESLint dependencies until the final removal phase, so rollback remains low-risk.

## Open Questions

- Should stylistic linting be removed entirely from `pnpm lint`, or replaced by a dedicated formatter feature using Oxfmt?
- Do we want `pnpm lint` to fail on warnings eventually via `options.maxWarnings` or `--deny-warnings`?
- Is type-aware Oxlint useful here given the existing `typed test`, `typed source`, and type-test memory profile?
- Should tests be included in Oxlint coverage, or should the first migration match the current module-level `src` scope only?
