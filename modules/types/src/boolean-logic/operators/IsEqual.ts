/**
 * **IsEqual**`<X,Y>`
 *
 * Type utility which tests whether two types -- `X` and `Y` -- are exactly the same type.
 *
 * - by default if either `X` or `Y` is an `any` value then this returns `never`
 * - if you'd like to allow the **any** type to be considered set `AllowNever` to true
 */
export type IsEqual<
    X,
    Y,
    TRUE = true,
    FALSE = false
> = [X] extends [Y]
    ? [Y] extends [X]
        ? TRUE
        : FALSE
    : FALSE;

/**
 * **Equals**`<X,Y>`
 *
 * Type utility which tests whether two types -- `X` and `Y` -- are exactly the same type
 */
export type Equals<X, Y, TTrue = true, TFalse = false> = IsEqual<X, Y, TTrue, TFalse>;
