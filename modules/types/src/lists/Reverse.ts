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
 *
 * **Note:**
 * - to ensure all elements are retained while **not** breaking the rules
 * regarding _optional_ elements not being allowed to precede _required_ ones
 * we convert all elements to **required** rather than risk losing elements.
 */
export type Reverse<T> = T extends readonly unknown[]
    ? RevAcc<Required<T>>
    : T extends string
        ? Join<RevAcc<Chars<T>>>
        : never;
