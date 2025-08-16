import type {
    AfterFirst,
    And,
    Contains,
    First,
    IsError,
    IsFalse,
    IsNever,
    Last,
    Unset
} from "inferred-types/types";

type IsFail<
    T,
    O extends Required<FailFastOptions>
> = And<[
    [IsNever<T>] extends [true] ? true : false,
    Contains<O["failureConditions"], "never">
]> extends true
    ? true
    : And<[
        IsFalse<T>,
        Contains<O["failureConditions"], "false">
    ]> extends true
        ? true
        : And<[
            IsError<T>,
            Contains<O["failureConditions"], "error">
        ]> extends true
            ? true
            : false;

type FailureCondition = "error" | "false" | "never";

export interface FailFastOptions {
    err?: Unset | Error;
    failureConditions?: FailureCondition[];
}

type DEFAULT = {
    err: Unset;
    failureConditions: ["error", "false", "never"];
};

type Opt<
    T extends FailFastOptions
> = {
    err: T["err"] extends Error ? T["err"] : DEFAULT["err"];
    failureConditions: T["failureConditions"] extends [FailureCondition, ...FailureCondition[]]
        ? T["failureConditions"]
        : DEFAULT["failureConditions"];
};

type RtnErr<
    T,
    O extends Required<FailFastOptions>
> = O["err"] extends Error
    ? O["err"]
    : T;

/**
 * **FailFast**`<TTests, TSuccess, [TErr]>`
 *
 * Accepts a tuple of types and immediately returns a
 * _failure_ condition as soon as one is encountered in `TTest`.
 *
 * Tests which _do not_ fail are passed over until the last test is processed
 * and if that is processed successfully then it's type is returned.
 *
 * - a "failure" is a `never`, `false`, or any `Error` type
 * - if you want to adjust this you can change the `failureConditions` in options
 */
export type FailFast<
    TTests extends readonly unknown[],
    TOpt extends FailFastOptions = DEFAULT,
    TLast = Last<TTests>
> = [] extends TTests
    ? TLast
    : IsFail<First<TTests>, Opt<TOpt>> extends true
        ? RtnErr<First<TTests>, Opt<TOpt>>
        : FailFast<
            AfterFirst<TTests>,
            TOpt,
            TLast
        >;
