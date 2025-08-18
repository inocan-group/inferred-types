# QWEN.md

This file provides guidance to Qwen Code when working with code in this repository.

## Project Overview

**inferred-types** is a TypeScript monorepo library providing advanced type utilities that maintain strong, narrow typing with runtime functions that mirror type-level operations. The library bridges TypeScript's type system and runtime behavior, focusing on "self-documenting" code with comprehensive type-level documentation.

## Architecture

### Monorepo Structure (PNPM Workspace)

- **`modules/constants/`** - Runtime constants and enumerated types
- **`modules/types/`** - Core type utilities (heart of the project)
- **`modules/runtime/`** - Runtime functions with strong type information
- **`modules/inferred-types/`** - Main package that exports everything

Any directory inside any of the modules's `src` subdirectories which has a `README.md` file provides additional context about the source code which resides in that subdirectory (and below).

### Key Design Principle

Many runtime functions have corresponding types (e.g., `ensureLeading()` ↔ `EnsureLeading<T>`). This synchronization between design-time types and runtime values is fundamental to the library's architecture.

## Common Development Commands

### Building

```bash
# Build all modules
pnpm build

# Watch mode (parallel build + test watching)
pnpm watch
```

### Testing

```bash
# Run all tests
pnpm test

# Watch mode testing
pnpm test:watch

# Test UI
pnpm test:ui

# Type-only testing (custom CLI tool)
pnpm test:types
```

### Linting & Quality

```bash
# Lint all modules
pnpm lint

# Type audits for specific modules
pnpm audit:types
pnpm audit:runtime
pnpm audit:constants
```

### Single Test Execution

Use Vitest's filtering for specific tests:

```bash
# Run specific test file
pnpm test datetime/asDate.test.ts

# Run tests matching pattern
pnpm test --grep "EnsureLeading"

# Run tests from current working directory
pnpm test
```

## Module-Level Development

Each module (`constants`, `types`, `runtime`, `inferred-types`) has consistent scripts:

- `pnpm -C modules/[module-name] build` - Build specific module
- `pnpm -C modules/[module-name] test` - Test specific module
- `pnpm -C modules/[module-name] lint` - Lint specific module
- `pnpm -C modules/[module-name] watch` - Watch mode for specific module

### Importing Rules

- you should NEVER import from `@inferred-types/types`, `@inferred-types/runtime`, or `@inferred-types/constants`!
- relative imports should also be avoided
- in 99% of the cases you should import from one of the following sources:
  - `inferred-types/constants`
  - `inferred-types/types`
  - `inferred-types/runtime`
- if you need to resolve a circular dependency or reference a symbol then you can consider importing more deeply into the different modules with:
  - `runtime/path/to/dep`
  - `types/path/to/dep`
  - `constants/path/to/dep`
- typically this deeper import should only be done for deps within the same modules

## Build System

- **Primary tool**: `tsdown` for TypeScript compilation

    ```bash
    pnpm build # will run tsdown with correct configuration
    ```

- **Output formats**: ESM, CJS, and TypeScript declarations
- **Custom type testing**: `type-test.mjs` CLI tool for TypeScript type behavior validation
- **Dependencies**: Modules have workspace dependencies allowing cross-module imports

## Testing Framework

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
    pnpm test:types datetime
    ```

- **Test organization**: `/tests/` directory with subdirectories by feature area
- **Module aliases**: Configured in Vitest for clean imports during testing

### Type Testing Philosophy

Type testing is crucial in this repo focused on narrow, high-quality types:

- **All type utilities** must be thoroughly tested to ensure intended function and avoid "complex and possibly infinite" type errors
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

**Test comparison types:**

- `equals` - exact type equality
- `extends` - type extension relationship
- `hasSameKeys` - dictionary key comparison
- `hasSameValues` - container value comparison (order-independent)
- `isError<T>` - error type testing (supports Error types, string error types, or generic error checking)

## Release Process

```bash
# Full release workflow
pnpm release
```

This runs: lint → install latest → test CI → audit fix → version bump

## Important File Patterns

- **Type utilities**: Located in `modules/types/src/` with extensive sub-categorization
- **Runtime functions**: Located in `modules/runtime/src/` mirroring type structure
- **Constants**: Located in `modules/constants/src/` for shared enums and values
- **Tests**: Organized in `/tests/` with same structure as source modules
- **Benchmarks**: Type performance tests in `/benches/` directory

## Development Workflow Notes

- The library maintains strong typing discipline - preserve narrow types wherever possible
- Runtime functions should mirror their corresponding type utilities when applicable
- All new utilities require both runtime and type tests
- Type performance benchmarks should be added for new type utilities when feasible
- The project uses ESLint with `@antfu/eslint-config` and custom overrides

## TypeScript Limitations and Cross-Module Issues

This codebase has experienced TypeScript limitations where complex types behave differently when evaluated across module boundaries:

- **Cross-module type resolution**: Some type utilities (like `Slice<T, Delta>`) may resolve to empty string when called from external modules but work correctly within the same file
- **Workaround strategy**: When encountering cross-module type resolution issues, implement local versions of problematic utilities within the same file
- **This is a TypeScript limitation**, not a logic error in the code
- **Testing approach**: Both `pnpm test` (runtime) and `pnpm test:types` (type-level) should pass for all utilities

## Type Testing Execution Details

Type tests use a custom CLI tool separate from npm scripts:

```bash
# NOT npm commands - use directly:
typed test                    # Test all type files
typed test datetime  # Test filtered files
```

The type testing framework uses `Test` and `Expect` utilities with these comparison operators:
- `equals` - exact type equality (most common)
- `extends` - type extension relationship
- `hasSameKeys` - dictionary key comparison
- `hasSameValues` - container value comparison (order-independent)
- `isError<T>` - error type testing

## Qwen-Specific Guidelines

When working with this repository:

1. **Always preserve strong typing**: The core value proposition of this library is maintaining narrow, precise types. Never weaken type definitions.

2. **Maintain runtime/type synchronization**: When modifying or creating runtime functions, ensure corresponding type utilities are also updated to maintain the 1:1 relationship.

3. **Follow import conventions strictly**: Use the established import patterns to avoid circular dependencies and maintain module boundaries.

4. **Comprehensive testing is required**: Every change must include both runtime tests (Vitest) and type tests (typed-tester). 

5. **Respect the monorepo structure**: Understand that this is a PNPM workspace with multiple interconnected modules, each with specific responsibilities.

6. **Prioritize self-documenting code**: Type utilities should have clear JSDoc comments explaining their purpose and usage with examples when appropriate.

7. **Be aware of TypeScript limitations**: Some complex types may behave differently when used across module boundaries. Test thoroughly in both contexts.