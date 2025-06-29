import type { AsString, If, IsNumericLiteral, IsStringLiteral, Or, StripLeading, ToNumber } from "inferred-types/types";

/**
 * **AbsMaybe**`<T>`
 *
 * Converts any literal numeric into the **absolute value** of the number.
 *
 * - you can pass in a numeric string literal and it perform ABS func while
 * preserving string literal type
 * - if a wide numeric type is used for `T` this utility will resolve to `number`
 * as the absolute value can not be known at design time; if you'd prefer to
 * block any wide types then use `Abs` instead
 */
export type AbsMaybe<T extends number | `${number}`> = If<
    Or<[IsNumericLiteral<T>, IsStringLiteral<T>]>,
    T extends string
        ? StripLeading<T, "-">
        : ToNumber<StripLeading<AsString<T>, "-">>,
    number
>;
