import type { Slice } from "./Slice";

type GetNonVariadicLength<
  T extends readonly unknown[],
  F extends readonly unknown[] = [],
> = [] extends T
  ? F["length"]
  : T extends [infer Explicit, ...infer REST]
    ? GetNonVariadicLength<
      REST,
      [...F, Explicit]
    >
    : F["length"];

export type NonVariadic<T extends readonly unknown[]> = Slice<
  T,
  0,
  GetNonVariadicLength<Required<T>>
>;

// type A = [1, 2, 3];
// type B = [1, 2, 3, number?];
// type BLen = B["length"];
// type BFix = GetNonVariadicLength<Required<B>>;
// type BSlice = Slice<B, 0, 3> //
// type C = [1, 2, 3, ...number[]];
// type CFix = GetNonVariadicLength<C>;
// type X = Required<[1, 2, 3?, 4?, ...number[]]>;
// type XFix = GetNonVariadicLength<X>;
// type D = [number?, number?];
// type DFix = GetNonVariadicLength<D>;
// type DLen = D["length"]
