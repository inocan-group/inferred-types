import type {
    Abs,
    And,
    AsNegativeNumber,
    Err,
    FixedLengthArray,
    IsInteger,
    IsNegativeNumber,
    Xor
} from "inferred-types/types";

type Gte<
    A extends unknown[],
    B extends unknown[]
> = B extends []
    ? true
    : A extends []
        ? false
        : A extends [infer _, ...infer ATail]
            ? B extends [infer _, ...infer BTail]
                ? Gte<ATail, BTail>
                : never
            : never;

type Sub<
    A extends unknown[],
    B extends unknown[]
> = B extends []
    ? A
    : B extends [infer _, ...infer BTail]
        ? A extends [infer _, ...infer ATail]
            ? Sub<ATail, BTail>
            : never
        : never;

type Div<
    A extends unknown[],
    B extends unknown[],
    Q extends unknown[] = []
> = Gte<A, B> extends true
    ? Div<Sub<A, B>, B, [...Q, unknown]>
    : Q;

/**
 * **Divide**<A,B>
 *
 * A type utility that will divide two integers.
 */
export type Divide<A extends number, B extends number>
    = number extends A
        ? number
        : number extends B
            ? number
            : And<[
                IsInteger<A>,
                IsInteger<B>
            ]> extends true
                ? B extends 0
                    ? Err<
                        "divide/division-by-zero",
        `The Divide<${A},${B}> type utility can not receive 0 as the divisor.`,
        { a: A; b: B }
                    >
                    : Div<
                        FixedLengthArray<number, Abs<A>>,
                        FixedLengthArray<number, Abs<B>>
                    > extends infer D extends readonly unknown[]
                        ? Xor<IsNegativeNumber<A>, IsNegativeNumber<B>> extends true
                            ? AsNegativeNumber<D["length"]>
                            : D["length"]
                        : never
                : Err<
                    `divide/non-integer`,
        `The Divide<${A},${B}> can only be used with integer values!`,
        { a: A; b: B }
                >;
