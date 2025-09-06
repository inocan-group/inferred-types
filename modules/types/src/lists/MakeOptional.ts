import type { FixedLengthArray, Slice, Subtract } from "inferred-types/types";

type Process<
    T extends readonly unknown[],
    U extends number,
    R extends number = Subtract<T["length"], U>
> = R extends 0
    ? Partial<T>
    : T extends readonly [...FixedLengthArray<unknown, R>, ...infer _Rest]
        ? [
            ...(
                Slice<T, 0, R> extends readonly unknown[]
                    ? Slice<T, 0, R>
                    : []
            ),
            ...(
                T extends readonly [
                    ...FixedLengthArray<unknown, R>,
                    ...infer Rest
                ]
                    ? Partial<Rest>
                    : []
            )

        ]
        : T;

/**
 * **MakeOptional**`<T>`
 *
 * Take a tuple `T` and makes the last `U` elements _optional_ with the
 * `?` optional modifier.
 *
 * ```ts
 * // [ string, number, string? ]
 * type Test = MakeOptional<[string, number, string], 1>;
 * ```
 *
 * **Note:**
 * - the mix of optional vs. required elements in `T` has no bearing on
 * the outcome.
 */
export type MakeOptional<
    T extends readonly unknown[],
    U extends number
> = Process<T, U>;
