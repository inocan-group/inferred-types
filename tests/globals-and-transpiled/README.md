# Transpiled/Bundle Testing

This directory contains tests for validating the bundled output and how external consumers will use the package.

## Problem Statement

When testing monorepo packages with Vitest, there's a mismatch between:
1. **Development environment**: Tests run with access to workspace dependencies and source code
2. **Consumer environment**: Users install from npm and only have access to bundled dist files

This can lead to tests passing during development but the package failing when consumed.

## Solution: Integration Testing

We use a separate integration test script that runs **outside Vitest** to accurately test the bundled output.

### Run Bundle Tests

```bash
pnpm test:bundle
```

This executes `scripts/test-bundle.mjs` which:

- ✅ Tests the actual bundled `dist/index.js` file
- ✅ Verifies ESM imports work correctly
- ✅ Tests runtime functions execute properly
- ✅ Checks for workspace reference leaks (`@inferred-types/*`)
- ✅ Validates no problematic relative imports (`../`)
- ✅ Confirms `package.json` exports are correct
- ✅ Tests TypeScript declaration files
- ✅ Verifies constants are exported correctly

### What Gets Tested

The integration test validates how consumers will actually use the package:

```javascript
// How consumers import from the package
import { ensureLeading, asArray } from 'inferred-types';

// Runtime functions work
const result = ensureLeading('test', '/'); // '/test'

// Constants are available
import { LOWER_ALPHA_CHARS } from 'inferred-types';
```

## Test Files in This Directory

### `transpiled.test.ts` (Skipped)
- **Why skipped**: Vitest has circular dependency issues with the bundled code
- **Replacement**: Use `pnpm test:bundle` instead

### `transpiled-runtime.test.ts` (Skipped)
- **Why skipped**: Same Vitest circular dependency issue
- **Replacement**: Use `pnpm test:bundle` instead

### `transpiled-types.test.ts` (Active)
- Tests individual module dist outputs (not the main bundle)
- Uses `transpiled/types` alias → `modules/types/dist/index.js`

### `global-export.test.ts` (Active)
- Tests TypeScript types from **source code** during development
- Not a bundle test - validates type utilities work correctly

### `import-problems.test.ts` (Active)
- Validates import patterns follow project guidelines
- Ensures no workspace references or relative imports in source

## Additional Validation

For even more thorough testing, you can validate the actual npm package:

```bash
# Pack the package
pnpm pack

# This creates: inferred-types-1.1.1.tgz

# In a separate test project:
npm install /path/to/inferred-types-1.1.1.tgz

# Then import and test
import { ensureLeading } from 'inferred-types';
```

## Why Not Use Vitest?

Vitest's module loader handles the bundled code differently than Node's native module loader:

- **Vitest context**: Circular dependency errors due to how it initializes modules
- **Node/npm context**: Works perfectly - consumers won't experience these issues

By testing outside Vitest with Node's native module loader, we get accurate results that reflect real-world usage.

## CI/CD Integration

The bundle test should be added to your CI pipeline:

```yaml
# .github/workflows/test.yml
- name: Test Bundle
  run: pnpm test:bundle
```

This ensures every commit produces a valid, consumable package.
