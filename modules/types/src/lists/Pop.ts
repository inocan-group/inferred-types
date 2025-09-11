import type { Chars, Concat, Decrement, HasOptionalElements, MakeOptional, IsStringLiteral, IsWideType, Tuple, OptionalProps, TupleMeta } from "inferred-types/types";
import { IsGreaterThan } from '../boolean-logic/operators/scalar/numeric/IsGreaterThan';

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
    ? Required<TList> extends [...(infer Front extends [unknown, ...unknown[]]), unknown ]
        ? HasOptionalElements<TList> extends true
            ? TupleMeta<TList>["optionalElementCount"] extends infer Optional extends number
                ? IsGreaterThan<Decrement<Optional>, 0> extends true
                    ? MakeOptional<Front, Decrement<Optional>> extends infer Next extends readonly Exclude<TList, string>[number][]
                        ? Front | Pop<Next> | ["testing", Decrement<Optional>, Pop<Next>]
                        : never
                : Front | Pop<Front>
                : Front | Pop<Front>
            : Front
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
