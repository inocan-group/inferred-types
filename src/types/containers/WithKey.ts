
import { AnyObject, IfAnd, First, AsNumber, Container, EmptyContainer, FixedLengthArray, Increment, Tuple, AsString, ExpandRecursively, ArrayElementType, IfDefined,   IsUndefined, AfterFirst, Not,  IfNever, KV  } from "src/types/index";

type MergeTuples<
  TDefaults extends Tuple,
  TOverrides extends Tuple,
  TResults extends Tuple = []
> = [] extends TDefaults
? [...TResults, ...TOverrides]
: MergeTuples<
    AfterFirst<TDefaults>,
    AfterFirst<TOverrides>,
    IfAnd<
      [ Not<IsUndefined<First<TDefaults>>>, IsUndefined<First<TOverrides>>  ],
      [...TResults, First<TDefaults>],
      [...TResults, IfNever<First<TOverrides>, unknown, First<TOverrides>>]
    >
  >;


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
 * 
 * **Note:** for numeric arrays, a contiguous set of numeric keys is always 
 * provided so all elements/keys added by this utility which were not
 * present in `T` will have a type of _unknown_.
 */
export type WithKey<
  T extends Container,
  K extends string | number, 
> = T extends Tuple
  ? EmptyContainer<T> extends true
    // add K in position and insert necessary prior elements
    ? FixedLengthArray<ArrayElementType<T>, Increment<AsNumber<K>>>
    : IfDefined<
        T[AsNumber<K>],
        // the key K already is known
        T,
        // the key K is not known so we'll merge it in
        MergeTuples<
          [...FixedLengthArray<unknown, AsNumber<K>>, K],
          T
        >
      >
  : T extends KV
    ? EmptyContainer<T> extends true
      ? Record<K, unknown>
      : K extends keyof T
        ? T // T already knew about key
        : ExpandRecursively<T & Record<AsString<K>, unknown>>
        
  : never;

