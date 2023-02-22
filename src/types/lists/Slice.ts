type NumberToArr<T extends number, R extends unknown[] = []> =
  R["length"] extends T
    ? R
    : NumberToArr<T, [...R, 0]>;

type ToPositiveIndex<
  Arr extends unknown[],
  N extends number,
> =
  `${N}` extends `-${infer P extends number}`
    ? NumberToArr<Arr["length"]> extends [...NumberToArr<P>, ...infer Rest]
      ? Rest["length"]
      : 0
    : N;

export type _Slice<
  TList extends unknown[],
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

export type Slice<
  TList extends unknown[],
  TStart extends number = 0,
  TEnd extends number = TList["length"],
> = _Slice<TList,TStart,TEnd>;
  