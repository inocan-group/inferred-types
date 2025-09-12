import type { As } from "types/boolean-logic";
import type { ThreeDigitMillisecond, TimezoneOffset, TwoDigitHour, TwoDigitMinute, TwoDigitSecond } from "inferred-types/types";
import type { Err } from "types/errors";

/**
 * **RenderTime**`<THour, TMin, TSec, TMs, TTz, TComplexity>`
 *
 * Renders an ISO time string based on generics passed in.
 *
 * **Performance Optimized:** Uses conditional assembly instead of
 * template literal distribution to avoid union explosion.
 *
 * **Complexity Levels:**
 * - `"weak"`: Fast, less type-safe fallbacks
 * - `"normal"`: Balanced performance and safety (default)
 * - `"strong"`: Full type safety, slower compilation
 *
 * **Original Issue:** The previous implementation used template literal
 * interpolation with the `N<>` helper which caused union explosion when
 * multiple large datetime unions were combined.
 *
 * **Solution:** Break down the template literal assembly into conditional
 * branches that avoid distributing large unions through template literals.
 */
export type RenderTime<
    THour extends TwoDigitHour<TComplexity> | null = "00",
    TMin extends TwoDigitMinute<TComplexity> | null = "00",
    TSec extends TwoDigitSecond<TComplexity> | null = null,
    TMs extends ThreeDigitMillisecond<TComplexity> | null = null,
    TTz extends TimezoneOffset<TComplexity extends "strong" ? "strong" : "normal"> | null = "Z",
    TComplexity extends "weak" | "normal" | "strong" = "normal"
> = THour extends null
    ? Err<`render-time/hour`, `To render a time you MUST have an hour!`>
    : TMin extends null
        ? Err<`render-time/min`, `To render a time you MUST have a minute!`>
        : TSec extends null
            ? TMs extends null
                ? TTz extends null
                    ? `${THour}:${TMin}`
                    : As<`${THour}:${TMin}${TTz}`, string>
                : TTz extends null
                    ? As<`${THour}:${TMin}.${TMs}`, string>
                    : As<`${THour}:${TMin}.${TMs}${TTz}`, string>
            : TMs extends null
                ? TTz extends null
                    ? As<`${THour}:${TMin}:${TSec}`, string>
                    : As<`${THour}:${TMin}:${TSec}${TTz}`, string>
                : TTz extends null
                    ? As<`${THour}:${TMin}:${TSec}.${TMs}`, string>
                    : As<`${THour}:${TMin}:${TSec}.${TMs}${TTz}`, string>;
