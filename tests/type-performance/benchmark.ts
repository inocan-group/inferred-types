/**
 * Type Performance Benchmarking Suite
 * 
 * This file tests the performance characteristics of critical type utilities
 * by exercising them with unions of different sizes to identify performance
 * bottlenecks and measure optimization impact.
 */

import type {
    TwoDigitHour,
    TwoDigitMinute, 
    TwoDigitSecond,
    ThreeDigitMillisecond,
    TimezoneOffset,
    TwoDigitMonth,
    TwoDigitDate,
    RenderTime,
    ParseTime,
    AsDateMeta,
    ParseDate
} from "../../modules/types/src/index";

// =============================================================================
// UNION SIZE ANALYSIS
// =============================================================================

/**
 * Test union size expansion for core datetime types
 */

// Small unions for baseline testing
type SmallHour = "08" | "12" | "18";
type SmallMinute = "00" | "15" | "30" | "45"; 
type SmallSecond = "00" | "30";

// Medium unions 
type MediumHour = "00" | "06" | "08" | "10" | "12" | "14" | "16" | "18" | "20" | "22";
type MediumMinute = "00" | "05" | "10" | "15" | "20" | "25" | "30" | "35" | "40" | "45" | "50" | "55";

// Full unions (the actual types)
type FullHour = TwoDigitHour;     // 24 members
type FullMinute = TwoDigitMinute; // 60 members  
type FullSecond = TwoDigitSecond; // 60 members

// =============================================================================
// TEMPLATE LITERAL DISTRIBUTION TESTS
// =============================================================================

/**
 * Test 1: Simple Time Format Distribution
 * Measures: Template literal distribution across union sizes
 */

// Baseline: Small unions
type SimpleTimeSmall = `${SmallHour}:${SmallMinute}`;  // 3 × 4 = 12 members
type SimpleTimeMedium = `${MediumHour}:${MediumMinute}`; // 10 × 12 = 120 members
type SimpleTimeFull = `${FullHour}:${FullMinute}`;     // 24 × 60 = 1,440 members

/**
 * Test 2: Complex Time Format Distribution  
 * Measures: Multi-level template literal distribution
 */

// With seconds
type ComplexTimeSmall = `${SmallHour}:${SmallMinute}:${SmallSecond}`;   // 3 × 4 × 2 = 24 members
type ComplexTimeMedium = `${MediumHour}:${MediumMinute}:${SmallSecond}`; // 10 × 12 × 2 = 240 members  
type ComplexTimeFull = `${FullHour}:${FullMinute}:${FullSecond}`;       // 24 × 60 × 60 = 86,400 members

/**
 * Test 3: RenderTime Performance
 * Measures: The actual RenderTime utility performance
 */

// Small scale RenderTime
type RenderTimeSmall = RenderTime<SmallHour, SmallMinute, SmallSecond, null, "Z">;

// Medium scale RenderTime  
type RenderTimeMedium = RenderTime<MediumHour, MediumMinute, SmallSecond, null, "Z">;

// Full scale RenderTime (this is likely the problem!)
type RenderTimeFull = RenderTime<FullHour, FullMinute, FullSecond, null, "Z">;

// =============================================================================
// PARSING COMPLEXITY TESTS  
// =============================================================================

/**
 * Test 4: ParseTime Performance
 * Measures: Complex conditional type performance on literal inputs
 */

// Test specific time strings
type ParseSimpleTime = ParseTime<"12:30">;
type ParseComplexTime = ParseTime<"12:30:45.123Z">;
type ParseInvalidTime = ParseTime<"25:70:99">;

/**
 * Test 5: Date Parsing Performance
 * Measures: ParseDate utility performance
 */

type ParseSimpleDate = ParseDate<"2023-12-25">;
type ParseComplexDate = ParseDate<"2023-12-25T12:30:45.123Z">;
type ParsePartialDate = ParseDate<"--12-25">;

/**
 * Test 6: AsDateMeta Performance  
 * Measures: DateMeta construction from ParsedDate
 */

type DateMetaSimple = AsDateMeta<ParseDate<"2023-12-25">>;
type DateMetaComplex = AsDateMeta<ParseDate<"2023-12-25T12:30:45.123Z">>;

// =============================================================================
// UNION EXPLOSION STRESS TESTS
// =============================================================================

/**
 * Test 7: Timezone Distribution
 * Measures: TimezoneOffset distribution impact
 */

type TimezoneSmall = "Z" | "+05:00" | "-08:00";
type TimezoneMedium = TimezoneOffset<"normal">;
type TimezoneFull = TimezoneOffset<"strong">;

// Test timezone distribution through template literals
type TimeWithTimezoneSmall = `12:30${TimezoneSmall}`;
type TimeWithTimezoneMedium = `12:30${TimezoneMedium}`;  
type TimeWithTimezoneFull = `12:30${TimezoneFull}`;

/**
 * Test 8: Full Complexity Simulation
 * Measures: Worst-case scenario combinations
 */

// This simulates what happens in real usage
type WorstCaseTime = RenderTime<
    TwoDigitHour,
    TwoDigitMinute, 
    TwoDigitSecond,
    ThreeDigitMillisecond,
    TimezoneOffset<"strong">
>; // This could be astronomical!

// =============================================================================
// PERFORMANCE REGRESSION TESTS
// =============================================================================

/**
 * Test 9: Before/After Optimization Comparisons
 * These will be used to measure optimization impact
 */

// Baseline implementations (current)
type CurrentRenderTime = RenderTime<"12", "30", "45", "123", "Z">;
type CurrentParseTime = ParseTime<"12:30:45.123Z">;

// Optimized implementations (to be created)
// type OptimizedRenderTime = /* new implementation */;
// type OptimizedParseTime = /* new implementation */;

// =============================================================================
// TYPE UTILITY VALIDATION  
// =============================================================================

/**
 * Ensure all test types resolve to expected shapes
 * This forces TypeScript to evaluate the types for benchmarking
 */

// Force evaluation by using the types
type _TestSimpleTimeSmall = SimpleTimeSmall extends string ? true : false;
type _TestSimpleTimeFull = SimpleTimeFull extends string ? true : false;
type _TestComplexTimeFull = ComplexTimeFull extends string ? true : false;
type _TestRenderTimeSmall = RenderTimeSmall extends string ? true : false;
type _TestRenderTimeFull = RenderTimeFull extends string ? true : false;
type _TestParseSimpleTime = ParseSimpleTime extends readonly unknown[] ? true : false;
type _TestDateMetaSimple = DateMetaSimple extends object ? true : false;

// Export test results for analysis
export type BenchmarkResults = {
    // Union size progression  
    simpleTimeSmall: SimpleTimeSmall;
    simpleTimeMedium: SimpleTimeMedium;
    simpleTimeFull: SimpleTimeFull;
    
    // Complex combinations
    complexTimeSmall: ComplexTimeSmall;
    complexTimeMedium: ComplexTimeMedium;
    complexTimeFull: ComplexTimeFull;
    
    // Utility performance
    renderTimeSmall: RenderTimeSmall;
    renderTimeMedium: RenderTimeMedium;
    renderTimeFull: RenderTimeFull;
    
    // Parsing performance
    parseSimpleTime: ParseSimpleTime;
    parseComplexTime: ParseComplexTime;
    
    // Date meta performance
    dateMetaSimple: DateMetaSimple;
    dateMetaComplex: DateMetaComplex;
    
    // Timezone impact
    timeWithTimezoneSmall: TimeWithTimezoneSmall;
    timeWithTimezoneFull: TimeWithTimezoneFull;
    
    // Worst case scenario
    worstCaseTime: WorstCaseTime;
};

// Force evaluation of all benchmark types
type _ForceBenchmarkEvaluation = BenchmarkResults extends object ? true : false;