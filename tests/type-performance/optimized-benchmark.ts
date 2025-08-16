/**
 * Optimized Type Performance Benchmark
 *
 * Tests the optimized datetime types with complexity levels to verify
 * performance improvements compared to baseline measurements.
 */

import type {
    TwoDigitHour,
    TwoDigitMinute,
    TwoDigitSecond,
    RenderTime
} from "inferred-types/types";

// =============================================================================
// UNION SIZE MEASUREMENT UTILITIES
// =============================================================================

type UnionToTuple<T> = T extends any ? [T] : never;
type UnionSize<T> = UnionToTuple<T>["length"];

// =============================================================================
// BASELINE VS OPTIMIZED COMPARISON
// =============================================================================

/**
 * Test different complexity levels for base types
 */

// Weak complexity (fastest, least type-safe)
type WeakHour = TwoDigitHour<"weak">;
type WeakMinute = TwoDigitMinute<"weak">;
type WeakSecond = TwoDigitSecond<"weak">;

type WeakHourSize = UnionSize<WeakHour>;       // Should be much smaller
type WeakMinuteSize = UnionSize<WeakMinute>;   // Should be much smaller
type WeakSecondSize = UnionSize<WeakSecond>;   // Should be much smaller

// Normal complexity (balanced - default)
type NormalHour = TwoDigitHour<"normal">;
type NormalMinute = TwoDigitMinute<"normal">;
type NormalSecond = TwoDigitSecond<"normal">;

type NormalHourSize = UnionSize<NormalHour>;     // Reduced from 24
type NormalMinuteSize = UnionSize<NormalMinute>; // Reduced from 60
type NormalSecondSize = UnionSize<NormalSecond>; // Reduced from 60

// Strong complexity (full type safety)
type StrongHour = TwoDigitHour<"strong">;
type StrongMinute = TwoDigitMinute<"strong">;
type StrongSecond = TwoDigitSecond<"strong">;

type StrongHourSize = UnionSize<StrongHour>;     // Should be 24 (original)
type StrongMinuteSize = UnionSize<StrongMinute>; // Should be 60 (original)
type StrongSecondSize = UnionSize<StrongSecond>; // Should be 60 (original)

// =============================================================================
// TEMPLATE LITERAL COMBINATIONS - OPTIMIZED
// =============================================================================

/**
 * Test template literal combinations with different complexity levels
 */

// Weak combinations (fastest)
type WeakSimpleTime = `${WeakHour}:${WeakMinute}`;
type WeakComplexTime = `${WeakHour}:${WeakMinute}:${WeakSecond}`;

type WeakSimpleTimeSize = UnionSize<WeakSimpleTime>;   // Should be much smaller
type WeakComplexTimeSize = UnionSize<WeakComplexTime>; // Should be much smaller

// Normal combinations (balanced)
type NormalSimpleTime = `${NormalHour}:${NormalMinute}`;
type NormalComplexTime = `${NormalHour}:${NormalMinute}:${NormalSecond}`;

type NormalSimpleTimeSize = UnionSize<NormalSimpleTime>;   // Reduced from 1,440
type NormalComplexTimeSize = UnionSize<NormalComplexTime>; // Reduced from 86,400

// Strong combinations (original performance, but controlled)
type StrongSimpleTime = `${StrongHour}:${StrongMinute}`;
// Commenting out the most problematic one for safety
// type StrongComplexTime = `${StrongHour}:${StrongMinute}:${StrongSecond}`;

type StrongSimpleTimeSize = UnionSize<StrongSimpleTime>; // Should be 1,440 (original)

// =============================================================================
// RENDERTIME UTILITY - OPTIMIZED
// =============================================================================

/**
 * Test RenderTime with different complexity levels
 */

// Weak RenderTime (fastest)
type WeakRenderTime = RenderTime<"08", "30", null, null, "Z", "weak">;
type WeakRenderTimeComplex = RenderTime<WeakHour, WeakMinute, WeakSecond, null, "Z", "weak">;

type WeakRenderTimeSize = UnionSize<WeakRenderTime>;
type WeakRenderTimeComplexSize = UnionSize<WeakRenderTimeComplex>;

// Normal RenderTime (balanced)
type NormalRenderTime = RenderTime<"08", "30", null, null, "Z", "normal">;
type NormalRenderTimeComplex = RenderTime<NormalHour, NormalMinute, null, null, "Z", "normal">;

type NormalRenderTimeSize = UnionSize<NormalRenderTime>;
type NormalRenderTimeComplexSize = UnionSize<NormalRenderTimeComplex>;

// Strong RenderTime (controlled - only simple cases)
type StrongRenderTime = RenderTime<"08", "30", null, null, "Z", "strong">;
type StrongRenderTimeModerate = RenderTime<StrongHour, "30", null, null, "Z", "strong">;

type StrongRenderTimeSize = UnionSize<StrongRenderTime>;
type StrongRenderTimeMoederateSize = UnionSize<StrongRenderTimeModerate>;

// =============================================================================
// PERFORMANCE COMPARISON DATA
// =============================================================================

/**
 * Collect all measurements for analysis
 */
export type OptimizedBenchmarkResults = {
    // Base type sizes by complexity
    weak: {
        hourSize: WeakHourSize;
        minuteSize: WeakMinuteSize;
        secondSize: WeakSecondSize;
        simpleTimeSize: WeakSimpleTimeSize;
        complexTimeSize: WeakComplexTimeSize;
        renderTimeSize: WeakRenderTimeSize;
        renderTimeComplexSize: WeakRenderTimeComplexSize;
    };

    normal: {
        hourSize: NormalHourSize;
        minuteSize: NormalMinuteSize;
        secondSize: NormalSecondSize;
        simpleTimeSize: NormalSimpleTimeSize;
        complexTimeSize: NormalComplexTimeSize;
        renderTimeSize: NormalRenderTimeSize;
        renderTimeComplexSize: NormalRenderTimeComplexSize;
    };

    strong: {
        hourSize: StrongHourSize;
        minuteSize: StrongMinuteSize;
        secondSize: StrongSecondSize;
        simpleTimeSize: StrongSimpleTimeSize;
        renderTimeSize: StrongRenderTimeSize;
        renderTimeMoederateSize: StrongRenderTimeMoederateSize;
    };
};

// =============================================================================
// SAFETY TESTS - PROGRESSIVE COMPLEXITY
// =============================================================================

/**
 * Test progressively more complex combinations to find safe boundaries
 */

// Safe small-scale tests
type SmallHour = "08" | "12" | "18";
type SmallMinute = "00" | "30";

type SmallWeakRender = RenderTime<SmallHour, SmallMinute, null, null, "Z", "weak">;
type SmallNormalRender = RenderTime<SmallHour, SmallMinute, null, null, "Z", "normal">;
type SmallStrongRender = RenderTime<SmallHour, SmallMinute, null, null, "Z", "strong">;

type SmallWeakRenderSize = UnionSize<SmallWeakRender>;     // 3 × 2 = 6
type SmallNormalRenderSize = UnionSize<SmallNormalRender>; // 3 × 2 = 6
type SmallStrongRenderSize = UnionSize<SmallStrongRender>; // 3 × 2 = 6

export type SafetyTestResults = {
    smallWeakRenderSize: SmallWeakRenderSize;
    smallNormalRenderSize: SmallNormalRenderSize;
    smallStrongRenderSize: SmallStrongRenderSize;
};

// =============================================================================
// OPTIMIZATION IMPACT ANALYSIS
// =============================================================================

/**
 * Calculate the optimization impact by comparing union sizes
 */
type OptimizationImpact<TBefore extends number, TAfter extends number> =
    TBefore extends TAfter
    ? "no-change"
    : TBefore extends number
    ? TAfter extends number
        ? TBefore extends infer B extends number
            ? TAfter extends infer A extends number
                ? B extends 86400  // Complex time original
                    ? A extends 6
                        ? "massive-improvement"  // 86,400 → 6
                        : A extends 60
                        ? "major-improvement"    // 86,400 → 60
                        : "improvement"
                    : B extends 1440  // Simple time original
                    ? A extends 6
                        ? "major-improvement"   // 1,440 → 6
                        : "improvement"
                    : B extends 60
                    ? A extends 6
                        ? "significant-improvement" // 60 → 6
                        : "improvement"
                    : B extends 24
                    ? A extends 6
                        ? "good-improvement"   // 24 → 6
                        : "improvement"
                    : "improvement"
                : never
            : never
        : never
    : never;

export type ImpactAnalysis = {
    // Compare normal complexity to strong (baseline)
    hourImpact: OptimizationImpact<StrongHourSize, NormalHourSize>;
    minuteImpact: OptimizationImpact<StrongMinuteSize, NormalMinuteSize>;
    simpleTimeImpact: OptimizationImpact<StrongSimpleTimeSize, NormalSimpleTimeSize>;

    // Compare weak complexity to strong (baseline)
    weakHourImpact: OptimizationImpact<StrongHourSize, WeakHourSize>;
    weakMinuteImpact: OptimizationImpact<StrongMinuteSize, WeakMinuteSize>;
    weakSimpleTimeImpact: OptimizationImpact<StrongSimpleTimeSize, WeakSimpleTimeSize>;
};

// Force evaluation for testing
type _ForceOptimizedBenchmarkEvaluation = OptimizedBenchmarkResults extends object ? true : false;
type _ForceSafetyTestEvaluation = SafetyTestResults extends object ? true : false;
type _ForceImpactAnalysisEvaluation = ImpactAnalysis extends object ? true : false;
