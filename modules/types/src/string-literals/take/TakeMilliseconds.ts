import type { As } from "types/boolean-logic";
import type { Err } from "types/errors";
import type {  NumericChar, StripLeading } from "types/string-literals";
import type { ThreeDigitMillisecond } from "types/datetime";
import { StartsWithTemplateLiteral } from "types/interpolation";

type E<T extends string> = Err<
    "parse-time/ms",
    `Unable to take the milliseconds at head of the parse string: ${T}`,
    { parse: T }
>

type Take<T extends string> = As<
    string extends T
        ? Err<"parse-time/ms"> | { take: ThreeDigitMillisecond<"branded">; rest: string }
        : StartsWithTemplateLiteral<T> extends true
            ? Err<"parse-time/ms"> | { take: ThreeDigitMillisecond<"branded">; rest: string }
            : T extends `${infer C1}${infer C2}${infer C3}${infer Rest}`
                ? C1 extends NumericChar
                    ? C2 extends NumericChar
                        ? C3 extends NumericChar
                            ? {
                                take: ThreeDigitMillisecond<`${C1}${C2}${C3}`>;
                                rest: Rest;
                            }
                            : E<T>
                        : E<T>
                    : E<T>
                : E<T>,
    Err<"parse-time/ms"> | { take: ThreeDigitMillisecond<"branded">; rest: string }
>;

/**
 * **TakeMilliseconds**`<T, TIgnoreLeading>`
 *
 * Looks for `ThreeDigitMillisecond` at front of the string and if it finds
 * it will return:
 *
 * - `{ take: ThreeDigitMillisecond, rest: Rest }`
 *
 * If there is no match:
 *
 * - `{ take: null, rest: Rest }`
 *
 * @param TIgnoreLeading - Optional character to ignore if found at the beginning of the string
 */
export type TakeMilliseconds<
    T extends string,
    TIgnoreLeading extends string | null = null
> = TIgnoreLeading extends string
    ? string extends TIgnoreLeading
        ? Err<"parse-time/ms"> | { take: ThreeDigitMillisecond<"branded">; rest: string }
        : As<
            Take<
                As<StripLeading<T, TIgnoreLeading>, string>
            >,
            Err<"parse-time/ms"> | { take: ThreeDigitMillisecond<"branded">; rest: string }
        >
    : As<
        Take<T>,
        Err<"parse-time/ms"> | { take: ThreeDigitMillisecond<"branded">; rest: string }
    >;
