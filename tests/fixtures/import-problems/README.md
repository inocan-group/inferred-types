# Import Problems Test Fixtures

This directory contains TypeScript files with intentionally problematic import patterns. These files serve as:

1. **Reference examples** for each type of import problem detected by `scripts/invalid-imports.sh`
2. **Manual testing** of the import validation script

## Testing Manually

To test the script's pattern detection manually:

```bash
cd tests/fixtures/import-problems
bash ../../../scripts/invalid-imports.sh
```

The script should detect problems in each fixture file and exit with code 1.

## Fixture Files

- `invalid-runtime-depth.ts` - Runtime alias too deep (>2 levels)
- `invalid-type-depth.ts` - Types alias too deep (>2 levels)
- `relative-import.ts` - Relative import with parent directory (`../`)
- `relative-export.ts` - Relative export with parent directory (`../../`)
- `forbidden-const-alias.ts` - Use of `constants/*` alias (not allowed)
- `missing-type-modifier.ts` - Import from `inferred-types/types` without `type` keyword
- `multiple-imports.ts` - Multiple imports from the same source
- `valid-imports.ts` - Examples of correct import patterns

## Expected Detections

When running the script from this directory, you should see:

- `invalid-runtime-alias-depth`: 1 instance
- `invalid-type-alias-depth`: 1 instance
- `relative-path`: 2 instances (import + export)
- `forbidden-const-aliases`: 1 instance
- `missing-type-modifier`: 1 instance
- `multiple-imports-same-source`: 1 instance

## Integration with Tests

The automated test suite (`tests/globals-and-transpiled/import-problems.test.ts`) validates that:

1. The actual codebase has no import problems (exit code 0)
2. The script produces valid XML output
3. All expected validation sections are present

The fixtures are documented for manual testing and reference purposes.
