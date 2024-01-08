import { AnyObject, AsNumber, Container, EmptyContainer, FixedLengthArray, Increment, Tuple, AsString, ExpandRecursively, ArrayElementType, IfDefined, Decrement } from "src/types";
import { Subtract } from "../numeric-literals/Subtract";

/**
 * **WithKey**`<T, K>`
 * 
 * Expresses that the key `K` should be guaranteed to be a _key_
 * of the container `T`.
 * 
 * - If `T[K]`'s type is already known than it is preserved
 * - If `T[K]`'s type is unknown then the type is set to _unknown_
 * 
 * This is intended to be used with tuples, arrays, and object types.
 */
export type WithKey<
  T extends Container,
  K extends string | number, 
> = T extends Tuple
  ? EmptyContainer<T> extends true
    ? FixedLengthArray<ArrayElementType<T>, Increment<AsNumber<K>>>
    : IfDefined<
        T[AsNumber<K>],
        T,
        [
          ...T, 
          ...FixedLengthArray<
            ArrayElementType<T>, 
            Subtract<AsNumber<K>, Decrement<T["length"]>>
          >
        ]
      >
  : T extends AnyObject
    ? EmptyContainer<T> extends true
      ? Record<K, unknown>
      : K extends keyof T
        ? T // T already knew about key
        : ExpandRecursively<T & Record<AsString<K>, unknown>>
        
  : never;

