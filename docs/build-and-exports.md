# Build and Export System

This document describes the build process and export strategy for the `inferred-types` monorepo.

## Overview

The `inferred-types` project is a TypeScript monorepo that publishes a single npm package while maintaining internal modular structure. The package allows users to import from:

- `inferred-types` - All symbols (types, runtime, constants)
- `inferred-types/types` - Only type utilities
- `inferred-types/runtime` - Only runtime functions
- `inferred-types/constants` - Only constants

## Monorepo Structure

```txt
inferred-types/
├── package.json              # Main package (published)
├── pnpm-workspace.yaml       # PNPM workspace configuration
├── tsconfig.json             # Root TypeScript config
└── modules/
    ├── constants/            # Constants and enums
    │   ├── src/             # TypeScript source
    │   ├── dist/            # Built output (ESM + CJS + declarations)
    │   ├── tsconfig.json    # Module TS config
    │   ├── tsdown.config.ts # Build configuration
    │   └── package.json     # @inferred-types/constants (private)
    ├── types/               # Type utilities
    │   ├── src/
    │   ├── dist/
    │   ├── tsconfig.json
    │   ├── tsdown.config.ts
    │   └── package.json     # @inferred-types/types (private)
    ├── runtime/             # Runtime functions
    │   ├── src/
    │   ├── dist/
    │   ├── tsconfig.json
    │   ├── tsdown.config.ts
    │   └── package.json     # @inferred-types/runtime (private)
    └── inferred-types/      # Barrel exports module
        ├── src/             # Re-exports all modules
        ├── dist/            # Built re-export code
        ├── tsconfig.json
        ├── tsdown.config.ts
        └── package.json     # @inferred-types/inferred-types (private)
```

## Workspace Dependencies

The project uses **PNPM workspaces** for internal dependency management during development:

```yaml
# pnpm-workspace.yaml
packages:
    - modules/*
```

Each module is a private package with workspace dependencies:

- `@inferred-types/constants` - No dependencies
- `@inferred-types/types` - Depends on `@inferred-types/constants`
- `@inferred-types/runtime` - Depends on `@inferred-types/constants` and `@inferred-types/types`
- `@inferred-types/inferred-types` - Depends on all three modules

**Important:** These `@inferred-types/*` packages are **workspace dependencies only** and are **not published to npm**. They only exist during development.

## Build System

### Build Tool: tsdown

Each module uses [tsdown](https://github.com/sxzz/tsdown) for compilation:

- **Input:** TypeScript source files (`src/`)
- **Output:** ESM (`.js`), CommonJS (`.cjs`), and type declarations (`.d.ts`, `.d.cts`)
- **Configuration:** Each module has `tsdown.config.ts` and `tsconfig.tsdown.json`

### Build Order

Modules must be built in dependency order:

```bash
pnpm build:constants    # 1. Build constants (no dependencies)
pnpm build:types        # 2. Build types (depends on constants)
pnpm build:runtime      # 3. Build runtime (depends on types + constants)
pnpm -C modules/inferred-types build  # 4. Build inferred-types (depends on all)
```

Or use the root command which builds all in order:

```bash
pnpm build  # Builds all modules in correct order
```

### Build Configuration

Each module's `tsdown.config.ts`:

```ts
import { defineConfig } from "tsdown";

export default defineConfig({
    entry: ["src/index.ts"],
    format: ["esm", "cjs"],
    dts: true,              // Generate type declarations
    sourcemap: true,        # Generate sourcemaps
    tsconfig: "./tsconfig.tsdown.json",
});
```

The `tsconfig.tsdown.json` extends the module's main `tsconfig.json` but disables composite mode:

```json
{
    "$schema": "https://json.schemastore.org/tsconfig",
    "extends": "./tsconfig.json",
    "compilerOptions": {
        "composite": false
    }
}
```

## TypeScript Configuration Strategy

The project uses **different import strategies** for development vs. production:

### Development (Source Files)

During development, tests and other code import from **TypeScript source** using path aliases:

```ts
// In test files:
import { SomeType } from "inferred-types/types";
import { someFunction } from "inferred-types/runtime";
import { SOME_CONSTANT } from "inferred-types/constants";
```

These path aliases are defined in `tests/tsconfig.json`:

```json
{
  "compilerOptions": {
    "paths": {
      "inferred-types/types": ["../modules/types/src/index.ts"],
      "inferred-types/runtime": ["../modules/runtime/src/index.ts"],
      "inferred-types/constants": ["../modules/constants/src/index.ts"]
    }
  }
}
```

This allows:
- ✅ Fast development (no build step needed for tests)
- ✅ Direct access to source code
- ✅ Better IDE support and debugging

### Production (Published Package)

When the package is published, users import from **built dist files**. The root `package.json` defines exports:

```json
{
  "exports": {
    ".": {
      "types": "./modules/inferred-types/dist/index.d.ts",
      "import": "./modules/inferred-types/dist/index.js",
      "require": "./modules/inferred-types/dist/index.cjs"
    },
    "./types": {
      "types": "./modules/types/dist/index.d.ts",
      "import": "./modules/types/dist/index.js",
      "require": "./modules/types/dist/index.cjs"
    },
    "./runtime": {
      "types": "./modules/runtime/dist/index.d.ts",
      "import": "./modules/runtime/dist/index.js",
      "require": "./modules/runtime/dist/index.cjs"
    },
    "./constants": {
      "types": "./modules/constants/dist/index.d.ts",
      "import": "./modules/constants/dist/index.js",
      "require": "./modules/constants/dist/index.cjs"
    }
  },
  "files": [
    "modules/constants/dist",
    "modules/inferred-types/dist",
    "modules/runtime/dist",
    "modules/types/dist"
  ]
}
```

This configuration:
- ✅ Publishes only `dist` folders (no source code)
- ✅ Supports ESM and CommonJS
- ✅ Provides TypeScript declarations
- ✅ Allows selective imports for tree-shaking

## The `inferred-types` Module (Barrel Exports)

The `modules/inferred-types` module serves as a **barrel export** that re-exports all symbols from the other modules. This allows users to import everything from a single entry point.

### Historical Issue (Pre-Fix)

Originally, this module used **workspace imports**:

```ts
// modules/inferred-types/src/index.ts (OLD - BROKEN)
export * from "@inferred-types/constants";
export * from "@inferred-types/runtime";
export * from "@inferred-types/types";
```

**Problem:** When `tsdown` built this code, it **did not transform** these workspace imports. The transpiled output contained the same imports:

```js
// modules/inferred-types/dist/index.js (OLD - BROKEN)
export * from "@inferred-types/constants"
export * from "@inferred-types/runtime"
export * from "@inferred-types/types"
```

When users installed the package from npm:
- ❌ The `@inferred-types/*` packages don't exist (they're workspace dependencies)
- ❌ Import fails with: `Cannot find package '@inferred-types/constants'`
- ❌ Users cannot use the main `inferred-types` import

### Current Solution (Post-Fix)

The module now uses **relative imports to dist folders**:

```ts
// modules/inferred-types/src/index.ts (NEW - WORKING)
export * from "../../constants/dist/index.js";
export * from "../../runtime/dist/index.js";
export * from "../../types/dist/index.js";
```

When `tsdown` builds this, the transpiled output contains the same relative imports:

```js
// modules/inferred-types/dist/index.js (NEW - WORKING)
export * from "../../constants/dist/index.js"
export * from "../../runtime/dist/index.js"
export * from "../../types/dist/index.js"
```

When users install the package from npm:
- ✅ Relative imports resolve correctly to sibling `dist` folders
- ✅ All symbols are available from `inferred-types` import
- ✅ No missing package errors

### Build Dependencies

**Important Consequence:** The `inferred-types` module now depends on the **built output** of other modules, not their source.

This means:
- **Must build in order:** constants → types → runtime → inferred-types
- **Development workflow:** After changing a module, rebuild it and then rebuild `inferred-types`
- **Watch mode:** Use `pnpm watch` which rebuilds all modules on changes

## Import Patterns Summary

| Context | Import From | Resolves To | Use Case |
|---------|-------------|-------------|----------|
| Tests | `inferred-types/types` | `modules/types/src/index.ts` | Development testing |
| Tests | `inferred-types/runtime` | `modules/runtime/src/index.ts` | Development testing |
| Tests | `inferred-types/constants` | `modules/constants/src/index.ts` | Development testing |
| Within `types` module | `inferred-types/types` | `./src/index.ts` | Self-reference |
| Within `runtime` module | `inferred-types/types` | `../types/src/index.ts` | Cross-module dev |
| `inferred-types` module | `../../types/dist/index.js` | `modules/types/dist/index.js` | Re-export from build |
| External users | `inferred-types` | `modules/inferred-types/dist/index.js` | Main import |
| External users | `inferred-types/types` | `modules/types/dist/index.js` | Specific import |

## Testing Strategy

### Test Organization

Tests are located in `tests/` directory with subdirectories by feature area. The test configuration uses path aliases to import from source files.

### Global Export Tests

Special tests in `tests/globals-and-transpiled/` verify that the barrel exports work correctly:

- `global-export.test.ts` - Tests importing from the `inferred-types` module source
- `transpiled.test.ts` - Tests importing from the transpiled `dist` output
- `transpiled-runtime.test.ts` - Tests runtime symbols from transpiled output
- `transpiled-types.test.ts` - Tests type symbols from transpiled output

Run these tests with:

```bash
pnpm test:globals           # Run all global tests
pnpm test:globals:runtime   # Run only runtime tests
pnpm test:globals:types     # Run only type tests
```

### Test Path Aliases

The `tests/tsconfig.json` defines special path aliases for testing:

```json
{
  "compilerOptions": {
    "paths": {
      // Normal source imports (most common)
      "inferred-types/types": ["../modules/types/src/index.ts"],
      "inferred-types/runtime": ["../modules/runtime/src/index.ts"],
      "inferred-types/constants": ["../modules/constants/src/index.ts"],

      // For testing the inferred-types module source
      "inferred-types/inferred-types": ["../modules/inferred-types/src/index.ts"],

      // For testing transpiled output
      "transpiled": ["../modules/inferred-types/dist"],
      "transpiled/types": ["../modules/types/dist"],
      "transpiled/runtime": ["../modules/runtime/dist"],
      "transpiled/constants": ["../modules/constants/dist"]
    }
  }
}
```

## Publishing Process

### Pre-Publish Checklist

1. **Build all modules:**
   ```bash
   pnpm build
   ```

2. **Run all tests:**
   ```bash
   pnpm test
   pnpm test:globals
   pnpm test:types
   ```

3. **Verify dist output:**
   - Check `modules/inferred-types/dist/index.js` contains relative imports
   - Check `modules/*/dist/` folders contain all necessary files

4. **Test package locally:**
   ```bash
   pnpm pack
   # Creates inferred-types-x.y.z.tgz
   # Install in a test project to verify
   ```

### What Gets Published

Only the `dist` folders are published (see `files` field in `package.json`):

```
inferred-types-x.y.z.tgz
├── modules/
│   ├── constants/dist/
│   ├── types/dist/
│   ├── runtime/dist/
│   └── inferred-types/dist/
├── package.json
└── README.md (if present)
```

**Not included:**
- Source files (`src/`)
- Individual module `package.json` files
- Test files
- Build configuration

### Release Workflow

The project uses `bumpp` for releases:

```bash
pnpm release
```

This workflow:
1. Runs lint, install, test, and audit
2. Prompts for version bump (patch/minor/major)
3. Updates version in `package.json`
4. Creates git commit and tag
5. Pushes to GitHub
6. GitHub Actions publishes to npm, JSR, and GitHub Packages

See `CLAUDE.md` for detailed release process documentation.

## Common Build Issues and Solutions

### Issue: "Cannot find package '@inferred-types/...'"

**Symptom:** External users get this error when importing from `inferred-types`

**Cause:** The `inferred-types` module is using workspace imports instead of relative imports

**Solution:** Ensure `modules/inferred-types/src/index.ts` uses relative imports to dist folders

### Issue: Build order failures

**Symptom:** Build fails because a module can't find dependencies

**Cause:** Modules built out of order

**Solution:** Always build in dependency order: constants → types → runtime → inferred-types

Or use `pnpm build` which builds all in correct order

### Issue: TypeScript can't resolve dist imports

**Symptom:** TypeScript errors when `inferred-types` module imports from `../../*/dist/`

**Cause:** Dist folders don't exist or are out of date

**Solution:**
1. Build all dependency modules first
2. Ensure dist folders contain `index.js` and `index.d.ts`
3. Check `tsconfig.json` path resolution settings

### Issue: Tests fail after rebuilding modules

**Symptom:** Tests that were passing now fail

**Cause:** Mismatch between source and built code, or stale dist files

**Solution:**
1. Clean all dist folders: `find modules -name "dist" -type d -exec rm -rf {} +`
2. Rebuild all: `pnpm build`
3. Re-run tests: `pnpm test`

## Development Workflow

### Making Changes to a Module

1. Edit source files in `modules/{module-name}/src/`
2. Build the module: `pnpm -C modules/{module-name} build`
3. If other modules depend on it, rebuild them too
4. Build `inferred-types` module: `pnpm -C modules/inferred-types build`
5. Run tests: `pnpm test`

### Using Watch Mode

For active development, use watch mode:

```bash
pnpm watch
```

This runs parallel watchers for all modules, automatically rebuilding on changes.

### Adding a New Module

1. Create `modules/{new-module}/` directory
2. Add `package.json` with `@inferred-types/{new-module}` name
3. Add `tsconfig.json` with appropriate paths and references
4. Add `tsdown.config.ts` build configuration
5. Create `src/` directory with source files
6. Update root `package.json`:
   - Add export entry for `./new-module`
   - Add `modules/new-module/dist` to `files` array
7. Update `modules/inferred-types/src/index.ts` to re-export new module
8. Update `pnpm-workspace.yaml` if needed (usually automatic with `modules/*`)
9. Run `pnpm install` to register workspace
10. Build and test

## Architecture Decisions

### Why Private Workspace Packages?

The individual modules (`@inferred-types/*`) are marked as `"private": true` because:

- ✅ Simpler version management (single version number)
- ✅ Users don't need to install multiple packages
- ✅ Easier to maintain consistency across modules
- ✅ Cleaner import paths for users
- ❌ But requires careful build configuration (this document!)

### Why Relative Imports in `inferred-types` Module?

Using relative imports to dist folders (instead of workspace dependencies) because:

- ✅ Works correctly when published to npm
- ✅ No transformation needed during build
- ✅ Clear dependency on built output
- ❌ Requires build order discipline
- ❌ Can't use module source during development in this module

### Why Path Aliases in Tests?

Using path aliases that resolve to source files (not dist) because:

- ✅ Faster test execution (no build step needed)
- ✅ Better error messages and debugging
- ✅ IDE features work better with source files
- ✅ Can test during active development
- ❌ Requires careful tsconfig.json management

## Future Considerations

### Potential Improvements

1. **Build validation script:**
   - Check that all dist folders exist
   - Verify relative imports in `inferred-types` dist output
   - Ensure no workspace imports in transpiled code

2. **Automated build order:**
   - Topological sort of module dependencies
   - Parallel builds where possible
   - Fail fast on missing dependencies

3. **Enhanced testing:**
   - Test actual packaged tarball before publish
   - Automated external project integration test
   - Verify all exports work in both ESM and CJS

4. **Documentation generation:**
   - Auto-generate API docs from built types
   - Create visual dependency graph
   - Document all exported symbols

### Migration Path (If Needed)

If we ever need to publish separate packages:

1. Remove `"private": true` from module package.json files
2. Update import paths to use npm package names
3. Update release process to publish each module separately
4. Set up Lerna or similar for multi-package publishing
5. Update documentation for users

This would allow:
- Independent versioning of modules
- Users can install only what they need
- But adds complexity to maintenance

## Summary

The `inferred-types` build and export system:

- **Uses PNPM workspaces** for development organization
- **Builds with tsdown** to produce ESM, CJS, and declarations
- **Publishes a single package** with multiple entry points
- **Requires careful build order** due to inter-module dependencies
- **Uses relative imports** in the barrel export module to avoid workspace dependency issues
- **Provides flexible imports** for users (`inferred-types`, `inferred-types/types`, etc.)

Understanding this architecture is crucial for:
- Adding new features
- Debugging build issues
- Contributing to the project
- Publishing new versions
