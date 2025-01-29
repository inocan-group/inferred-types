import type { AfterFirst, AnyObject, First, FromTo, StringKeys } from "inferred-types/types";

type Convert<
  TObj extends AnyObject,
  TKeys extends readonly (string & keyof TObj)[],
  TResult extends readonly FromTo[] = [],
> = [] extends TKeys
  ? TResult
  : Convert<
    TObj,
    AfterFirst<TKeys>,
    [
      ...TResult,
      ...(
        TObj[First<TKeys>] extends FromTo
          ? [TObj[First<TKeys>]]
          : TObj[First<TKeys>] extends number
            ? [{ from: First<TKeys>; to: `${TObj[First<TKeys>]}` }]
            : TObj[First<TKeys>] extends string
              ? [{ from: First<TKeys>; to: TObj[First<TKeys>] }]
              : []
      ),
    ]
  >;

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
export type AsFromTo<T extends AnyObject> = Convert<T, StringKeys<T>>;
