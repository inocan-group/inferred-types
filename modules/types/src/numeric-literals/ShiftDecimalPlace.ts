import { As, Contains, IsGreaterThan, IsNegativeNumber, IsNumericLiteral } from "types/boolean-logic";
import { Slice } from "types/lists";
import { Abs, Decrement, NumberLike, Subtract } from "types/numeric-literals";
import { Repeat, Split, StrLen } from "types/string-literals";
import { AsNumber } from "types/type-conversion";
import { IsLessThan } from '../boolean-logic/operators/numeric/IsLessThan';


/**
 * in effect this divides by multiples of 10
 */
type ShiftRight<
    T extends `${number}`,
    U extends number
> = number extends U
? `${number}`
: Contains<T, "."> extends true
    ? Split<T, "."> extends [
        infer Left extends string,
        infer Right extends string
    ]
        ? U extends StrLen<Right>
            ? `${Left}${Right}`
        : IsGreaterThan<StrLen<Right>, U> extends true
            ? `${Left}${Right}.${Slice<Right, U>}`
        : Subtract<StrLen<Right>, U> extends infer Num extends number
            ? `${Left}${Right}${Repeat<"0", Num>}`
    : never
    : never
: `${T}${Repeat<"0", U>}`;


/**
 * in effect this multiples by multiples of 10
 */
type ShiftLeft<
    T extends `${number}`,
    U extends number
> = number extends U
? `${number}`
: Contains<T, "."> extends true
    // T is a decimal number
    ? Split<T, "."> extends [
        infer Left extends string,
        infer Right extends string
    ]
        ? U extends StrLen<Left>
            ? `0.${Left}${Right}`
        : IsGreaterThan<StrLen<Left>, U> extends true
            ? Subtract<StrLen<Left>, U> extends infer Num extends number
                ? `${Slice<Left,0,Num>}.${Slice<Left,Num>}${Right}`
                : never
        : Subtract<StrLen<Left>, U> extends infer Num extends number
            ? `.${Repeat<"0", Num>}${Left}${Right}`
    : never
    : never
// T is an integer
: IsGreaterThan<StrLen<T>, U> extends true
    ? Subtract<StrLen<T>, U> extends infer Delta extends number
        ? `${Slice<T,0,Delta>}.${Slice<T,Delta>}`
        : never
    : StrLen<T> extends U
        ? `0.${T}`
        : Subtract<U, StrLen<T>> extends infer Delta extends number
            ? `0.${Repeat<"0",Delta> }${T}`
            : `0.${Repeat<"0", Decrement<U>>}${T}`

    ;


/**
 * **ShiftDecimalPlace**`<T,U>`
 *
 * Shift a number's decimal place left or right based on the numeric
 * value of `U`.
 *
 * - a _positive_ value in `U` shifts the decimal place to the right
 * (in effect _multiplying_ by a factor of 10)
 * - a _negative_ value in `U` shifts the decimal place to the left
 * (in effect _dividing_ by a factor of 10)
 *
 * If `T` or `U` are a wide type then this utility will return the
 * appropriate wide response but when literals are passed in you
 * should always get a literal `NumberLike` value back.
 *
 * ```ts
 * // 12345
 * type IntValue = ShiftDecimalPlace<"123.45", 2>;
 * ```
 */
export type ShiftDecimalPlace<
    T extends NumberLike,
    U extends number
> = U extends 0
? T
: T extends 0
? T
: IsNegativeNumber<U> extends true
    // Negative -> shift left
    ? T extends number
        ? IsNumericLiteral<T> extends true
            ? ShiftLeft<`${T}`, Abs<U>>
            : number
        : ShiftLeft<As<T, `${number}`>, Abs<U>>
    // Positive -> shift right
    : T extends number
        ? IsNumericLiteral<T> extends true
            ? AsNumber<ShiftRight<`${T}`, U>>
            : number
        : ShiftRight<As<T, `${number}`>, U>;

type X = ShiftDecimalPlace<`10`,-1>;
//   ^?
type Y = ShiftDecimalPlace<`123`,-5>;
//   ^?

