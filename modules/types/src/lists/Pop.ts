import type { Chars, Concat, IsStringLiteral, IsWideType, Tuple } from "inferred-types/types";

type _Pop<
    TVal extends Tuple,
> = TVal extends [...(infer Rest), unknown]
    ? Rest
    : never;

/**
 * **Pop**`<TList>`
 *
 * Removes the last element of a list.
 * ```ts
 * // [1,2]
 * type T = Pop<[1,2,3]>;
 * ```
 *
 * - to provide additional utility, you can also pass
 * in a string literal and get back the literal with the last
 * character removed.
 * - when popping an empty tuple/array, the type remains `[]`
 */
export type Pop<
    TList extends readonly unknown[] | string,
> = TList extends readonly unknown[]
    ? TList extends [...(infer Front extends [unknown, ...unknown[]]), unknown ]
        ? Front
        : []
    : TList extends string
        ? IsWideType<TList> extends true
            ? string
            : IsStringLiteral<TList> extends true
                ? TList extends string
                    ? TList extends ""
                        ? ""
                        : Chars<TList> extends readonly string[]
                            ? Concat<_Pop<Chars<TList>>>
                            : never
                    : never
                : string
        : _Pop<Exclude<TList, string>>;
