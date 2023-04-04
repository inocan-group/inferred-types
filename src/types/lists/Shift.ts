import { Tuple, IfString, Concat, Split, IfStringLiteral,  IfEqual } from "src/types";

type _Shift<TList extends Tuple> = //
TList extends [unknown, ...(infer Tail)]
  ? Tail
  : undefined;

type _ShiftChar<TList extends Tuple> = //
TList extends [unknown, ...(infer Tail)]
  ? Tail
  : never;


/**
 * **Shift**`<T>`
 * 
 * Removes the first element of a list, returning the rest.
 * ```ts
 * // [2,3]
 * type T = Shift<[1,2,3]>;
 * ```
 * 
 * - to provide additional utility, you can also pass
 * in a string literal and get back the literal with the first
 * character removed.
 */
export type Shift<
  T extends Tuple | string
> = 
IfEqual<
  T, "", 
  "",
  IfString<
    T,
    // handle string variant
    IfStringLiteral<
      T,
      Concat<_ShiftChar<
        Split<T & string>
      >>,
      string
    >,
    // handle list variant
    _Shift<Exclude<T, string>>
  >
>;
