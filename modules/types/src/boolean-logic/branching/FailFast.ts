import { IsNever, AfterFirst, First, Unset, If, IsUnset, IsTrue, IsFalse, IsError, Extends, Or } from "inferred-types/types";

type Rtn<T, TErr> = IsNever<T> extends true
? If<IsUnset<TErr>, never, TErr>
: IsFalse<T> extends true
? If<IsUnset<TErr>, false, TErr>
: IsError<T> extends true
? T
: never;

type IsFail<T> = Or<[
    IsNever<T>,
    IsFalse<T>,
    Extends<T, Error>
]>;

/**
 * **FailFast**`<TTests, TSuccess, [TErr]>`
 *
 * Accepts a tuple of types and immediately returns a
 * _failure_ condition as soon as one is encountered in `TTest`.
 *
 * Tests which _do not_ fail are passed over until the last test is processed
 * and if that is processed successfully then
 *
 * - a "failure" is a `never` value, a `false` value, or any type which extends the
 * `Error` class.
 * - if an Error is the failure state then this is always returned, however,
 * if a `never` or `false` value is the failure state you can specify an
 * error you'd like to be generated.
 */
export type FailFast<
    TTests extends readonly unknown[],
    TErr extends Unset | Error = Unset
> = [] extends TTests
? undefined
: [any] extends TTests
? IsFail<TTests[0]> extends true
    ? Rtn<TTests[0], TErr>
    : TTests[0] // success
: IsFail<First<TTests>> extends true
? Rtn<First<TTests>, TErr>

: FailFast<
    AfterFirst<TTests>,
    TErr
>

