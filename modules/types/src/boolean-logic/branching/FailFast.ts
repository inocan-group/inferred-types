import type {
    AfterFirst,
    And,
    Extends,
    First,
    If,
    IsError,
    IsFalse,
    IsNever,
    IsTrue,
    IsUnset,
    MergeObjects,
    Or,
    Unset
} from "inferred-types/types";

type Rtn<
    T,
    TErr extends Unset | Error
> = IsNever<T> extends true
    ? If<IsUnset<TErr>, never, TErr>
    : IsFalse<T> extends true
        ? If<IsUnset<TErr>, false, TErr>
        : IsError<T> extends true
            ? T
            : never;

type IsFail<
    T,
    TErr extends Record<string, boolean>
> = Or<[
    And<[IsNever<T>, IsTrue<TErr["never"]>]>,
    And<[IsFalse<T>, IsTrue<TErr["false"]>]>,
    And<[Extends<T, Error>, IsTrue<TErr["error"]>]>
]>;

export interface FailFastOptions {
    err?: Unset | Error;
    failureConditions?: Record<string, boolean>;
}

interface DefaultOption extends Required<FailFastOptions> {
    err: Unset;
    failureConditions: {
        error: true;
        never: true;
        false: true;
    };
}

type Opt<T extends FailFastOptions> = MergeObjects<DefaultOption, T> extends Required<FailFastOptions> ? MergeObjects<DefaultOption, T> : never;

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
    TOpt extends FailFastOptions = DefaultOption
> = [] extends TTests
    ? undefined
    : [any] extends TTests
        ? IsFail<TTests[0], Opt<TOpt>["failureConditions"]> extends true
            ? Rtn<TTests[0], Opt<TOpt>["err"]>
            : TTests[0] // success
        : IsFail<First<TTests>, Opt<TOpt>["failureConditions"]> extends true
            ? Rtn<First<TTests>, Opt<TOpt>["err"]>

            : FailFast<
                AfterFirst<TTests>,
                TOpt
            >;
