import type {
    As,
    HasLeadingTemplateLiteral,
    NumericChar,
    StripLeading,
    ThreeDigitMillisecond,
    TimezoneOffset,
} from "inferred-types/types";

type Take<T extends string> = As<
    string extends T
    ? { take: null; rest: string } | { take: ThreeDigitMillisecond<"branded">; rest: string}
    : HasLeadingTemplateLiteral<T> extends true
        ? { take: null; rest: string } | { take: ThreeDigitMillisecond<"branded">; rest: string}
        : T extends `${infer C1}${infer C2}${infer C3}${infer Rest}`
            ? C1 extends NumericChar
                ? C2 extends NumericChar
                    ? C3 extends NumericChar
                        ? {
                            take: `${C1}${C2}${C3}` & ThreeDigitMillisecond<"branded">,
                            rest: Rest
                        }
                        : { take: null, rest: T }
                    : { take: null, rest: T }
                : { take: null, rest: T }
            : { take: null, rest: T },
    { take: null; rest: string } | { take: ThreeDigitMillisecond<"branded">; rest: string}
>

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
        ? never
        : As<
            Take<
                As<StripLeading<T, TIgnoreLeading>, string>
            >,
            { take: null; rest: string } | { take: ThreeDigitMillisecond<"branded">; rest: string}
        >
: As<
    Take<T>,
    { take: null; rest: string } | { take: ThreeDigitMillisecond<"branded">; rest: string}
>;
