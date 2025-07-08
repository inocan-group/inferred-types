import type { DOUBLE_LEAP_MODERN } from "inferred-types/constants";

/**
 * Modern "Double Leap" years (1400-2300)
 *
 * **Related:** `IsoModernDoubleLeap`
 */
export type ModernDoubleLeap = typeof DOUBLE_LEAP_MODERN[number];

/**
 * Modern "Double Leap" years (1400-2300) as ISO strings
 *
 * **Related:** `ModernDoubleLeap`
 */
export type IsoModernDoubleLeap = {
    [K in keyof typeof DOUBLE_LEAP_MODERN]: typeof DOUBLE_LEAP_MODERN[K] extends number
        ? `${typeof DOUBLE_LEAP_MODERN[K]}`
        : never
};
