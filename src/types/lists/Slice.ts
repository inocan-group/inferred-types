import { Chars, Concat } from "../string-literals";
import { Length } from "./Length";

type NumberToArr<T extends number, R extends unknown[] = []> =
R["length"] extends T
    ? R
    : NumberToArr<T, [...R, 0]>;

type ToPositiveIndex<
  Arr extends readonly unknown[],
  N extends number,
> = `${N}` extends `-${infer P extends number}`
    ? NumberToArr<Arr["length"]> extends [...NumberToArr<P>, ...infer Rest]
      ? Rest["length"]
      : 0
    : N;

export type _Slice<
  TList extends readonly unknown[],
  TStart extends number = 0,
  TEnd extends number = TList["length"],
  Index extends unknown[] = [],
  R extends unknown[] = [],
  PStart extends number = ToPositiveIndex<TList, TStart>,
  PEnd extends number = ToPositiveIndex<TList, TEnd>,
> = TList extends [infer A, ...infer Rest]
? Index["length"] extends PEnd
  ? R
  : Index["length"] extends PStart
    ? _Slice<Rest, PStart, PEnd, [...Index, 0], [...R, A]>
    : R["length"] extends 0
      ? _Slice<Rest, PStart, PEnd, [...Index, 0], R>
      : _Slice<Rest, PStart, PEnd, [...Index, 0], [...R, A]>
: R;


/**
 * **Slice**`<TList, TStart, TEnd>`
 * 
 * Provides a slice of `TList`.
 * 
 * - negative indexes for `TEnd` can be used
 * - `TStart` defaults to 0
 * - `TEnd` defaults to the length of `TList`
 */
export type Slice<
  TList extends readonly unknown[] | string,
  TStart extends number = 0,
  TEnd extends number = Length<TList>,
> = TList extends readonly unknown[] 
? _Slice<[...TList],TStart,TEnd>
: TList extends string
  ? Chars<TList> extends readonly string[]
    ? Concat<_Slice<Chars<TList>, TStart, TEnd>>
    : never
  : never;

