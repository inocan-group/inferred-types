# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

**inferred-types** is a TypeScript monorepo library providing advanced type utilities that maintain strong, narrow typing with runtime functions that mirror type-level operations. The library bridges TypeScript's type system and runtime behavior, focusing on "self-documenting" code with comprehensive type-level documentation.

## Architecture

### Monorepo Structure (PNPM Workspace)

- **`modules/constants/`** - Runtime constants and enumerated types
- **`modules/types/`** - Core type utilities (heart of the project)
- **`modules/runtime/`** - Runtime functions with strong type information
- **`modules/inferred-types/`** - Main package that exports everything

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
- **Type tests**: Custom `type-test` CLI for validating TypeScript behavior
- **Test organization**: `/tests/` directory with subdirectories by feature area
- **Module aliases**: Configured in Vitest for clean imports during testing

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
