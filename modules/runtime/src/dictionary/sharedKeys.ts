import { AnyObject, AsRecord, ObjectKey, SharedKeys } from "inferred-types/types";

/**
 * **sharedKeys**
 *
 * Runtime utility which provides the _shared_ keys between two objects.
 */
export const sharedKeys = <
  A extends AnyObject | object,
  B extends AnyObject | object
>(a: A, b: B): SharedKeys<AsRecord<A>, AsRecord<B>> => {
  const ka = Object.keys(a) as ObjectKey[];
  const kb = Object.keys(b) as ObjectKey[];

  return ka.filter(k => kb.includes(k)) as unknown as SharedKeys<AsRecord<A>, AsRecord<B>>;
};
