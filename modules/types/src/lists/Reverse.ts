import type { AfterFirst, Chars, First, Join } from "inferred-types/types";

type RevAcc<
    TInput extends readonly unknown[],
    TResults extends readonly unknown[] = [],
> = [] extends TInput
    ? TResults
    : RevAcc<
        AfterFirst<TInput>,
        [First<TInput>, ...TResults]
    >;

/**
 * **Reverse**`<T>`
 *
 * Reverses the order of a `Tuple` or a `string`.
 */
export type Reverse<T> = T extends readonly unknown[]
    ? RevAcc<T>
    : T extends string
        ? Join<RevAcc<Chars<T>>>
        : never;
