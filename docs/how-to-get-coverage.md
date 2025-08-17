# Coverage Testing for Inferred-Types

This document provides guidance on implementing coverage testing for the inferred-types monorepo, addressing both runtime and type-level coverage concerns.

## Table of Contents

- [Current Architecture Considerations](#current-architecture-considerations)
- [Runtime Coverage with Vitest](#runtime-coverage-with-vitest)
- [Type Coverage Strategies](#type-coverage-strategies)
- [Implementation Roadmap](#implementation-roadmap)
- [Future typed-tester Enhancements](#future-typed-tester-enhancements)

## Current Architecture Considerations

### Monorepo Structure with Single Test Directory

The inferred-types project has a unique structure:

- **Monorepo**: Multiple modules (`constants`, `types`, `runtime`, `inferred-types`)
- **Single test directory**: All tests live in `/tests/` rather than per-module
- **Mixed test types**: Both runtime tests (via Vitest) and type tests (via typed-tester)

#### Advantages of Single Test Directory for Coverage

1. **Unified reporting**: Coverage reports naturally aggregate across all modules
2. **Simpler configuration**: One coverage configuration at the root level
3. **Easier cross-module testing**: Tests can easily verify integration between modules
4. **Single source of truth**: All test metrics come from one location

#### Challenges

1. **Module attribution**: Harder to determine which module has low coverage
2. **Path mapping**: Need to map test paths back to module source paths
3. **Mixed test types**: Runtime and type tests need different coverage approaches

## Runtime Coverage with Vitest

### Basic Setup

1. **Install coverage provider**:

   ```bash
   # For speed (recommended for large codebases)
   pnpm add -D @vitest/coverage-v8

   # For accuracy (better branch coverage)
   pnpm add -D @vitest/coverage-istanbul
   ```

2. **Configure vitest.config.ts**:

   ```typescript
   import { defineConfig } from "vite";
   import { join, resolve } from "pathe";

   export default defineConfig({
     test: {
       coverage: {
         provider: 'v8', // or 'istanbul'
         enabled: true,
         reporter: ['text', 'json', 'html', 'lcov'],
         reportsDirectory: './coverage',

         // Map coverage to source modules
         include: [
           'modules/constants/src/**/*.ts',
           'modules/runtime/src/**/*.ts',
           // Note: type utilities won't have runtime coverage
         ],

         exclude: [
           '**/node_modules/**',
           '**/dist/**',
           '**/tests/**',
           '**/*.test.ts',
           '**/*.spec.ts',
           '**/index.ts', // Often just re-exports
         ],

         // Thresholds (adjust based on your standards)
         thresholds: {
           statements: 80,
           branches: 75,
           functions: 80,
           lines: 80,
         },

         // For monorepos: ensure all source files are included
         all: true,
       }
     }
   });
   ```

3. **Update package.json scripts**:

   ```json
   {
     "scripts": {
       "test:coverage": "vitest run --coverage",
       "test:coverage:ui": "vitest --coverage --ui",
       "coverage:report": "vitest run --coverage && open coverage/index.html"
     }
   }
   ```

### Monorepo-Specific Configuration

For better module-level insights:

```typescript
// vitest.config.ts
export default defineConfig({
  test: {
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json-summary', 'json', 'html'],

      // Custom reporter for per-module metrics
      reportOnFailure: true,
      skipFull: false,

      // Use comment markers to identify module boundaries
      watermarks: {
        statements: [50, 80],
        functions: [50, 80],
        branches: [50, 80],
        lines: [50, 80]
      },

      // Generate per-module reports
      subdir: ({ projectName }) => projectName,
    }
  }
});
```

### CI/CD Integration

Add coverage to your GitHub Actions workflow:

```yaml
# .github/workflows/test.yml
name: Testing with Coverage

on:
  push:
    branches: [main]
  pull_request:

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: '22.x'
      - uses: pnpm/action-setup@v2

      - name: Install dependencies
        run: pnpm install

      - name: Build
        run: pnpm build

      - name: Test with coverage
        run: pnpm test:coverage

      - name: Upload coverage to Codecov
        uses: codecov/codecov-action@v3
        with:
          files: ./coverage/lcov.info
          flags: unit-tests
          name: codecov-umbrella

      - name: Archive coverage reports
        uses: actions/upload-artifact@v3
        with:
          name: coverage-report
          path: coverage/
```

## Type Coverage Strategies

### Current State: typed-tester

Your `typed-tester` tool already provides:

- Test file analysis
- Type test execution
- Symbol tracking
- Performance metrics
- JSON output with detailed metrics

### Approach 1: Enhance typed-tester for Coverage

#### Metrics to Track

1. **Type Utility Coverage**:

   ```typescript
   interface TypeCoverageMetrics {
     // Per module
     module: string;

     // Type utilities
     totalTypeUtilities: number;
     testedTypeUtilities: number;
     untestedTypeUtilities: string[];

     // Test quality
     averageTestsPerUtility: number;
     utilitiesWithMultipleTests: number;

     // Complexity metrics
     complexTypeUtilities: string[]; // Based on AST depth
     infiniteTypeRisks: string[]; // Detected circular references
   }
   ```

2. **Implementation for typed-tester**:

   ```typescript
   // Pseudo-code for coverage calculation
   async function calculateTypeCoverage() {
     const allTypeUtilities = await findAllTypeUtilities('modules/types/src');
     const testedUtilities = await findTestedUtilities('tests');

     const coverage = {
       total: allTypeUtilities.length,
       tested: testedUtilities.length,
       percentage: (testedUtilities.length / allTypeUtilities.length) * 100,
       untested: allTypeUtilities.filter(u => !testedUtilities.includes(u))
     };

     return coverage;
   }
   ```

### Approach 2: Use type-coverage Tool

Install and configure the existing `type-coverage` tool:

```bash
pnpm add -D type-coverage

# Add to package.json
{
  "scripts": {
    "type:coverage": "type-coverage --project tsconfig.json --detail --strict"
  }
}
```

This measures how many identifiers have explicit types vs `any`.

### Approach 3: Custom Type Coverage System

Create a custom analyzer that:

1. **Scans all type exports**:

   ```typescript
   // scan-types.ts
   import { Project } from "ts-morph";

   const project = new Project({
     tsConfigFilePath: "./tsconfig.json"
   });

   const typeExports = project.getSourceFiles()
     .flatMap(sf => sf.getExportedDeclarations())
     .filter(([name, decls]) => {
       return decls.some(d =>
         Node.isTypeAliasDeclaration(d) ||
         Node.isInterfaceDeclaration(d)
       );
     });
   ```

2. **Matches against test files**:

   ```typescript
   const testFiles = project.getSourceFiles("tests/**/*.test.ts");
   const testedTypes = new Set();

   testFiles.forEach(file => {
     const imports = file.getImportDeclarations();
     imports.forEach(imp => {
       const namedImports = imp.getNamedImports();
       namedImports.forEach(ni => {
         testedTypes.add(ni.getName());
       });
     });
   });
   ```

## Implementation Roadmap

### Phase 1: Runtime Coverage (Week 1)

1. ✅ Configure Vitest coverage with v8 provider
2. ✅ Set initial thresholds (start low: 50%)
3. ✅ Add coverage script to package.json
4. ✅ Generate baseline coverage report

### Phase 2: CI Integration (Week 2)

1. ⬜ Add coverage to GitHub Actions
2. ⬜ Set up Codecov or similar service
3. ⬜ Add coverage badges to README
4. ⬜ Configure PR coverage requirements

### Phase 3: Type Coverage MVP (Week 3-4)

1. ⬜ Enhance typed-tester with coverage metrics
2. ⬜ Create type coverage report format
3. ⬜ Add `typed test --coverage` command
4. ⬜ Generate list of untested type utilities

### Phase 4: Unified Reporting (Week 5-6)

1. ⬜ Merge runtime and type coverage reports
2. ⬜ Create dashboard for coverage metrics
3. ⬜ Add historical tracking
4. ⬜ Set up coverage trends

## Future typed-tester Enhancements

### Proposed Coverage Features

1. **Coverage Command**:

   ```bash
   typed test --coverage
   # Outputs:
   # - Total type utilities: 500
   # - Tested utilities: 400 (80%)
   # - Untested utilities: [list]
   # - Test quality score: B+
   ```

2. **Coverage Report Format**:

   ```json
   {
     "summary": {
       "totalTypes": 500,
       "testedTypes": 400,
       "coverage": 80,
       "testFiles": 150,
       "totalTests": 2000
     },
     "modules": {
       "types": {
         "coverage": 85,
         "untested": ["ComplexType", "RarelyUsedUtil"]
       },
       "runtime": {
         "coverage": 75,
         "untested": ["internalHelper"]
       }
     },
     "quality": {
       "avgTestsPerType": 4,
       "typesWithoutTests": ["Type1", "Type2"],
       "typesWithOneTest": ["Type3", "Type4"],
       "wellTestedTypes": ["CommonUtil", "CoreType"]
     }
   }
   ```

3. **Integration with Vitest**:
   - Export coverage data in lcov format
   - Merge with runtime coverage
   - Single coverage percentage

### Implementation Considerations

1. **AST Analysis**: Use ts-morph to analyze type definitions
2. **Test Mapping**: Track which tests cover which types
3. **Incremental Updates**: Cache results for performance
4. **Configurable Rules**: Define what counts as "tested"

## Best Practices

### For Runtime Coverage

1. **Start with low thresholds** and gradually increase
2. **Focus on critical paths** first
3. **Don't chase 100%** - aim for meaningful coverage
4. **Use coverage reports** to find untested edge cases

### For Type Coverage

1. **Test type utilities thoroughly** - they're the core value
2. **Include error cases** - test that invalid inputs produce errors
3. **Test edge cases** - empty arrays, never types, any types
4. **Document complex types** - if it needs explanation, it needs tests

### For Monorepo Coverage

1. **Track per-module metrics** separately
2. **Set different thresholds** for different module types
3. **Use workspace-aware tools** when possible
4. **Aggregate carefully** - weighted by module importance

## Integrating Type Coverage into Istanbul/V8 Reports

Yes! You can integrate type coverage metrics into standard coverage reports. Both Istanbul and V8 use standardized formats (lcov, JSON) that can be manipulated.

### Method 1: Virtual File Instrumentation

Create "virtual" runtime files that represent your type utilities and inject them into the coverage data:

```typescript
// coverage-injector.ts
import { readFileSync, writeFileSync } from 'fs';
import { glob } from 'fast-glob';

async function injectTypeCoverage() {
  // 1. Load existing coverage (from Vitest/V8/Istanbul)
  const coverage = JSON.parse(
    readFileSync('./coverage/coverage-final.json', 'utf-8')
  );

  // 2. Find all type utilities
  const typeFiles = await glob('modules/types/src/**/*.ts');
  
  // 3. Analyze which types are tested (using typed-tester output)
  const typedTestResults = JSON.parse(
    readFileSync('./.typed-test-results.json', 'utf-8')
  );
  
  // 4. Create virtual coverage entries for type files
  typeFiles.forEach(file => {
    const fileContent = readFileSync(file, 'utf-8');
    const lines = fileContent.split('\n');
    
    // Extract type definitions
    const typeDefinitions = extractTypeDefinitions(fileContent);
    const testedTypes = findTestedTypes(typeDefinitions, typedTestResults);
    
    // Create coverage object matching Istanbul format
    coverage[file] = {
      path: file,
      statementMap: createStatementMap(typeDefinitions),
      fnMap: {}, // Types aren't functions, but we can treat them as such
      branchMap: {},
      s: createStatementCoverage(typeDefinitions, testedTypes),
      f: {},
      b: {},
      _coverageSchema: '1a1c01bbd47fc00a2c39e90264f33305004495a9',
      hash: crypto.createHash('sha256').update(fileContent).digest('hex')
    };
  });

  // 5. Write merged coverage
  writeFileSync('./coverage/coverage-final.json', JSON.stringify(coverage));
}
```

### Method 2: LCOV Format Injection

LCOV is a text format that's easier to manipulate:

```typescript
// generate-type-lcov.ts
import { appendFileSync } from 'fs';

function generateTypeCoverageLCOV(
  typeFile: string, 
  testedTypes: Set<string>,
  allTypes: Map<string, {line: number}>
) {
  let lcov = `SF:${typeFile}\n`;
  
  // Add function (type) coverage
  allTypes.forEach((info, typeName) => {
    lcov += `FN:${info.line},${typeName}\n`;
  });
  
  // Add function hit counts
  allTypes.forEach((info, typeName) => {
    const hits = testedTypes.has(typeName) ? 1 : 0;
    lcov += `FNDA:${hits},${typeName}\n`;
  });
  
  // Add line coverage
  const lines = readFileSync(typeFile, 'utf-8').split('\n');
  lines.forEach((line, index) => {
    if (isTypeDefinitionLine(line)) {
      const typeName = extractTypeName(line);
      const hits = testedTypes.has(typeName) ? 1 : 0;
      lcov += `DA:${index + 1},${hits}\n`;
    }
  });
  
  lcov += 'end_of_record\n';
  
  // Append to main lcov file
  appendFileSync('./coverage/lcov.info', lcov);
}
```

### Method 3: Custom Vitest Reporter

Create a custom reporter that merges type coverage during test runs:

```typescript
// vitest-type-coverage-reporter.ts
import type { Reporter } from 'vitest';

export default class TypeCoverageReporter implements Reporter {
  async onFinished(files, errors) {
    // Run typed-tester to get type coverage
    const typeResults = await runTypedTester();
    
    // Get runtime coverage
    const runtimeCoverage = this.ctx.coverage;
    
    // Merge coverages
    const mergedCoverage = mergeCoverages(runtimeCoverage, typeResults);
    
    // Override the coverage data
    this.ctx.coverage = mergedCoverage;
  }
}

// vitest.config.ts
export default defineConfig({
  test: {
    reporters: ['default', './vitest-type-coverage-reporter.ts'],
    coverage: {
      provider: 'v8',
      reporter: ['lcov', 'html'],
    }
  }
});
```

### Method 4: Post-Process Hook

Use a post-test script to merge coverages:

```json
// package.json
{
  "scripts": {
    "test:coverage": "vitest run --coverage && npm run merge-type-coverage",
    "merge-type-coverage": "node ./scripts/merge-coverage.js"
  }
}
```

```javascript
// scripts/merge-coverage.js
import { execSync } from 'child_process';
import { readFileSync, writeFileSync } from 'fs';

// 1. Run type tests
const typeResults = JSON.parse(
  execSync('npx typed test --json', { encoding: 'utf-8' })
);

// 2. Load V8/Istanbul coverage
const coverageFile = './coverage/coverage-final.json';
const coverage = JSON.parse(readFileSync(coverageFile, 'utf-8'));

// 3. Process type files as if they were executed
typeResults.forEach(result => {
  if (result.filepath.includes('/types/')) {
    // Create pseudo-coverage for type files
    coverage[result.filepath] = {
      path: result.filepath,
      // Map type tests to statement coverage
      s: mapTypeTestsToStatements(result),
      // Types tested = functions covered
      f: mapTypeTestsToFunctions(result),
    };
  }
});

// 4. Recalculate summary
const summary = calculateCoverageSummary(coverage);

// 5. Write back
writeFileSync(coverageFile, JSON.stringify(coverage));
writeFileSync('./coverage/coverage-summary.json', JSON.stringify(summary));

// 6. Regenerate HTML report
execSync('npx nyc report --reporter=html');
```

### Method 5: Source Map Approach

Generate source maps that map type definitions to virtual JavaScript:

```typescript
// type-to-js-mapper.ts
function mapTypeToVirtualJS(typeDefinition: string): string {
  // Convert type to a virtual function that can be "covered"
  // Example: type Foo<T> = T extends string ? true : false
  // Becomes: function Foo(T) { return typeof T === 'string' ? true : false; }
  
  return typeDefinition
    .replace(/type (\w+)/, 'function $1')
    .replace(/=/g, '{ return ')
    .concat('; }');
}

// This virtual JS is then included in coverage instrumentation
```

### Recommended Approach

For your use case, I recommend **Method 4 (Post-Process Hook)** because:

1. **Simplest to implement** - Just a Node script
2. **Works with existing tools** - No custom reporters needed
3. **Format agnostic** - Works with both V8 and Istanbul
4. **Maintains separation** - Type and runtime coverage stay distinct but merge for reporting

### Implementation Example

Here's a complete implementation for Method 4:

```javascript
// scripts/merge-type-coverage.js
#!/usr/bin/env node

import { execSync } from 'child_process';
import { readFileSync, writeFileSync, existsSync } from 'fs';
import { resolve } from 'path';

async function mergeTypeCoverage() {
  console.log('📊 Merging type coverage into report...');
  
  // 1. Get type test results
  const typeOutput = execSync('npx typed test --json', { 
    encoding: 'utf-8',
    stdio: ['pipe', 'pipe', 'ignore'] // Ignore stderr
  });
  
  const typeResults = JSON.parse(typeOutput);
  
  // 2. Load existing coverage
  const coveragePath = resolve('./coverage/coverage-final.json');
  if (!existsSync(coveragePath)) {
    console.error('❌ No coverage file found. Run tests with coverage first.');
    process.exit(1);
  }
  
  const coverage = JSON.parse(readFileSync(coveragePath, 'utf-8'));
  
  // 3. Calculate type coverage metrics
  const typeFiles = new Map();
  
  typeResults.forEach(result => {
    const file = result.filepath;
    if (!typeFiles.has(file)) {
      typeFiles.set(file, {
        tested: 0,
        total: 0,
        symbols: new Set()
      });
    }
    
    const fileData = typeFiles.get(file);
    
    // Count tested symbols
    result.blocks?.forEach(block => {
      block.tests?.forEach(test => {
        test.symbols?.forEach(symbol => {
          fileData.symbols.add(symbol.name);
        });
      });
    });
    
    fileData.tested = fileData.symbols.size;
    // You'd need to analyze the actual file to get total count
    fileData.total = fileData.tested + 10; // Placeholder
  });
  
  // 4. Inject type files into coverage
  const typeDir = resolve('./modules/types/src');
  typeFiles.forEach((data, filepath) => {
    const fullPath = resolve(filepath);
    
    // Skip if not a type file
    if (!fullPath.startsWith(typeDir)) return;
    
    // Create coverage entry
    coverage[fullPath] = {
      path: fullPath,
      statementMap: {},
      fnMap: {},
      branchMap: {},
      s: {},
      f: {},
      b: {},
      // Custom field for type coverage
      _typeCoverage: {
        tested: data.tested,
        total: data.total,
        percentage: (data.tested / data.total) * 100
      }
    };
    
    // Create fake statement coverage based on type coverage
    for (let i = 1; i <= data.total; i++) {
      coverage[fullPath].statementMap[i] = {
        start: { line: i, column: 0 },
        end: { line: i, column: 100 }
      };
      coverage[fullPath].s[i] = i <= data.tested ? 1 : 0;
    }
  });
  
  // 5. Write merged coverage
  writeFileSync(coveragePath, JSON.stringify(coverage, null, 2));
  
  // 6. Generate summary
  const summary = {
    total: {
      lines: { total: 0, covered: 0, skipped: 0, pct: 0 },
      statements: { total: 0, covered: 0, skipped: 0, pct: 0 },
      functions: { total: 0, covered: 0, skipped: 0, pct: 0 },
      branches: { total: 0, covered: 0, skipped: 0, pct: 0 },
      types: { total: 0, covered: 0, skipped: 0, pct: 0 } // Custom metric
    }
  };
  
  // Calculate totals
  Object.values(coverage).forEach(file => {
    if (file._typeCoverage) {
      summary.total.types.total += file._typeCoverage.total;
      summary.total.types.covered += file._typeCoverage.tested;
    }
    // Add regular coverage metrics...
  });
  
  summary.total.types.pct = 
    (summary.total.types.covered / summary.total.types.total) * 100;
  
  writeFileSync(
    './coverage/coverage-summary.json', 
    JSON.stringify(summary, null, 2)
  );
  
  console.log('✅ Type coverage merged successfully!');
  console.log(`📈 Type Coverage: ${summary.total.types.pct.toFixed(1)}%`);
  
  // 7. Regenerate HTML report
  execSync('npx nyc report --reporter=html', { stdio: 'inherit' });
}

mergeTypeCoverage().catch(console.error);
```

This approach gives you a unified coverage report where type utilities appear alongside runtime code in your Istanbul/V8 reports!

## Troubleshooting

### Common Issues

1. **Coverage includes test files**: Check exclude patterns
2. **Type files show 0% coverage**: Normal - they have no runtime code
3. **Coverage varies between local and CI**: Ensure same Node version
4. **Monorepo paths not resolving**: Check alias configuration

### Performance Optimization

1. **Use v8 provider** for faster coverage in large codebases
2. **Run coverage separately** from normal test runs
3. **Cache coverage data** between runs
4. **Parallelize test execution** with `pool: 'threads'`

## Resources

- [Vitest Coverage Guide](https://vitest.dev/guide/coverage)
- [type-coverage on GitHub](https://github.com/plantain-00/type-coverage)
- [ts-morph Documentation](https://ts-morph.com/)
- [Codecov Documentation](https://docs.codecov.com/)

## Conclusion

Implementing comprehensive coverage for inferred-types requires a two-pronged approach:

1. **Runtime coverage** via Vitest for functions and runtime utilities
2. **Type coverage** via enhanced typed-tester for type utilities

The single test directory actually simplifies coverage configuration, though you'll need custom reporting to get per-module insights. Start with runtime coverage as it's well-supported, then gradually build type coverage capabilities into typed-tester.

The key insight is that traditional coverage tools only measure runtime code execution, missing the primary value of this library - the type utilities. By enhancing typed-tester with coverage metrics, you can ensure both runtime and compile-time code quality.
