import { AnyObject } from "src/types/boolean-logic/object";
import { SharedKeys } from "src/types/dictionary/SharedKeys";
import { keys } from "./keys";

/**
 * **sharedKeys**
 * 
 * Runtime utility which provides the _shared_ keys between two objects.
 */
export const sharedKeys = <
  A extends AnyObject,
  B extends AnyObject
>(a: A, b: B) => {
  const ka = keys(a);
  const kb = keys(b);

  return ka.filter(k => kb.includes(k)) as SharedKeys<A, B>;
};
