type Shift<A extends Array<any>> =
  ((...args: A) => void) extends ((...args: [A[0], ...infer R]) => void) ? R : never;

type GrowExpRev<A extends any[], N extends number, P extends any[][]> =
  A["length"] extends N ? A : [...A, ...P[0]][N] extends undefined ? GrowExpRev<[...A, ...P[0]], N, P> : GrowExpRev<A, N, Shift<P>>;

type GrowExp<A extends any[], N extends number, P extends any[][], L extends number = A["length"]> =
  L extends N ? A : L extends 8192 ? any[] : [...A, ...A][N] extends undefined ? GrowExp<[...A, ...A], N, [A, ...P]> : GrowExpRev<A, N, P>;

type MapItemType<T, I> = { [K in keyof T]: I };

type Process<
  T,
  N extends number,
> = N extends 0
  ? []
  : MapItemType<GrowExp<[0], N, []>, T>;

/**
 * **FixedLengthArray**`<TType,TLen,[TOpt]>`
 *
 * Creates a fixed length `TLen` array of a given type `T`.
 *
 * - if `TOpt` is set to true then it will add an optional
 * continuation of the type to unlimited length
 */
export type FixedLengthArray<
  TType,
  TLen extends number,
  TExtends extends boolean = false,
> = TExtends extends true
  ? Process<TType, TLen> extends readonly unknown[]
    ? [...Process<TType, TLen>, ...TType[]]
    : never
  : Process<TType, TLen> extends readonly unknown[]
    ? Process<TType, TLen>
    : never;
