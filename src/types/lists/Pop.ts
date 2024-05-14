import { Concat, Tuple, IsStringLiteral,If, Chars } from "src/types/index";

type _Pop<
  TVal extends Tuple
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
 */
export type Pop<
  TList extends Tuple | string
> = TList extends string
    ? If<
        IsStringLiteral<TList>,
        TList extends string
        ? TList extends ""
          ? ""
          : Chars<TList> extends readonly string[]
            ? Concat<_Pop<Chars<TList>>>
            : never
        : never,
        string
      >
    : _Pop<Exclude<TList, string>>;



