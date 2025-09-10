# AGENTS.md - Guidelines for Agentic Coding in inferred-types

## Build & Test Commands

- `pnpm build`: Build all modules
- `pnpm test`: Run all tests
- `pnpm test <file>`: Run specific test file (e.g., `pnpm test datetime/asDate.test.ts`)
- `pnpm test FILTER_PATTERN`: Run tests matching a pattern
- `pnpm lint`: Lint all modules
- `typed test`: Run type tests
- `typed test <pattern>`: Run type tests matching pattern

## Code Style Guidelines

- **Imports**: Group imports by type (external, internal, types). Use non-relative imports.
- **Formatting**: 4-space indentation, double quotes, semicolons, max line length 100.
- **Types**: Prefer narrow types. Use `type` over `interface`. Avoid `any`/`unknown`.
- **Naming**: PascalCase for types, camelCase for runtime. Prefix unused vars with `_`.
- **Error Handling**: Use `Err<T>` for errors.
- **Testing**: Type utilities need type tests. Runtime functions need both. Use `Expect` and `Test` for type tests.

## Monorepo Structure (PNPM Workspace)

- **`modules/constants/`** - Runtime constants and enumerated types
- **`modules/types/`** - Core type utilities (heart of the project)
- **`modules/runtime/`** - Runtime functions with strong type information
- **`modules/inferred-types/`** - Main package that exports everything

Check `README.md` files in module `src` subdirectories for additional context.


