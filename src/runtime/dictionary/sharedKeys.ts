import { AnyObject } from "src/types/base-types";
import { Key } from "src/types/dictionary/Key";
import { SharedKeys } from "src/types/dictionary/SharedKeys";

/**
 * **sharedKeys**
 * 
 * Runtime utility which provides the _shared_ keys between two objects.
 */
export const sharedKeys = <
  A extends AnyObject,
  B extends AnyObject
>(a: A, b: B): SharedKeys<A, B> => {
  const ka = Object.keys(a) as Key[];
  const kb = Object.keys(b) as Key[];

  return ka.filter(k => kb.includes(k)) as unknown as SharedKeys<A, B>;
};
