# Type Performance Testing Guide

This document provides a comprehensive guide to type performance testing in the inferred-types library, explaining how to measure, analyze, and optimize TypeScript type-level performance.

## Table of Contents

- [Overview](#overview)
- [What Type Performance Testing Measures](#what-type-performance-testing-measures)
- [Testing Infrastructure](#testing-infrastructure)
- [Running Type Performance Tests](#running-type-performance-tests)
- [Understanding Metrics](#understanding-metrics)
- [Adding New Type Performance Tests](#adding-new-type-performance-tests)
- [Performance Analysis Tools](#performance-analysis-tools)
- [Best Practices](#best-practices)
- [Troubleshooting](#troubleshooting)

## Overview

Type performance testing in inferred-types measures how efficiently TypeScript can resolve complex type operations. Unlike runtime performance testing, type performance focuses on:

- **Compilation speed**: How quickly TypeScript can resolve type expressions
- **Memory usage**: How much memory TypeScript consumes during type checking
- **Recursion limits**: Whether type operations hit TypeScript's recursion boundaries
- **Union complexity**: How large union types become and their impact on performance
- **Cross-module resolution**: Whether types resolve correctly across module boundaries

This is critical for a types-focused library where complex type utilities can significantly impact developer experience through slow IDE responses and build times.

## What Type Performance Testing Measures

### 1. TypeScript Compilation Time

Measures how long TypeScript takes to resolve complex type expressions:

```typescript
// Simple type resolution (fast)
type SimpleTest = Find<[1, 2, 3], "equals", [2]>;

// Complex type resolution (potentially slow)
type ComplexTest = Find<VeryLargeList, "startsWith", ComplexParams>;
```

### 2. Union Size Explosion

Tracks how type operations affect union size using the `UnionToTuple` pattern:

```typescript
type UnionToTuple<T> = T extends any ? [T] : never;
type UnionSize<T> = UnionToTuple<T>["length"];

// Measure union growth
type BeforeSize = UnionSize<OriginalType>;
type AfterSize = UnionSize<ProcessedType>;
```

### 3. Type Recursion Depth

Monitors whether type utilities approach TypeScript's recursion limits:

```typescript
// Progressive complexity testing
type TinyList = [1, 2, 3];                    // Depth: 3
type SmallList = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]; // Depth: 10
type MediumList = [...]; // Depth: 25
type LargeList = [...];  // Depth: 50+ (may hit limits)
```

### 4. Memory Usage Patterns

Tracks TypeScript's memory consumption during type resolution:

```typescript
// Memory-intensive type operations
type CartesianProduct<A, B> = A extends any
    ? B extends any
        ? [A, B]
        : never
    : never;

// Can create 24 × 60 × 60 = 86,400 combinations
type TimeCartesian = CartesianProduct<Hour, CartesianProduct<Minute, Second>>;
```

### 5. Complexity Level Performance

Tests different complexity modes to balance performance vs. type safety:

```typescript
// Fast but less type-safe
type WeakTime = RenderTime<"08", "30", null, null, "Z", "weak">;

// Balanced performance and safety
type NormalTime = RenderTime<"08", "30", null, null, "Z", "normal">;

// Full type safety but slower
type StrongTime = RenderTime<"08", "30", null, null, "Z", "strong">;
```

## Testing Infrastructure

### Core Components

#### 1. Type Test Runner

- **Command**: `typed test` (custom CLI tool, not npm script)
- **Location**: Uses `typed-tester` package
- **Purpose**: Executes type-level tests and measures performance

#### 2. Test Utilities

```typescript
import { Test, Expect } from "inferred-types/types";

// Type testing pattern
type cases = [
    Expect<Test<ActualType, "equals", ExpectedType>>,
    Expect<Test<ActualType, "extends", BaseType>>,
    // More test cases...
];
```

#### 3. Performance Measurement

```typescript
// Union size measurement
type UnionSize<T> = UnionToTuple<T>["length"];

// Performance comparison
type OptimizationImpact<TBefore, TAfter> =
    TBefore extends TAfter
        ? "no-change"
        : TBefore extends 86400
            ? TAfter extends 6
                ? "massive-improvement"
                : "improvement"
        : "improvement";
```

### Directory Structure
```
tests/type-performance/
├── benchmark.ts                 # Main benchmark file
├── optimized-benchmark.ts       # Complexity level testing
├── simple-benchmark.ts          # Isolated union explosion tests
├── union-analysis.ts           # Union analysis utilities
├── find-type-performance.ts    # Find utility performance tests
└── [utility]-performance.ts    # Per-utility performance tests

scripts/
├── benchmark-performance.sh    # Compilation performance measurement
├── benchmark-types.sh         # TypeScript tracing with --generateTrace
├── display-metrics.sh         # Show performance metrics
└── view-metrics.ts            # TypeScript metrics dashboard

traces/
├── baseline/                  # Baseline performance traces
├── simple-benchmark/          # Trace data for simple benchmarks
└── [timestamp]/              # Timestamped trace data
```

## Running Type Performance Tests

### Basic Commands

```bash
# Run all type tests
typed test

# Run specific test file
typed test tests/type-performance/find-type-performance.ts

# Run with filter
typed test --filter Find

# Verbose output
typed test --verbose

# Show passing tests
typed test --show-passing
```

### Performance Benchmarking

```bash
# Measure compilation performance
./scripts/benchmark-performance.sh

# Generate TypeScript traces
./scripts/benchmark-types.sh

# Display current metrics
./scripts/display-metrics.sh

# View detailed metrics dashboard
node scripts/view-metrics.ts
```

### Trace Analysis

```bash
# Generate TypeScript trace data
tsc --generateTrace traces/current tests/type-performance/benchmark.ts

# Analyze traces with TypeScript analyzer
npx @typescript/analyze-trace traces/current
```

## Understanding Metrics

### Performance Indicators

#### 1. Compilation Time
```
✓ Fast: < 100ms per test file
⚠ Moderate: 100ms - 1s per test file
🐌 Slow: > 1s per test file
❌ Critical: > 10s per test file or timeout
```

#### 2. Union Size Growth
```typescript
// Acceptable growth
type SmallUnion = "a" | "b" | "c";  // Size: 3
type ProcessedSmall = Process<SmallUnion>; // Size: 6 (2x growth)

// Problematic explosion
type LargeUnion = Hour | Minute | Second; // Size: 144 (24+60+60)
type ExplodedUnion = Process<LargeUnion>; // Size: 86,400 (600x growth!)
```

#### 3. Test Results Interpretation
```
✓ Passing: Type resolves correctly within performance bounds
⤬ Warning: Type resolves but with performance concerns
⛒ Error: Type fails to resolve or hits recursion limits
⇣ Info: Areas outside test blocks (usually imports/setup)
```

### Metrics Storage

#### Trace Data Location
```
traces/
├── baseline/
│   ├── trace.json          # TypeScript compilation trace
│   ├── types.json          # Type resolution data
│   └── analysis.json       # Performance analysis results
├── [timestamp]/
│   └── [same structure]
└── latest -> [most recent]
```

#### Performance History
```typescript
// Stored in trace analysis results
interface PerformanceMetrics {
    compilationTime: number;        // Total compilation time (ms)
    typeInstantiations: number;     // Number of type instantiations
    typeChecks: number;             // Number of type checks performed
    symbolCount: number;            // Total symbols processed
    memoryUsage: number;            // Peak memory usage (MB)
    recursionDepth: number;         // Maximum recursion depth reached
}
```

## Adding New Type Performance Tests

### 1. Create Test File Structure

```typescript
// tests/type-performance/my-utility-performance.ts
import type {
    MyUtility,
    Test,
    Expect,
    UnionToTuple
} from "inferred-types/types";

// Union size measurement
type UnionSize<T> = UnionToTuple<T>["length"];

// Test data types
type SmallTestData = [1, 2, 3, 4, 5];
type MediumTestData = [/* 10-25 items */];
type LargeTestData = [/* 25-50 items */];
```

### 2. Progressive Complexity Testing

```typescript
// Test utility with increasing complexity
type SmallResult = MyUtility<SmallTestData, SimpleParams>;
type MediumResult = MyUtility<MediumTestData, ModerateParams>;
type LargeResult = MyUtility<LargeTestData, ComplexParams>;

// Measure performance impact
type SmallSize = UnionSize<SmallResult>;
type MediumSize = UnionSize<MediumResult>;
type LargeSize = UnionSize<LargeResult>;
```

### 3. Safety Boundaries Testing

```typescript
// Test for recursion limits
type ModerateComplexity = MyUtility<Array40Items, Params>; // Should work
type HighComplexity = MyUtility<Array50Items, Params>;     // May fail
type ExtremeComplexity = MyUtility<Array100Items, Params>; // Likely fails

// Error boundary testing
type SafeOperation = MyUtility<SafeInput, SafeParams>;     // Always works
type RiskyOperation = MyUtility<RiskyInput, RiskyParams>;  // May hit limits
```

### 4. Performance Comparison Testing

```typescript
// Compare different approaches
type ApproachA_Result = UtilityApproachA<TestData>;
type ApproachB_Result = UtilityApproachB<TestData>;

type ApproachA_Size = UnionSize<ApproachA_Result>;
type ApproachB_Size = UnionSize<ApproachB_Result>;

// Performance comparison
type BetterApproach = ApproachA_Size extends ApproachB_Size
    ? "equivalent"
    : ApproachA_Size extends number
        ? ApproachB_Size extends number
            ? ApproachA_Size extends Less<ApproachB_Size>
                ? "A is more efficient"
                : "B is more efficient"
            : "unknown"
        : "unknown";
```

### 5. Type Safety Validation

```typescript
// Ensure correctness while measuring performance
type TestCases = [
    // Correctness tests
    Expect<Test<SmallResult, "equals", ExpectedSmallResult>>,
    Expect<Test<MediumResult, "equals", ExpectedMediumResult>>,

    // Performance boundary tests
    Expect<Test<SmallSize, "lessThan", 10>>,        // Should be small
    Expect<Test<MediumSize, "lessThan", 100>>,      // Should be moderate
    Expect<Test<LargeSize, "lessThan", 1000>>,      // Should not explode
];
```

### 6. Export Performance Data

```typescript
// Export for analysis
export type MyUtilityPerformanceResults = {
    sizes: {
        small: SmallSize;
        medium: MediumSize;
        large: LargeSize;
    };
    comparison: {
        approachA: ApproachA_Size;
        approachB: ApproachB_Size;
        winner: BetterApproach;
    };
    safety: {
        recursionSafe: boolean;
        memorySafe: boolean;
        crossModuleSafe: boolean;
    };
};
```

## Performance Analysis Tools

### 1. TypeScript Trace Analyzer

```bash
# Generate trace with detailed type information
tsc --generateTrace traces/my-test \
    --extendedDiagnostics \
    tests/type-performance/my-utility-performance.ts

# Analyze trace data
npx @typescript/analyze-trace traces/my-test
```

### 2. Custom Metrics Dashboard

```typescript
// scripts/view-metrics.ts - Custom analysis
import { readTraceData, analyzePerformance } from './trace-utils';

const traces = readTraceData('./traces/latest');
const analysis = analyzePerformance(traces);

console.log(`
Performance Analysis:
- Compilation time: ${analysis.compilationTime}ms
- Type instantiations: ${analysis.typeInstantiations}
- Memory usage: ${analysis.memoryUsage}MB
- Recursion depth: ${analysis.recursionDepth}
`);
```

### 3. Union Size Analysis

```typescript
// Utility for measuring union explosions
type MeasureUnionGrowth<TBefore, TAfter> = {
    before: UnionSize<TBefore>;
    after: UnionSize<TAfter>;
    growth: UnionSize<TAfter> extends UnionSize<TBefore>
        ? "no-growth"
        : "explosion-detected";
    ratio: CalculateRatio<UnionSize<TBefore>, UnionSize<TAfter>>;
};
```

### 4. Performance Regression Detection

```bash
# Compare current performance against baseline
./scripts/benchmark-performance.sh --compare-baseline

# Detect regressions
./scripts/detect-regressions.sh
```

## Best Practices

### 1. Test Design Patterns

#### Progressive Complexity
```typescript
// Start small and increase complexity gradually
type Level1 = MyUtility<SimpleInput>;      // 3-5 items
type Level2 = MyUtility<ModerateInput>;    // 10-15 items
type Level3 = MyUtility<ComplexInput>;     // 20-30 items
type Level4 = MyUtility<LargeInput>;       // 40-50 items (risk zone)
```

#### Boundary Testing
```typescript
// Test at known TypeScript limits
type SafeZone = MyUtility<Input40>;        // Should always work
type RiskZone = MyUtility<Input50>;        // May hit limits
type DangerZone = MyUtility<Input100>;     // Likely to fail
```

#### Control Groups
```typescript
// Always include simple baseline tests
type SimpleControl = MyUtility<[1, 2, 3], "equals", [2]>;
type ComplexTest = MyUtility<LargeData, "complexOp", ComplexParams>;
```

### 2. Performance Targets

#### Union Size Limits
```typescript
// Acceptable sizes
type SmallUnion = Size < 10;        // ✓ Optimal
type ModerateUnion = Size < 100;    // ✓ Acceptable
type LargeUnion = Size < 1000;      // ⚠ Monitor closely
type HugeUnion = Size >= 1000;      // ❌ Problematic
```

#### Compilation Time Targets
```
- Simple operations: < 10ms
- Moderate operations: < 100ms
- Complex operations: < 1s
- Batch operations: < 10s
```

### 3. Complexity Management

#### Use Complexity Levels
```typescript
// Implement performance controls like datetime utilities
type MyUtility<T, TOp, TParams, TComplexity = "normal"> =
    TComplexity extends "weak"
        ? FastButLessAccurate<T, TOp, TParams>
        : TComplexity extends "strong"
        ? SlowButFullyAccurate<T, TOp, TParams>
        : BalancedApproach<T, TOp, TParams>;
```

#### Conditional Type Optimization
```typescript
// Optimize for common cases
type OptimizedUtility<T> =
    T extends readonly [infer First]
        ? SimpleCase<First>              // Fast path for single items
        : T extends readonly [infer A, infer B]
        ? TwoItemCase<A, B>             // Fast path for pairs
        : T extends readonly unknown[]
        ? GeneralCase<T>                // General recursive path
        : never;
```

### 4. Monitoring and Alerting

#### Add Performance Assertions
```typescript
// Assert performance characteristics
type PerformanceCheck<T> = [
    Expect<Test<UnionSize<T>, "lessThan", 100>>,    // Size limit
    Expect<Test<T, "extends", ExpectedShape>>,       // Correctness
];
```

#### Create Regression Tests
```typescript
// Track performance regressions
type PerformanceRegression<TCurrent, TBaseline> =
    UnionSize<TCurrent> extends GreaterThan<UnionSize<TBaseline>>
        ? "performance-regression-detected"
        : "performance-maintained";
```

## Troubleshooting

### Common Issues

#### 1. TypeScript Recursion Limit Errors
```
Error: Type instantiation is excessively deep and possibly infinite.
```

**Solutions**:
- Reduce input size in tests
- Add conditional type shortcuts for simple cases
- Implement complexity levels
- Use tail recursion optimization patterns

#### 2. Union Size Explosions
```typescript
// Problem: Cartesian product creates huge unions
type Problem = CartesianProduct<A, B, C>; // 24 × 60 × 60 = 86,400 types

// Solution: Limit complexity or use sampling
type Solution = SampleCartesian<A, B, C, 10>; // Limit to 10 combinations
```

#### 3. Cross-Module Type Resolution Failures
```
Error: Type resolves to empty/never across module boundaries
```

**Solutions**:
- Create local versions of utilities in same file
- Use explicit type annotations
- Avoid complex conditional types across modules

#### 4. Memory Usage Issues
```
Error: Process ran out of memory during type checking
```

**Solutions**:
- Reduce test data size
- Implement complexity levels
- Use TypeScript's `--max-old-space-size` flag
- Split large tests into smaller files

### Performance Debugging

#### 1. Enable TypeScript Diagnostics
```bash
# Run with extended diagnostics
tsc --extendedDiagnostics --generateTrace traces/debug
```

#### 2. Analyze Specific Types
```typescript
// Add debug types to understand resolution
type Debug_Step1 = FirstStep<Input>;
type Debug_Step2 = SecondStep<Debug_Step1>;
type Debug_Final = FinalStep<Debug_Step2>;

// Check sizes at each step
type Size_Step1 = UnionSize<Debug_Step1>;
type Size_Step2 = UnionSize<Debug_Step2>;
type Size_Final = UnionSize<Debug_Final>;
```

#### 3. Isolate Performance Issues
```typescript
// Test components in isolation
type IsolatedComponent = ProblematicUtility<SimpleInput>;
type FullPipeline = CompleteUtility<SimpleInput>;

// Compare performance
type ComponentSize = UnionSize<IsolatedComponent>;
type PipelineSize = UnionSize<FullPipeline>;
```

### Optimization Strategies

#### 1. Early Termination
```typescript
// Add early exits for simple cases
type OptimizedUtility<T> =
    T extends []
        ? EmptyResult                    // Fast exit
        : T extends readonly [infer Only]
        ? SingleItemResult<Only>         // Fast path
        : ComplexLogic<T>;              // Full processing
```

#### 2. Type-Level Memoization
```typescript
// Cache expensive computations
type MemoizedUtility<T> = T extends infer U
    ? U extends CachedInputs[keyof CachedInputs]
        ? CachedResults[U]              // Use cached result
        : ComputeAndCache<U>            // Compute and cache
    : never;
```

#### 3. Complexity Sampling
```typescript
// Sample large inputs for performance
type SampledUtility<T> =
    T extends readonly unknown[]
        ? Length<T> extends GreaterThan<50>
            ? SampleAndExtrapolate<T>    // Sample for large inputs
            : FullProcessing<T>          // Full processing for small inputs
        : never;
```

This comprehensive guide provides the foundation for effective type performance testing in the inferred-types library. Remember that type performance is often more critical than runtime performance for a types-focused library, as it directly impacts developer experience through IDE responsiveness and build times.
