import type { MergeObjects, Narrowable, ObjectKey } from "inferred-types/types";

/**
 * **withDefaults**(defaults) → (obj) → _merged_
 *
 * Merges in default values to an existing object and maintains
 * narrow typing.
 */
export function withDefaults<
  TDefaults extends Record<ObjectKey, N>,
  N extends Narrowable,
>(with_defaults: TDefaults) {
  return <
    TObj extends Record<ObjectKey, W>,
    W extends Narrowable,
  >(obj: TObj) => {
    const merged = {
      ...with_defaults,
      ...obj,
    };

    return merged as unknown as MergeObjects<Required<TDefaults>, TObj>;
  };
}
