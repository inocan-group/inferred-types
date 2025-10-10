# Import Problems Test Fixtures

This directory contains TypeScript files with intentionally problematic import patterns. These files serve as **reference examples** for each type of import problem detected by `scripts/invalid-imports.sh`.

**Note:** These fixtures are automatically excluded when running the validation script from the repository root to prevent false positives. The exclusion is defined in the `RG_EXCLUDE_GLOBS` array in the script.

## Fixture Files

- `invalid-runtime-depth.ts` - Runtime alias too deep (>2 levels)
- `invalid-type-depth.ts` - Types alias too deep (>2 levels)
- `relative-import.ts` - Relative import with parent directory (`../`)
- `relative-export.ts` - Relative export with parent directory (`../../`)
- `forbidden-const-alias.ts` - Use of `constants/*` alias (not allowed)
- `missing-type-modifier.ts` - Import from `inferred-types/types` without `type` keyword
- `multiple-imports.ts` - Multiple imports from the same source
- `valid-imports.ts` - Examples of correct import patterns

## How Tests Work

The automated test suite (`tests/globals-and-transpiled/import-problems.test.ts`) validates that:

1. The actual codebase has no import problems (exit code 0)
2. The script produces valid XML output
3. All expected validation sections are present

## Exclusions

The validation script automatically excludes:
- `node_modules/**` - Third-party dependencies
- `.claude/**` - Claude Code hooks and configuration
- `tests/fixtures/**` - Test fixtures (including this directory)
- `dist/**` - Build output
- `build/**` - Build artifacts
- `**/*.map` - Source maps

These exclusions prevent false positives from dependencies and test files while ensuring the actual project code follows import rules.
