import type {
  AnyObject,
  FromTo,
  IsWideContainer,
  Values,
} from "inferred-types/types";

/** converts an object's key values into FromTo tuple */
type Convert<
  TObj extends AnyObject,
> = Values<{
  [K in keyof TObj]: {
    from: K;
    to: TObj[K];
  }
}, true>;

/**
 * **AsFromTo**`<T>`
 *
 * Converts an object-based lookup into a `FromTo`[] tuple.
 *
 * **Notes:**
 * - any value which is already a FromTo will be kept as is
 * - any value which is _not_ a number will be converted to a `NumberLike` string and added
 * - any value which is neither a string or any of the above will be discarded
 */
export type AsFromTo<
  T extends Record<string, string>,
> = IsWideContainer<T> extends true
  ? FromTo[]
  : Convert<T> extends readonly FromTo[]
    ? Convert<T>
    : never;
