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

### Release Workflow

1. the release uses the popular [`bumpp`](https://github.com/antfu-collective/bumpp) npm package (e.g., `pnpm release`) to interactively ask the user for:

  - the release number
  - get confirmation on the desire to commit
  - tag the commit locally
  - push to Github

2. a release based commit to the `main` branch uses the `.github/workflows/release.yml` workflow for Github Actions

  - while the `.github/workflows/test.yml` workflow _will_ be triggered too (as is any commit to `main`) the logic of this workflow will detect that this is a release and avoid running duplicative testing.

3. the bulk of the release work is done in the `yankeeinlondon/gha` repo's "publish.yml" workflow

    - this repo is separate from this repo but owned by the same people so changes to `yankeeinlondon/gha` can be made if appropriate.
    - this workflow will attempt to publish to [npm](https://www.npmjs.com/package/inferred-types) as a root package (aka, not namespaced), and to [JSR](https://jsr.io/@yankeeinlondon/inferred-types), and [Github Packages](https://github.com/inocan-group/inferred-types) under the workspace `inocan-group`
    - the workflow is considered successful only when ALL of the targets are published to
    - at the end of a successful publish workflow we call `npx changelogithub` to build a changelog into the release notes on Github

4. the [`changelogithub`](https://github.com/antfu/changelogithub) used in our release process is a variant of the popular [Conventional Commits](https://github.com/conventional-changelog/releaser-tools/tree/master/packages/conventional-github-releaser) library but with some additional features.
   - one of the underlying resources that **changelogithub** uses is the CLI from [chanelogen](https://github.com/unjs/changelogen)


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

The type testing framework uses `Expect` and `Assert*` utilities with these assertion types:

- `AssertEqual<T, E>` - exact type equality (most common)
- `AssertExtends<T, E>` - type extension relationship
- `AssertTrue<T>` - tests whether T is the type `true`
- `AssertFalse<T>` - tests whether T is the type `false`
- `AssertSameValues<T, E>` - array elements match (order-independent)
- `AssertContains<T, E>` - substring/array element containment

Example structure:
```ts
import { Expect, AssertEqual } from "inferred-types/types";

describe("MyUtility", () => {
    it("should transform types correctly", () => {
        type Result = MyUtility<"input">;

        type cases = [
            Expect<AssertEqual<Result, "expected">>
        ];
    });
});
```

## Code Quality Standards

### TODO Markers Are Forbidden

**TODO/FIXME/XXX/HACK markers in committed code are unacceptable.** When encountering a TODO:

1. **STOP** - Do not proceed with other work
2. **DESIGN** - Write technical design notes first
3. **IMPLEMENT** - Complete the implementation fully
4. **TEST** - Add comprehensive tests
5. **VERIFY** - Confirm no TODOs remain

Search for TODOs before committing:

```bash
rg -i "TODO|FIXME|XXX|HACK" modules/
```

### Type Utility Quality

Red flags for incomplete type utilities:

- Pass-through types: `export type MyUtility<T> = T;` (unless intentional)
- Using `any` as a cop-out
- Always returning the same type regardless of input
- TODO markers

### Function Implementation Quality

Red flags for incomplete functions:
- Returning mock/fake data
- Empty implementations with TODO comments
- Catching and hiding errors without proper handling
- Type assertions masking incomplete code: `return {} as Type;`

# important-instruction-reminders

Do what has been asked; nothing more, nothing less.
NEVER create files unless they're absolutely necessary for achieving your goal.
ALWAYS prefer editing an existing file to creating a new one.
NEVER proactively create documentation files (*.md) or README files. Only create documentation files if explicitly requested by the User.
ALWAYS create a stashed version of a function before changing it if the file has changes which are have not been committed

## Orchestration: Skills and Sub-agents

This section defines how to effectively use skills and sub-agents to manage context and deliver quality work.

### Overview: Skills vs Sub-agents

**Skills** (invoked via `Skill` tool):
- Lightweight consultations that load domain-specific guidance
- Minimal context window cost
- Use for quick reference, syntax checks, standards review
- Available: `planning`, `testing`, `development`, `parsing`

**Sub-agents** (invoked via `Task` tool):
- Autonomous agents that execute in separate contexts
- Heavy lifting that preserves main orchestrator context
- Use for complex, multi-step work
- **Custom:** `project-manager`, `phase-executor`
- **Built-in:** `Explore`, `general-purpose`

### Context Management Strategy

**Main Orchestrator** (Claude Code - you):
- High-level coordination
- User interaction and questions
- Simple, focused tasks
- Monitoring sub-agent progress

**Skills** (< 1k tokens each):
- Quick consultations before direct work
- Understanding syntax and patterns
- Reviewing quality standards

**Sub-agents** (isolated context):
- Codebase research and exploration
- Plan creation and maintenance
- Complete TDD cycle execution
- Complex multi-phase implementations

**Key principle:** Sub-agents preserve your main context window for coordination. Use them proactively for any substantial work.

### When to Use Skills Directly

Invoke skills when you need quick guidance before direct implementation:

**planning skill**:
- Before creating inline mini-plans
- Understanding TDD workflow structure
- Quick consultation on phase breakdown
- Triggers: "how should I approach...", "what's the TDD process..."

**testing skill** (MANDATORY BEFORE WRITING TESTS):
- Before writing ANY test file
- Understanding type test syntax (`type cases = [...]`)
- Reviewing canonical test examples
- Understanding runtime vs type test distinction
- Triggers: "write tests", "add test coverage", "TDD approach"

**development skill**:
- Before implementing features with uncommitted changes
- Understanding TODO prevention requirements
- Reviewing quality standards
- Understanding completion criteria
- Triggers: "implement feature", "build functionality", "add capability"

**parsing skill**:
- Understanding parsing utilities in this library
- Working with template literal types
- Text transformation patterns

**CRITICAL RULES:**
1. **ALWAYS invoke `testing` skill** before writing tests (prevents runtime/type test confusion)
2. **ALWAYS invoke `development` skill** before implementing with uncommitted changes
3. Skills are consultations, not substitutes for sub-agents

### When to Use Sub-agents

Use sub-agents to preserve context and leverage specialized capabilities:

#### Custom Project Sub-agents

**project-manager** (`.claude/agents/project-manager.md`):
- Creating comprehensive project plans
- Breaking down features into TDD phases
- Updating existing plans
- Output: Plan file in `.ai/plans/YYYY-MM-DD-{name}.md`
- Triggers: "plan this feature", "create a roadmap", "break this down into phases"

**phase-executor** (`.claude/agents/phase-executor.md`):
- Executing complete TDD cycle for ONE phase
- Has all three skills (planning, testing, development)
- Follows: SNAPSHOT → CREATE LOG → WRITE TESTS → IMPLEMENT → TODO SCAN → CLOSEOUT
- Output: Phase log in `.ai/logs/` + implemented code
- Triggers: "execute phase N", "implement phase", "TDD cycle for..."

**See `.claude/agents/README.md` for detailed workflow patterns and examples.**

#### Built-in Sub-agents

**Explore**:
- Broad codebase research
- Finding patterns across multiple files
- Understanding architecture
- Triggers: "how does X work?", "where is Y handled?", "what's the structure of..."
- **IMPORTANT:** Use instead of direct Grep/Glob for open-ended searches

**general-purpose**:
- Complex multi-step research
- Tasks requiring multiple tool combinations
- When other sub-agents don't fit

### Decision Tree

```
┌─ Task Request
│
├─ Is this a quick consultation? (< 5 min)
│  └─ YES → Invoke appropriate Skill, then proceed
│
├─ Is this codebase research/exploration?
│  └─ YES → Use Explore sub-agent
│
├─ Does this need a comprehensive plan?
│  └─ YES → Use project-manager sub-agent
│
├─ Is this executing a complete phase from a plan?
│  └─ YES → Use phase-executor sub-agent
│
├─ Is this direct implementation work?
│  ├─ Are you about to write tests?
│  │  └─ YES → MANDATORY: Invoke testing skill first
│  ├─ Are there uncommitted changes?
│  │  └─ YES → MANDATORY: Invoke development skill first
│  └─ Proceed with implementation
│
└─ Is this complex, multi-step, context-heavy?
   └─ YES → Use general-purpose sub-agent
```

### Workflow Examples

**Example 1: User asks to add new feature**
```
1. Use project-manager sub-agent → creates plan
2. Review plan with user
3. For each phase: Use phase-executor sub-agent
4. Monitor via logs, coordinate, handle blockers
```

**Example 2: User asks "how does error handling work?"**
```
1. Use Explore sub-agent → researches codebase
2. Agent returns findings
3. Summarize for user
```

**Example 3: User asks to add tests**
```
1. Invoke testing skill → review type test syntax
2. Write tests directly in main context
3. Simple, focused task
```

**Example 4: User asks to implement function**
```
1. Check git status for uncommitted changes
2. If uncommitted: Invoke development skill
3. Implement function directly
4. Simple, focused task
```

### Mandatory Requirements Summary

**Before ANY test writing:**
- [ ] MUST invoke `testing` skill
- [ ] Review type test syntax examples
- [ ] Understand `type cases = [...]` pattern

**Before implementing with uncommitted changes:**
- [ ] MUST invoke `development` skill
- [ ] Review TODO prevention requirements
- [ ] Understand quality standards

**For codebase exploration:**
- [ ] PREFER Explore sub-agent over direct Grep/Glob
- [ ] Preserves context for open-ended searches

**For complex work:**
- [ ] PREFER appropriate sub-agent
- [ ] Preserves main context window
- [ ] Leverages specialized capabilities
