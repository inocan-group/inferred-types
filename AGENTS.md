# AGENTS.md - Guidelines for Agentic Coding in inferred-types

## Build & Test Commands

- `pnpm build`: Build all modules
- `pnpm test`: Run all tests
- `pnpm test <file>`: Run specific test file (e.g., `pnpm test datetime/asDate.test.ts`)
- `pnpm test FILTER_PATTERN`: Run tests matching a pattern
- `pnpm lint`: Lint all modules

## Code Style Guidelines

- **Imports**: Group imports by type (external, internal, types).
- **Formatting**: 2-space indentation, max line length 100.
- **Types**: Prefer narrow types. Use `type` over `interface`.
- **Naming**: PascalCase for types, camelCase for runtime.
- **Error Handling**: Use `Err<T>` for errors. Avoid `any`/`unknown`.
- **Testing**: Type utilities need runtime tests. Use `Expect` and `Test` for type tests.

## Testing

Testing is composed of two main types:

- Runtime testing tests the runtime values of variables
- Type testing tests the _types_ of variables

When testing Type Utilities we rely exclusively on "type testing" but for runtime functions we typically use both runtime and type testing.

### Runtime Testing

- we use **Vitest** as the test runner
- common commands are:

    ```bash
    # test all files
    pnpm test
    # test filtered list of files
    pnpm test datetime
    ```

### Type Testing

- Run type tests with `typed test` or `typed test <pattern>`.
- Type tests use `Expect` and `Test` utilities for assertions.
- `Test` comparisons: `equals`, `extends`, `hasSameKeys`, `hasSameValues`, `isError<T>`.


## Linting

We use **eslint** to provide linting services and you can run `pnpm lint` to identify linting issues across all modules.

## Monorepo Structure (PNPM Workspace)

- **`modules/constants/`** - Runtime constants and enumerated types
- **`modules/types/`** - Core type utilities (heart of the project)
- **`modules/runtime/`** - Runtime functions with strong type information
- **`modules/inferred-types/`** - Main package that exports everything

Any directory inside any of the modules's `src` subdirectories which has a `README.md` file provides additional context about the source code which resides in that subdirectory (and below).


