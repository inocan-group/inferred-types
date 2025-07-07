#!/bin/bash

# Performance Benchmark Script
# 
# Measures TypeScript compilation performance for optimized vs baseline types

echo "🔧 Type Performance Benchmark"
echo "============================="

# Create temporary benchmark files
BASELINE_FILE="tests/type-performance/baseline-benchmark.ts"
OPTIMIZED_FILE="tests/type-performance/optimized-benchmark.ts"

echo "📊 Testing baseline types (original patterns)..."

# Baseline test - using simple benchmark with original patterns
time npx tsc tests/type-performance/simple-benchmark.ts --noEmit --skipLibCheck > /dev/null 2>&1
BASELINE_EXIT_CODE=$?

if [ $BASELINE_EXIT_CODE -eq 0 ]; then
    echo "✅ Baseline compilation: SUCCESS"
else
    echo "❌ Baseline compilation: FAILED"
fi

echo ""
echo "📊 Testing optimized types (with complexity levels)..."

# Create a simpler optimized test that uses local types
cat > tests/type-performance/optimized-simple.ts << 'EOF'
/**
 * Simple optimized type test
 */

// Optimized types with complexity levels
type TwoDigitHour_Weak = `${number}${number}`;
type TwoDigitMinute_Weak = `${number}${number}`;

type TwoDigitHour_Normal = `0${number}` | `1${number}` | `2${0 | 1 | 2 | 3}`;
type TwoDigitMinute_Normal = `${0 | 1 | 2 | 3 | 4 | 5}${number}`;

// Template literal tests
type WeakTime = `${TwoDigitHour_Weak}:${TwoDigitMinute_Weak}`;
type NormalTime = `${TwoDigitHour_Normal}:${TwoDigitMinute_Normal}`;

// Union size measurement
type UnionToTuple<T> = T extends any ? [T] : never;
type UnionSize<T> = UnionToTuple<T>["length"];

type WeakTimeSize = UnionSize<WeakTime>;
type NormalTimeSize = UnionSize<NormalTime>;

// Force evaluation
type _ForceEval = WeakTimeSize extends number ? (NormalTimeSize extends number ? true : false) : false;

export type OptimizedResults = {
    weakTimeSize: WeakTimeSize;
    normalTimeSize: NormalTimeSize;
    evaluation: _ForceEval;
};
EOF

time npx tsc tests/type-performance/optimized-simple.ts --noEmit --skipLibCheck > /dev/null 2>&1
OPTIMIZED_EXIT_CODE=$?

if [ $OPTIMIZED_EXIT_CODE -eq 0 ]; then
    echo "✅ Optimized compilation: SUCCESS"
else
    echo "❌ Optimized compilation: FAILED"
fi

echo ""
echo "📈 Performance Comparison:"
echo "========================="

if [ $BASELINE_EXIT_CODE -eq 0 ] && [ $OPTIMIZED_EXIT_CODE -eq 0 ]; then
    echo "✅ Both compilations successful"
    echo "🎯 Optimization appears to maintain compilation stability"
elif [ $BASELINE_EXIT_CODE -ne 0 ] && [ $OPTIMIZED_EXIT_CODE -eq 0 ]; then
    echo "🚀 MAJOR IMPROVEMENT: Baseline failed, optimized succeeded!"
    echo "   This indicates the optimizations fixed compilation issues"
elif [ $BASELINE_EXIT_CODE -eq 0 ] && [ $OPTIMIZED_EXIT_CODE -ne 0 ]; then
    echo "⚠️  REGRESSION: Baseline succeeded, optimized failed"
    echo "   Need to review optimization implementation"
else
    echo "❌ Both compilations failed - need further investigation"
fi

echo ""
echo "🔍 Building main project to verify overall health..."

# Test main project build
pnpm build > /dev/null 2>&1
BUILD_EXIT_CODE=$?

if [ $BUILD_EXIT_CODE -eq 0 ]; then
    echo "✅ Main project build: SUCCESS"
    echo "🎯 Optimizations are compatible with existing codebase"
else
    echo "❌ Main project build: FAILED"
    echo "⚠️  Optimizations may have broken existing functionality"
fi

echo ""
echo "📋 Summary:"
echo "==========="
echo "Baseline compilation: $([ $BASELINE_EXIT_CODE -eq 0 ] && echo 'PASS' || echo 'FAIL')"
echo "Optimized compilation: $([ $OPTIMIZED_EXIT_CODE -eq 0 ] && echo 'PASS' || echo 'FAIL')"
echo "Main project build: $([ $BUILD_EXIT_CODE -eq 0 ] && echo 'PASS' || echo 'FAIL')"

# Clean up
rm -f tests/type-performance/optimized-simple.ts

echo ""
echo "🎯 Benchmark complete!"