import type {
    As,
    Err,
    HasLeadingTemplateLiteral,
    NumericChar,
    NumericChar__ZeroToFive,
    StripLeading,
    TwoDigitMinute,
} from "inferred-types/types";

type Take<T extends string> = string extends T
    ? Err<"minutes"> | { take: TwoDigitMinute<"branded">; rest: string }
    : HasLeadingTemplateLiteral<T> extends true
        ? Err<"minutes"> | { take: TwoDigitMinute<"branded">; rest: string }
        : T extends `${infer C1}${infer C2}${infer Rest}`
            ? C1 extends NumericChar__ZeroToFive
                ? C2 extends NumericChar
                    ? {
                        take: TwoDigitMinute<`${C1}${C2}`>;
                        rest: Rest
                    }
                    : Err<"minutes">
                : Err<"minutes">
            : Err<"minutes">;

/**
 * **TakeMinutes**`<T, TIgnoreLeading>`
 *
 * Looks for valid two-digit minutes (00-59) at front of the string and if it finds
 * it will return:
 *
 * - `{ take: TwoDigitMinute, rest: Rest }`
 *
 * If there is no match:
 *
 * - `{ take: null, rest: T }`
 *
 * @param TIgnoreLeading - Optional character to ignore if found at the beginning of the string
 */
export type TakeMinutes<
    T extends string,
    TIgnoreLeading extends string | null = null
> = TIgnoreLeading extends string
    ? string extends TIgnoreLeading
        ? never
        : As<
            Take<
                As<StripLeading<T, TIgnoreLeading>, string>
            >,
                Err<"minutes"> | { take: TwoDigitMinute<"branded">; rest: string }
        >
    : As<
        Take<T>,
        { take: null; rest: string } | { take: TwoDigitMinute<"branded">; rest: string }
    >;
