# AGENTS.md - Guidelines for Agentic Coding in inferred-types

## Build & Test Commands

- `pnpm build`: Build all modules
- `pnpm test`: Run all tests
- `pnpm test:watch`: Watch mode testing
- `pnpm test:ui`: Test UI
- `pnpm test:types`: Type-only testing
- `pnpm test <file>`: Run specific test file (e.g., `pnpm test datetime/asDate.test.ts`)
- `pnpm test --grep "pattern"`: Run tests matching a pattern

## Monorepo Structure (PNPM Workspace)

- **`modules/constants/`** - Runtime constants and enumerated types
- **`modules/types/`** - Core type utilities (heart of the project)
- **`modules/runtime/`** - Runtime functions with strong type information
- **`modules/inferred-types/`** - Main package that exports everything


## Code Style Guidelines

- **Imports**: Group imports by type (external, internal, types) with newlines between groups.
- **Formatting**: 2-space indentation, no trailing whitespace, max line length 100.
- **Types**: Prefer narrow types (`string` → `"foo" | "bar"`). Use `type` over `interface` unless extending.
- **Naming**: PascalCase for types, camelCase for runtime, UPPER_CASE for constants.
- **Error Handling**: Use `Err<T>` type for errors. Avoid `any` and `unknown` unless necessary.
- **Testing**: All type utilities must have corresponding runtime tests. Use `Expect` and `Test` utilities for type tests.

## Linting & Quality

- `pnpm lint`: Lint all modules
- `pnpm audit:types`: Type audits for specific modules


## Testing Framework

All tests are identifies using the glob pattern: `tests/**/*.test.ts`

- **Runtime tests**: Vitest with configuration in `vitest.config.ts`

    ```sh
    # test all
    pnpm test
    # test matching
    pnpm test datetime
    ```

- **Type tests**: Use `pnpm test:types` or `typed test` to test type files

    ```sh
    # type test all test files
    pnpm test:types
    # type test a filtered down set of files
    pnpm test:types --filter datetime
    ```

- **Test organization**: `/tests/` directory with subdirectories by feature area
- **Module aliases**: Configured in Vitest for clean imports during testing

### Type Testing Philosophy

Type testing is crucial in this repo focused on narrow, high-quality types:

- **All type utilities** must be thoroughly tested to ensure intended function and avoid "complex and possibly infinite" type errors; these tests will 100% rely on "type tests"
- **Runtime functions** should be tested for both runtime output AND types - these must always be aligned
- **Type tests are valued equally** with runtime tests

### Type Test Structure

Type tests use the `Expect` and `Test` utilities:

```ts
import { Expect, Test } from "inferred-types/types";

type cases = [
    Expect<Test<ActualType, "equals", ExpectedType>>,
    // More test cases...
];
```


