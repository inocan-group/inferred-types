import { 
  Tuple, 
  IfString, 
  Concat, 
  Split, 
  IfStringLiteral,  
  IfEqual, 
  AsString,
  AfterFirst, 
  Chars, 
  AsArray 
} from "src/types";

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
  T extends string | Tuple
> = IfString<
  T,
  // string passed in
  IfStringLiteral<
    AsString<T>,
    T extends ""
      ? ""
      : AfterFirst< Chars<AsString<T>> >,
    never
  >,
  // array passed in
  _Shift<AsArray<T>>
>;


