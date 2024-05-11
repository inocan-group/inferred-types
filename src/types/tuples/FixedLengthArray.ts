/* eslint-disable @typescript-eslint/no-explicit-any */
type Shift<A extends Array<any>> = 
  ((...args: A) => void) extends ((...args: [A[0], ...infer R]) => void) ? R : never;

type GrowExpRev<A extends any[], N extends number, P extends any[][]> = 
  A["length"] extends N ? A : [...A, ...P[0]][N] extends undefined ? GrowExpRev<[...A, ...P[0]], N, P> : GrowExpRev<A, N, Shift<P>>;

type GrowExp<A extends any[], N extends number, P extends any[][], L extends number = A["length"]> = 
  L extends N ? A : L extends 8192 ? any[] : [...A, ...A][N] extends undefined ? GrowExp<[...A, ...A], N, [A, ...P]> : GrowExpRev<A, N, P>;

type MapItemType<T, I> = { [K in keyof T]: I };

type Process<
  T,
  N extends number
> = N extends 0 
? [] 
: MapItemType<GrowExp<[0], N, []>, T>;

/**
 * **FixedLengthArray**`<T,N>`
 * 
 * Creates a fixed length `<N>` array of a given type `<T>`
 */
export type FixedLengthArray<T, N extends number> = 
Process<T,N> extends readonly unknown[]
  ? Process<T,N>
  : never;
