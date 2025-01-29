import type {
  AfterFirst,
  As,
  EmptyObject,
  ExpandDictionary,
  First,
  Keys,
} from "inferred-types/types";

type Process<
  T extends Record<string, string>,
  K extends readonly (keyof T)[],
  O extends Record<string, string> = EmptyObject,
> = [] extends K
  ? ExpandDictionary<O>
  : Process<
    T,
    AfterFirst<K>,
    O & Record<T[First<K>], First<K>>

  >;

/**
 * **ReverseLookup**`<T>`
 *
 * Inverts a table of string to string lookups so that the values
 * can now lookup the keys.
 */
export type ReverseLookup<T extends Record<string, string>> = Process<
  T,
  As<Keys<T>, readonly (string & keyof T)[]>
>;
