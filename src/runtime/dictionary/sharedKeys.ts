import { AnyObject, SharedKeys } from "src/types";

/**
 * **sharedKeys**
 * 
 * Runtime utility which provides the _shared_ keys between two objects.
 */
export const sharedKeys = <
  A extends AnyObject,
  B extends AnyObject
>(a: A, b: B): SharedKeys<A, B> => {
  const ka = Object.keys(a) as PropertyKey[];
  const kb = Object.keys(b) as PropertyKey[];

  return ka.filter(k => kb.includes(k)) as unknown as SharedKeys<A, B>;
};
