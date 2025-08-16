/**
 * Simple Type Performance Benchmark
 * 
 * Tests specific union explosion patterns that are causing TypeScript performance issues
 * without relying on complex imports that may themselves cause compilation issues.
 */

// =============================================================================
// RECREATE PROBLEMATIC TYPES LOCALLY FOR TESTING
// =============================================================================

/**
 * Local definitions of the problematic types for isolated testing
 */

// Recreate the exact same union types that are causing issues
type TwoDigitHour_Local =
    | `0${0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9}`
    | `1${0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9}`
    | `2${0 | 1 | 2 | 3}`;

type TwoDigitMinute_Local =
    | `0${0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9}`
    | `1${0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9}`
    | `2${0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9}`
    | `3${0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9}`
    | `4${0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9}`
    | `5${0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9}`;

type TwoDigitSecond_Local = TwoDigitMinute_Local;

// =============================================================================
// UNION SIZE MEASUREMENT  
// =============================================================================

/**
 * Measure union sizes by creating tuples
 */
type UnionToTuple<T> = T extends any ? [T] : never;
type UnionSize<T> = UnionToTuple<T>["length"];

// Measure base type sizes
type HourSize = UnionSize<TwoDigitHour_Local>;      // Should be 24
type MinuteSize = UnionSize<TwoDigitMinute_Local>;  // Should be 60
type SecondSize = UnionSize<TwoDigitSecond_Local>;  // Should be 60

// =============================================================================
// TEMPLATE LITERAL EXPLOSION TESTS
// =============================================================================

/**
 * Test 1: Simple time combination (Hour:Minute)
 */
type SimpleTime = `${TwoDigitHour_Local}:${TwoDigitMinute_Local}`;
type SimpleTimeSize = UnionSize<SimpleTime>; // 24 × 60 = 1,440

/**
 * Test 2: Complex time combination (Hour:Minute:Second) 
 * WARNING: This creates 86,400 union members!
 */
type ComplexTime = `${TwoDigitHour_Local}:${TwoDigitMinute_Local}:${TwoDigitSecond_Local}`;
type ComplexTimeSize = UnionSize<ComplexTime>; // 24 × 60 × 60 = 86,400

/**
 * Test 3: Constrained alternatives for optimization testing
 */

// Much smaller alternative unions
type ConstrainedHour = `${number}${number}`;
type ConstrainedMinute = `${number}${number}`;

type ConstrainedTime = `${ConstrainedHour}:${ConstrainedMinute}`;
type ConstrainedTimeSize = UnionSize<ConstrainedTime>; // Should be much smaller

// =============================================================================
// RENDER TIME SIMULATION
// =============================================================================

/**
 * Simulate the RenderTime utility that's causing issues
 */
type N<T extends string | null, P extends string = ""> = 
    T extends null ? "" : T extends string ? `${P}${T}` : never;

type RenderTime_Local<
    THour extends TwoDigitHour_Local | null = "00",
    TMin extends TwoDigitMinute_Local | null = "00",
    TSec extends TwoDigitSecond_Local | null = null,
    TMs extends string | null = null,
    TTz extends string | null = "Z"
> = THour extends null
    ? "Error: hour required"
    : TMin extends null
    ? "Error: minute required" 
    : `${THour}:${TMin}${N<TSec, ":">}${N<TMs, ".">}${N<TTz>}`;

// =============================================================================
// PERFORMANCE TESTS
// =============================================================================

/**
 * Test different complexity levels
 */

// Small scale test (safe)
type SmallHour = "08" | "12" | "18";
type SmallMinute = "00" | "15" | "30" | "45";

type SmallRenderTime = RenderTime_Local<SmallHour, SmallMinute, null, null, "Z">;
type SmallRenderTimeSize = UnionSize<SmallRenderTime>; // 3 × 4 = 12

// Medium scale test 
type MediumHour = "00" | "06" | "12" | "18";
type MediumMinute = "00" | "15" | "30" | "45";

type MediumRenderTime = RenderTime_Local<MediumHour, MediumMinute, null, null, "Z">;
type MediumRenderTimeSize = UnionSize<MediumRenderTime>; // 4 × 4 = 16

// Large scale test (this might be slow!)
// type LargeRenderTime = RenderTime_Local<TwoDigitHour_Local, TwoDigitMinute_Local, null, null, "Z">;
// type LargeRenderTimeSize = UnionSize<LargeRenderTime>; // 24 × 60 = 1,440

// =============================================================================
// OPTIMIZATION COMPARISON
// =============================================================================

/**
 * Compare current vs optimized approaches
 */

// Current approach (problematic)
type Current_SimpleTime = `${TwoDigitHour_Local}:${TwoDigitMinute_Local}`;

// Optimized approach (constrained)  
type Optimized_SimpleTime = `${number}${number}:${number}${number}`;

// Force evaluation for comparison
type Current_Size = UnionSize<Current_SimpleTime>;
type Optimized_Size = UnionSize<Optimized_SimpleTime>;

// =============================================================================
// EXPORT RESULTS
// =============================================================================

export type SimpleBenchmarkResults = {
    // Union sizes
    hourSize: HourSize;
    minuteSize: MinuteSize;
    secondSize: SecondSize;
    
    // Template literal combinations
    simpleTimeSize: SimpleTimeSize;
    complexTimeSize: ComplexTimeSize;
    constrainedTimeSize: ConstrainedTimeSize;
    
    // RenderTime variations
    smallRenderTimeSize: SmallRenderTimeSize;
    mediumRenderTimeSize: MediumRenderTimeSize;
    
    // Optimization comparison
    currentSize: Current_Size;
    optimizedSize: Optimized_Size;
};

// Export specific problematic types for further analysis
export type ProblematicTypes = {
    simpleTime: SimpleTime;
    complexTime: ComplexTime;
    smallRenderTime: SmallRenderTime;
    mediumRenderTime: MediumRenderTime;
};

// Force evaluation of all types
type _ForceEvaluation = SimpleBenchmarkResults extends object ? true : false;