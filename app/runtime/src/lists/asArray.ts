import { AsArray, Narrowable } from "src/types/index";

/**
 * Type utility which converts `undefined[]` to `unknown[]`
 */
export type UndefinedArrayIsUnknown<T extends unknown[]> = undefined[] extends T ? unknown[] : T;

/**
 * Ensures that any input passed in is passed back as an array:
 *
 * - if it was already an array than this just serves as an _identity_ function
 * - if it was not then it wraps the element into a one element array of the
 * given type
 *
 * Note: by default the _type_ of values will be intentionally widened so that the value "abc"
 * is of type `string` not the literal `abc`. If you want to keep literal types then
 * change the optional _widen_ parameter to _false_.
 */
 
export const asArray = <T extends Narrowable>(thing: T) => {
  return (
    Array.isArray(thing) === true
      ? // proxy thing back as it's already an array
        thing
      : typeof thing === "undefined"
      ? ([] as T[])
      : [thing]
  ) as AsArray<T>;
};
