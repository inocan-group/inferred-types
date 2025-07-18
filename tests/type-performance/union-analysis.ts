/**
 * Union Size Analysis Tool
 *
 * This file provides utilities to analyze and measure union type sizes
 * to identify performance bottlenecks caused by union explosion.
 */

import type {
    TwoDigitHour,
    TwoDigitMinute,
    TwoDigitSecond,
    ThreeDigitMillisecond,
    TimezoneOffset,
    TwoDigitMonth,
    TwoDigitDate,
    FourDigitYear
} from "inferred-types/types";

// =============================================================================
// UNION SIZE MEASUREMENT UTILITIES
// =============================================================================

/**
 * Utility to count union members by creating a tuple
 * The length of the tuple equals the number of union members
 */
type UnionToTuple<T> = T extends any ? [T] : never;
type UnionSize<T> = UnionToTuple<T>["length"];

// =============================================================================
// CORE TYPE UNION SIZES
// =============================================================================

/**
 * Measure base datetime type union sizes
 */

type TwoDigitHourSize = UnionSize<TwoDigitHour>;          // Should be 24
type TwoDigitMinuteSize = UnionSize<TwoDigitMinute>;      // Should be 60
type TwoDigitSecondSize = UnionSize<TwoDigitSecond>;      // Should be 60
type TwoDigitMonthSize = UnionSize<TwoDigitMonth>;        // Should be 12
type TwoDigitDateSize = UnionSize<TwoDigitDate>;          // Should be 31

// Timezone analysis
type TimezoneOffsetNormalSize = UnionSize<TimezoneOffset<"normal">>;  // Variable
type TimezoneOffsetStrongSize = UnionSize<TimezoneOffset<"strong">>;  // Much larger

// =============================================================================
// TEMPLATE LITERAL EXPLOSION ANALYSIS
// =============================================================================

/**
 * Measure template literal distribution impact
 */

// Simple combinations
type HourMinuteCombination = `${TwoDigitHour}:${TwoDigitMinute}`;
type HourMinuteCombinationSize = UnionSize<HourMinuteCombination>; // 24 × 60 = 1,440

// Complex combinations
type HourMinuteSecondCombination = `${TwoDigitHour}:${TwoDigitMinute}:${TwoDigitSecond}`;
type HourMinuteSecondCombinationSize = UnionSize<HourMinuteSecondCombination>; // 24 × 60 × 60 = 86,400

// With timezone
type TimeWithTimezoneCombination = `${TwoDigitHour}:${TwoDigitMinute}${TimezoneOffset<"strong">}`;
type TimeWithTimezoneCombinationSize = UnionSize<TimeWithTimezoneCombination>; // Massive!

// =============================================================================
// COMPLEXITY PROGRESSION ANALYSIS
// =============================================================================

/**
 * Analyze how union sizes grow with additional components
 */

// Progressive complexity
type Time_H = TwoDigitHour;                                           // 24
type Time_HM = `${TwoDigitHour}:${TwoDigitMinute}`;                  // 24 × 60 = 1,440
type Time_HMS = `${TwoDigitHour}:${TwoDigitMinute}:${TwoDigitSecond}`; // 24 × 60 × 60 = 86,400

// Measure sizes
type Time_H_Size = UnionSize<Time_H>;
type Time_HM_Size = UnionSize<Time_HM>;
type Time_HMS_Size = UnionSize<Time_HMS>;

// Date combinations
type Date_Y = FourDigitYear<"strong">;
type Date_YM = `-${FourDigitYear<"strong">}-${TwoDigitMonth}`;
type Date_YMD = `${FourDigitYear<"strong">}-${TwoDigitMonth}-${TwoDigitDate}`;

type Date_Y_Size = UnionSize<Date_Y>;
type Date_YM_Size = UnionSize<Date_YM>;
type Date_YMD_Size = UnionSize<Date_YMD>;

// =============================================================================
// PROBLEMATIC COMBINATIONS IDENTIFICATION
// =============================================================================

/**
 * Identify specific combinations that cause exponential growth
 */

// This would be catastrophic if evaluated
// type FullTimeCombination = `${TwoDigitHour}:${TwoDigitMinute}:${TwoDigitSecond}.${ThreeDigitMillisecond}${TimezoneOffset<"strong">}`;
// type FullTimeCombinationSize = UnionSize<FullTimeCombination>; // Don't evaluate this!

// Test smaller versions to extrapolate
type SmallHour = "08" | "12" | "18";
type SmallMinute = "00" | "30";
type SmallSecond = "00" | "15";
type SmallMs = "000" | "500";
type SmallTz = "Z" | "+05:00";

type SmallFullTime = `${SmallHour}:${SmallMinute}:${SmallSecond}.${SmallMs}${SmallTz}`;
type SmallFullTimeSize = UnionSize<SmallFullTime>; // 3 × 2 × 2 × 2 × 2 = 48

// Extrapolate: Full version would be ~24 × 60 × 60 × 1000 × timezone_count
// This is why TypeScript crashes!

// =============================================================================
// OPTIMIZATION OPPORTUNITY ANALYSIS
// =============================================================================

/**
 * Test more constrained versions for optimization
 */

// Constrained hour type (using "weak" fallback)
type ConstrainedHour = `${number}${number}`;  // Much smaller union
type ConstrainedMinute = `${number}${number}`;

type ConstrainedTime = `${ConstrainedHour}:${ConstrainedMinute}`;
type ConstrainedTimeSize = UnionSize<ConstrainedTime>; // Should be much smaller

// Fallback timezone
type ConstrainedTimezone = `${"+" | "-"}${number}:${number}` | "Z";
type ConstrainedTimezoneSize = UnionSize<ConstrainedTimezone>;

// =============================================================================
// EXPORT ANALYSIS RESULTS
// =============================================================================

export type UnionAnalysisResults = {
    // Base type sizes
    twoDigitHourSize: TwoDigitHourSize;
    twoDigitMinuteSize: TwoDigitMinuteSize;
    twoDigitSecondSize: TwoDigitSecondSize;
    twoDigitMonthSize: TwoDigitMonthSize;
    twoDigitDateSize: TwoDigitDateSize;

    // Timezone sizes
    timezoneOffsetNormalSize: TimezoneOffsetNormalSize;
    timezoneOffsetStrongSize: TimezoneOffsetStrongSize;

    // Template literal combinations
    hourMinuteCombinationSize: HourMinuteCombinationSize;
    hourMinuteSecondCombinationSize: HourMinuteSecondCombinationSize;
    timeWithTimezoneCombinationSize: TimeWithTimezoneCombinationSize;

    // Complexity progression
    time_H_Size: Time_H_Size;
    time_HM_Size: Time_HM_Size;
    time_HMS_Size: Time_HMS_Size;

    date_Y_Size: Date_Y_Size;
    date_YM_Size: Date_YM_Size;
    date_YMD_Size: Date_YMD_Size;

    // Small test sizes
    smallFullTimeSize: SmallFullTimeSize;

    // Optimization potential
    constrainedTimeSize: ConstrainedTimeSize;
    constrainedTimezoneSize: ConstrainedTimezoneSize;
};

// =============================================================================
// PERFORMANCE IMPACT CALCULATION
// =============================================================================

/**
 * Calculate theoretical performance impact based on union sizes
 */
type PerformanceImpact<T extends number> =
    T extends infer N extends number
    ? N extends 1
        ? "minimal"
        : N extends 2 | 3 | 4 | 5
        ? "low"
        : N extends number
        ? N extends 50
            ? "moderate"
            : N extends 200
            ? "high"
            : N extends 1000
            ? "severe"
            : "extreme"
        : "unknown"
    : "unknown";

export type PerformanceAnalysis = {
    hourMinuteImpact: PerformanceImpact<HourMinuteCombinationSize>;
    hourMinuteSecondImpact: PerformanceImpact<HourMinuteSecondCombinationSize>;
    // timeWithTimezoneImpact: PerformanceImpact<TimeWithTimezoneCombinationSize>; // Too dangerous to evaluate
};

// Force evaluation for testing
type _ForceUnionAnalysisEvaluation = UnionAnalysisResults extends object ? true : false;
type _ForcePerformanceAnalysisEvaluation = PerformanceAnalysis extends object ? true : false;
