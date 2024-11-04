import { AnyObject, LeftRight } from "@inferred-types/types";

/**
 * **UniqueKv**`<L,R>`
 *
 * Returns a `LeftRight` tuple containing the unique KV pairs found in `L` and `R`. Both `L` and `R` are expect to be an
 * object type of some sort.
 *
 * - this means that if _both_ `L` and `R` have a shared property but the values
 * are different then they are considered "unique" for each list.
 *
 * **Related:** `Unique`, `UniqueKeys`
 */
export type UniqueKv<L extends AnyObject, R extends AnyObject> = LeftRight<
  Exclude<L, keyof (L & R)>,
  Exclude<R, keyof (L & R)>
>;
