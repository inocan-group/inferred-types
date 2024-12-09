import type { If, IsEqual, IsUnion } from "../boolean-logic";
import type { Throw } from "../errors";
import type { Filter } from "../lists/Filter";
import type { TupleToUnion } from "./TupleToUnion";
import type { UnionToTuple } from "./UnionToTuple";

type InvalidCast<T> = Throw<
  "invalid-cast",
  `An attempt to cast a type as being non-null based was unsuccessful!`,
  "AsNonNull",
  { library: "inferred-types/constants"; value: T }
>;

/**
 * **AsNonNull**`<T>`
 *
 * A narrowing utility which ensures that a union type which includes a `null`
 * option will have the **null** option removed.
 *
 * **Note:** if `T` is _equal to **null** then an `ErrorCondition<"invalid-cast">`
 * will be raised.
 */
export type AsNonNull<T> = If<
  IsEqual<T, null>,
  InvalidCast<T>,
  IsUnion<T> extends true
    ? TupleToUnion<Filter<UnionToTuple<T>, null>>
    : T
> extends null
  ? never
  : If<
    IsEqual<T, null>,
    InvalidCast<T>,
    IsUnion<T> extends true
      ? TupleToUnion<Filter<UnionToTuple<T>, null>>
      : T
  >;
