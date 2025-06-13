import { As, IsAny } from "inferred-types/types";


/**
 * **IsEqual**`<X,Y>`
 *
 * Type utility which tests whether two types -- `X` and `Y` -- are
 * exactly the same type.
 *
 * - if either `X` or `Y` are **any** then this test resolves to **false**
 *
 * **Alias:** `Equals`
 */
export type IsEqual<
    X,
    Y,
    TTrue = true,
    TFalse = false
> = [X] extends [Y]
? [Y] extends [X]
    ? TTrue
: TFalse
: TFalse;

/**
 * **Equals**`<X,Y>`
 *
 * Type utility which tests whether two types -- `X` and `Y` -- are
 * exactly the same type.
 *
 * - if either `X` or `Y` are **any** then this test resolves to **false**
 *
 * **Alias:** `IsEqual`
 */
export type Equals<
    X, Y,
    TTrue = true,
    TFalse = false
> = As<
[IsAny<X>] extends [true]
    ? false
: [IsAny<Y>] extends [true]
    ? false
: [X] extends [Y]
    ? [Y] extends [X]
        ? TTrue
    : TFalse
: TFalse,
TTrue | TFalse
>
