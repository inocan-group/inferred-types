# AGENTS.md - Guidelines for Agentic Coding in inferred-types

## Build & Test Commands

- `pnpm build`: Build all modules
- `pnpm test`: Run all tests
- `pnpm test <file>`: Run specific test file (e.g., `pnpm test datetime/asDate.test.ts`)
- `pnpm test --grep "pattern"`: Run tests matching a pattern
- `pnpm lint`: Lint all modules

## Code Style Guidelines

- **Imports**: Group imports by type (external, internal, types).
- **Formatting**: 2-space indentation, max line length 100.
- **Types**: Prefer narrow types. Use `type` over `interface`.
- **Naming**: PascalCase for types, camelCase for runtime.
- **Error Handling**: Use `Err<T>` for errors. Avoid `any`/`unknown`.
- **Testing**: Type utilities need runtime tests. Use `Expect` and `Test` for type tests.

## Type Testing

- Run type tests with `typed test` or `typed test --filter <pattern>`.
- Type tests use `Expect` and `Test` utilities for assertions.
- `Test` comparisons: `equals`, `extends`, `hasSameKeys`, `hasSameValues`, `isError<T>`.

## Monorepo Structure

- `modules/constants/`: Runtime constants.
- `modules/types/`: Core type utilities.
- `modules/runtime/`: Runtime functions.
- `modules/inferred-types/`: Main package.
