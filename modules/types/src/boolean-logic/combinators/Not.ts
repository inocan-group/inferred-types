import type {
    As,
    IsAny,
    IsBoolean,
    IsFalse,
    IsNever,
    IsTrue,
    Logic,
    LogicHandler,
} from "inferred-types/types";

/**
 * **Not**`<T,[TError]>`
 *
 * A boolean negation that can work on both a single value or an
 * tuple of values.
 *
 * ```ts
 * // false
 * type Single = Not<true>;
 * // [ false, true, boolean ]
 * type Multi = Not<[true,false,boolean]>;
 * ```
 *
 * **Related:** `Inverse`
 */
export type Not<
    TVal,
    TNotBoolean extends LogicHandler = "false",
> = [IsAny<TVal>] extends [true]
? false
: [IsNever<TVal>] extends [true]
? false
: [TVal] extends [readonly unknown[]]
        ? {
            [K in keyof TVal]: Logic<TVal, TNotBoolean>
        }
        : [IsTrue<Logic<TVal, TNotBoolean>>] extends [true]
            ? false
            : [IsFalse<Logic<TVal, TNotBoolean>>] extends [true]
                ? true
                : [IsBoolean<Logic<TVal, TNotBoolean>>] extends [true]
                    ? boolean
                    : never;
