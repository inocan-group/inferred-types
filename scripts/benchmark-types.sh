#!/bin/bash

#
# TypeScript Type Performance Benchmarking Script
#
# This script runs TypeScript compilation with tracing enabled to analyze
# type checking performance and identify bottlenecks in type utilities.
#

set -e

echo "🔍 TypeScript Type Performance Benchmarking"
echo "============================================"

# Create directories for trace output
mkdir -p traces
mkdir -p traces/baseline  
mkdir -p traces/reports

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

timestamp=$(date +"%Y%m%d_%H%M%S")

echo -e "${BLUE}📊 Running baseline performance measurements...${NC}"

# Test 1: Benchmark file compilation
echo "🧪 Test 1: Type performance benchmark compilation"
echo "  Compiling tests/type-performance/benchmark.ts..."

time npx tsc \
  --generateTrace "traces/baseline/benchmark_${timestamp}" \
  --noEmit \
  --skipLibCheck \
  tests/type-performance/benchmark.ts \
  > "traces/reports/benchmark_${timestamp}.log" 2>&1

if [ $? -eq 0 ]; then
  echo -e "  ${GREEN}✅ Benchmark compilation completed${NC}"
else
  echo -e "  ${RED}❌ Benchmark compilation failed${NC}"
  cat "traces/reports/benchmark_${timestamp}.log"
fi

# Test 2: Datetime module compilation  
echo "🧪 Test 2: Datetime module compilation"
echo "  Compiling modules/types/src/datetime/index.ts..."

time npx tsc \
  --generateTrace "traces/baseline/datetime_${timestamp}" \
  --noEmit \
  --skipLibCheck \
  modules/types/src/datetime/index.ts \
  > "traces/reports/datetime_${timestamp}.log" 2>&1

if [ $? -eq 0 ]; then
  echo -e "  ${GREEN}✅ Datetime module compilation completed${NC}"
else
  echo -e "  ${RED}❌ Datetime module compilation failed${NC}"
  cat "traces/reports/datetime_${timestamp}.log"
fi

# Test 3: Full types module compilation
echo "🧪 Test 3: Full types module compilation"
echo "  Compiling modules/types/src/index.ts..."

time npx tsc \
  --generateTrace "traces/baseline/full-types_${timestamp}" \
  --noEmit \
  --skipLibCheck \
  modules/types/src/index.ts \
  > "traces/reports/full-types_${timestamp}.log" 2>&1

if [ $? -eq 0 ]; then
  echo -e "  ${GREEN}✅ Full types module compilation completed${NC}"
else
  echo -e "  ${RED}❌ Full types module compilation failed${NC}"
  cat "traces/reports/full-types_${timestamp}.log"
fi

# Test 4: Extended diagnostics
echo "🧪 Test 4: Extended diagnostics"
echo "  Running TypeScript with extended diagnostics..."

npx tsc \
  --extendedDiagnostics \
  --noEmit \
  --skipLibCheck \
  tests/type-performance/benchmark.ts \
  > "traces/reports/diagnostics_${timestamp}.log" 2>&1

echo -e "  ${GREEN}✅ Extended diagnostics completed${NC}"

# Analyze traces if @typescript/analyze-trace is available
echo "📈 Analyzing traces..."

if command -v npx @typescript/analyze-trace &> /dev/null; then
  echo "  Analyzing benchmark trace..."
  npx @typescript/analyze-trace "traces/baseline/benchmark_${timestamp}" \
    > "traces/reports/benchmark_analysis_${timestamp}.json" 2>&1
  
  echo "  Analyzing datetime trace..."
  npx @typescript/analyze-trace "traces/baseline/datetime_${timestamp}" \
    > "traces/reports/datetime_analysis_${timestamp}.json" 2>&1
    
  echo "  Analyzing full types trace..."
  npx @typescript/analyze-trace "traces/baseline/full-types_${timestamp}" \
    > "traces/reports/full-types_analysis_${timestamp}.json" 2>&1
    
  echo -e "  ${GREEN}✅ Trace analysis completed${NC}"
else
  echo -e "  ${YELLOW}⚠️  @typescript/analyze-trace not available, installing...${NC}"
  npm install -g @typescript/analyze-trace
  
  if [ $? -eq 0 ]; then
    echo "  Re-running trace analysis..."
    npx @typescript/analyze-trace "traces/baseline/benchmark_${timestamp}" \
      > "traces/reports/benchmark_analysis_${timestamp}.json" 2>&1
    echo -e "  ${GREEN}✅ Trace analysis completed${NC}"
  else
    echo -e "  ${RED}❌ Could not install @typescript/analyze-trace${NC}"
    echo -e "  ${YELLOW}💡 Manual analysis: check traces/baseline/ directory${NC}"
  fi
fi

# Generate summary report
echo "📋 Generating summary report..."

cat > "traces/reports/summary_${timestamp}.md" << EOF
# TypeScript Performance Benchmark Report

**Generated:** $(date)
**Timestamp:** ${timestamp}

## Test Results

### Test 1: Type Performance Benchmark
- File: \`tests/type-performance/benchmark.ts\`
- Trace: \`traces/baseline/benchmark_${timestamp}\`
- Log: \`traces/reports/benchmark_${timestamp}.log\`
- Analysis: \`traces/reports/benchmark_analysis_${timestamp}.json\`

### Test 2: Datetime Module  
- File: \`modules/types/src/datetime/index.ts\`
- Trace: \`traces/baseline/datetime_${timestamp}\`
- Log: \`traces/reports/datetime_${timestamp}.log\`
- Analysis: \`traces/reports/datetime_analysis_${timestamp}.json\`

### Test 3: Full Types Module
- File: \`modules/types/src/index.ts\`
- Trace: \`traces/baseline/full-types_${timestamp}\`
- Log: \`traces/reports/full-types_${timestamp}.log\`
- Analysis: \`traces/reports/full-types_analysis_${timestamp}.json\`

### Test 4: Extended Diagnostics
- Log: \`traces/reports/diagnostics_${timestamp}.log\`

## Analysis

### Performance Bottlenecks Identified

$(echo "Analyzing key performance metrics from traces...")

### Recommendations

$(echo "Based on trace analysis, recommendations will be added here...")

## Next Steps

1. Review trace analysis results
2. Identify specific type utilities causing bottlenecks  
3. Create optimized versions of problematic utilities
4. Re-run benchmarks to measure improvement

EOF

echo -e "${GREEN}✅ Summary report generated: traces/reports/summary_${timestamp}.md${NC}"

# Show trace file sizes to indicate compilation complexity
echo ""
echo "📏 Trace file sizes (indication of compilation complexity):"
ls -lah traces/baseline/*_${timestamp}/ 2>/dev/null | head -10 || echo "  No trace files found"

echo ""
echo -e "${GREEN}🎉 Benchmarking completed!${NC}"
echo -e "${BLUE}📊 Results saved to: traces/reports/${NC}"
echo -e "${BLUE}🔍 Review summary: traces/reports/summary_${timestamp}.md${NC}"

# Offer to open results
if command -v code &> /dev/null; then
  echo ""
  read -p "📝 Open results in VS Code? (y/n): " -n 1 -r
  echo
  if [[ $REPLY =~ ^[Yy]$ ]]; then
    code "traces/reports/summary_${timestamp}.md"
  fi
fi