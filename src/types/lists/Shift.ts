import { 
  Tuple, 
  IfString, 
  IfStringLiteral,  
  AsString,
  AfterFirst, 
  Chars, 
  AsArray, 
  Join,
  Split,
  Concat
} from "src/types/index";

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
> = T extends Tuple
? _Shift<AsArray<T>>
: _Shift<AsArray<Split<AsString<T>>>> extends readonly string[]
  ? Concat<_Shift<AsArray<Split<AsString<T>>>>>
  : never;
