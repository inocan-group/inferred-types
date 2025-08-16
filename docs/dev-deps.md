# DevOps Tools & Packages Documentation

This document provides context and information about the key DevOps tools and packages used in the inferred-types project.

## Package Management & Build Tools

### tsdown

**Purpose**: The elegant bundler for libraries powered by Rolldown
**Repository**: rolldown/tsdown
**Trust Score**: 8.9

Tsdown is a blazing-fast, elegant bundler for JavaScript/TypeScript libraries. It's powered by Rolldown and Oxc, providing declaration file generation, plugin ecosystem support, and an easy-to-use, pre-configured experience.

**Key Features**:

- TypeScript compilation with declaration files
- Multiple output formats (ESM, CJS, UMD, IIFE)
- Plugin system
- Watch mode for development
- Tree-shaking optimization
- Source map generation
- Minification support

**Common Usage**:

```bash
# Install
npm install -D tsdown

# Basic usage
npx tsdown

# With configuration
tsdown --format esm,cjs --minify

# Watch mode
tsdown --watch
```

**Configuration Example**:

```typescript
import { defineConfig } from 'tsdown'

export default defineConfig({
  entry: ['./src'],
  format: ['esm', 'cjs'],
  outDir: 'dist',
  dts: true,
  clean: true,
})
```

### jiti

**Purpose**: Runtime TypeScript and ESM support for Node.js
**Repository**: unjs/jiti
**Trust Score**: 9.7

Jiti provides runtime TypeScript compilation and ES module support, allowing you to run TypeScript files directly in Node.js without pre-compilation.

**Key Features**:

- Runtime TypeScript compilation
- ESM compatibility
- Zero configuration
- Alias support
- Global registration
- CLI interface

**Common Usage**:

```bash
# CLI usage
npx jiti ./index.ts

# With Node.js loader
node --import jiti/register index.ts
```

**Programmatic Usage**:

```javascript
import { createJiti } from "jiti";
const jiti = createJiti(import.meta.url);

// Async import
const mod = await jiti.import("./path/to/file.ts");

// With options
const jiti = createJiti(import.meta.url, { debug: true });
```

## Testing Framework

### Vitest

**Purpose**: Next generation testing framework powered by Vite
**Repository**: vitest-dev/vitest
**Trust Score**: 8.3

Vitest is a blazing-fast unit testing framework that provides Jest compatibility with native ES modules, TypeScript, and JSX support out of the box.

**Key Features**:

- Jest-compatible API
- Native ES modules support
- TypeScript/JSX support
- Parallel test execution
- Watch mode
- Code coverage
- Browser testing mode
- Benchmarking
- Snapshot testing
- Mocking capabilities

**Installation & Setup**:

```bash
# Install
npm install -D vitest

# With coverage
npm install -D vitest @vitest/coverage-v8
```

**Configuration Example**:

```typescript
import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    environment: 'node',
    coverage: {
      provider: 'v8'
    },
    setupFiles: ['./tests/setup.ts'],
  },
})
```

**Common Commands**:

```bash
# Run tests
vitest

# Run with coverage
vitest run --coverage

# Watch mode
vitest --watch

# UI mode
vitest --ui
```

## Environment Management

### cross-env (Alternative)

**Purpose**: Cross-platform environment variable management
**Repository**: caarlos0/env (Go library for environment parsing)
**Trust Score**: 9.7

While the main cross-env package provides cross-platform environment variable setting, the env library provides structured environment variable parsing in Go applications.

**Features**:

- Cross-platform compatibility
- Structured environment parsing
- Type-safe configuration
- Default values support
- Validation capabilities

**Usage Example**:

```go
type config struct {
  Home string `env:"HOME"`
  Port int    `env:"PORT" envDefault:"8080"`
}

// Parse environment variables
cfg, err := env.ParseAs[config]()
```

## Type Utilities

### typecheck (Runtime Type Checking)

**Purpose**: Runtime type validation and checking utilities for JavaScript/TypeScript
**Package**: Various npm packages (type-check, check-types, typechecker)
**Category**: Runtime Type Safety

Several npm packages provide runtime type checking capabilities to complement TypeScript's compile-time type checking.

**Key Packages**:

#### type-check

- **Description**: Check types of JavaScript values at runtime with Haskell-like type syntax
- **Usage**: Great for validating external input, testing, or adding safety to internal code
- **Installation**: `npm install type-check`

#### check-types

- **Description**: Zero-dependency library for asserting types and values
- **Features**: Lightweight (2.5kb gzipped), provides predicates returning true/false
- **Installation**: `npm install check-types`

#### typechecker

- **Description**: Utilities to get and check variable types (isString, isPlainObject, isRegExp, etc.)
- **Features**: Comprehensive type checking utilities including `isPlainObject`
- **Installation**: `npm install typechecker`

**Common Usage Patterns**:

```javascript
// type-check example
import { typeCheck } from 'type-check';

// Validate data structure
const isValid = typeCheck('Number', 42); // true
const isValidArray = typeCheck('[Number]', [1, 2, 3]); // true

// check-types example
import * as check from 'check-types';

if (check.string(input)) {
  // input is guaranteed to be a string
}

// typechecker example
import { isPlainObject, isString } from 'typechecker';

if (isPlainObject(data) && isString(data.name)) {
  // Safe to access data.name as string
}
```

**Integration with TypeScript**:

- Use `@types/type-check` for TypeScript definitions
- Complement compile-time type checking with runtime validation
- Essential for validating external API responses and user input

## Development Workflow Integration

These tools integrate into the inferred-types development workflow as follows:

1. **tsdown** - Primary build tool for creating library distributions
2. **jiti** - Runtime TypeScript execution for development scripts
3. **Vitest** - Testing framework for both runtime and type testing
4. **Environment tools** - Configuration and environment management
5. **typecheck** - Runtime type validation for external inputs and testing

## Best Practices

- Use **tsdown** for production builds with appropriate target configurations
- Leverage **jiti** for development scripts that need TypeScript support
- Implement comprehensive testing with **Vitest** including type testing
- Manage environment variables consistently across platforms
- Use **typecheck** libraries for runtime validation of external data and API inputs

## Related Commands

```bash
# Build with tsdown
pnpm build

# Test with Vitest
pnpm test

# Type testing
pnpm test:types

# Development with jiti
pnpm jiti ./scripts/dev-script.ts
```

This documentation reflects the tools' capabilities and integration patterns within the inferred-types project architecture.
