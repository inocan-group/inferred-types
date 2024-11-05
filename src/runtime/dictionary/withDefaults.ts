/* eslint-disable no-use-before-define */
import {  MergeObjects, Narrowable, ObjectKey } from "inferred-types/dist/types/index";

/**
 * **withDefaults**(defaults) → (obj) → _merged_
 *
 * Merges in default values to an existing object and maintains
 * narrow typing.
 */
export const withDefaults = <
  TDefaults extends Record<ObjectKey,N>,
  N extends Narrowable
>(
  with_defaults: TDefaults
) => <
  TObj extends Record<ObjectKey, W>,
  W extends Narrowable
>(obj: TObj) => {

  const merged = {
    ...with_defaults,
    ...obj
  };

  return merged as unknown as MergeObjects<Required<TDefaults>,TObj>;
}

