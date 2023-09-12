import { AfterFirst, IfLength, Length,  Tuple } from "src/types";

/**
 * **Last**`<TList>`
 * 
 * Returns the _last_ element in a list of elements
 */
export type Last<T extends Tuple> = IfLength<
  T, 1,
  // If only one array element then return it
  T[0],
  IfLength<
    T, 0,
    // no array element results in `never` type
    never,
    // otherwise 
    AfterFirst<T> extends readonly unknown[]
      ? T[Length<AfterFirst<T>>] extends T[number]
        ? T[Length<AfterFirst<T>>]
        : never
      : never
  >
>;

