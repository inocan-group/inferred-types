import { IsNever, AfterFirst, First, Unset, If, IsUnset, IsTrue, IsFalse, IsError } from "inferred-types/types";


type Test<
    T extends readonly unknown[],
    TErr extends Unset | Error
> = [] extends T
? true
: IsNever<First<T>> extends true
    ? If<IsUnset<TErr>, never, TErr>
    : IsFalse<First<T>> extends true
    ? If<IsUnset<TErr>, false, TErr>
    : IsError<First<T>> extends true
    ? First<T>
    : Test<AfterFirst<T>, TErr>;

;
/**
 * **FailFast**`<TTests, TSuccess, [TErr]>`
 *
 * Accepts a tuple of types and immediately returns a
 * _failure_ condition as soon as one is encountered in `TTest`.
 *
 * If no _failures_ are encountered in `TTest` then the `TSuccess`
 * type if returned.
 *
 * - a "failure" is a `never` value, a `false` value, or any type which extends the
 * `Error` class.
 * - if an Error is the failure state then this is always returned, however,
 * if a `never` or `false` value is the failure state you can specify an
 * error you'd like to be generated.
 */
export type FailFast<
    TTests extends readonly unknown[],
    TSuccess,
    TErr extends Unset | Error = Unset
> = IsTrue<Test<TTests,TErr>> extends true
? TSuccess
: Test<TTests,TErr>;
