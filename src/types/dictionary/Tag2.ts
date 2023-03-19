/ Refer to https://github.com/type-challenges/type-challenges/issues/22316;

// ===========
// == Utils ==
// ===========

// A computed property name in a type literal must refer to an expression whose type is a literal type or a 'unique symbol' type.ts(1170)
declare const UniqueSymbol: unique symbol;
type UniqueSymbolType = typeof UniqueSymbol;

type _FilterEmpty<B, D> =
  Equal<B, null> extends true ? null :
    Equal<B, undefined> extends true ? undefined :
      D;

type _PendingType = 1; // <T>() => T
type _StoreTagsByStringArray<TAGS extends string[]> = {
  // The expression usage with `_{PendingType}` is meant to enable assignment among each tag.
  // [UniqueSymbol]?: ([ TAGS ] | _PendingType) & _PendingType // It could solve issue① while comes another issue.
  [UniqueSymbol]?: (TAGS | _PendingType) & _PendingType; // Utilize issue① below
};

type _Includes<A extends readonly unknown[], B extends readonly unknown[]> =
  A extends [...B, ...unknown[]]
    ? true
    : A extends [unknown, ...infer Rest]
      ? _Includes<Rest, B>
      : false;

type _Union2Intersection<U> =
  (U extends unknown ? (arg: U) => void : never) extends
  (arg: infer I) => void ? I : never;

type _GetTags<B> = [B] extends [never] ? [] : B extends _StoreTagsByStringArray<infer Tags extends string[]>
  ? Tags extends (infer S extends string[]) & _PendingType // Issue①: it would infer to `TAGS & _PendingType`.
    ? S
    : []
  : [];

// ===========
// == Start ==
// ===========

type GetTags<B> = _Union2Intersection<(_GetTags<B>)> extends infer Result
  ? Result extends never
    ? []
    : Result extends string[]
      ? Result
      : never
  : never;

type Tag<B, T extends string, _UB = UnTag<B>> = _FilterEmpty<B, _UB & _StoreTagsByStringArray<[ ...GetTags<B>, T ]>>;

type UnTag<B> = _FilterEmpty<B, Omit<B, UniqueSymbolType>>;

type HasTag<B, T extends string> = _Includes<GetTags<B>, [T]>;
type HasTags<B, T extends readonly string[]> = _Includes<GetTags<B>, T>;
type HasExactTags<B, T extends readonly string[]> = Equal<GetTags<B>, T>;
