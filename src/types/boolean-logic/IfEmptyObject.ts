import { Keys } from "../dictionary/Keys";

/**
 * **IsEmptyObject**`<T>`
 * 
 * Type utility which detects an object type that has no keys defined.
 * 
 * Note: unlike the `IsObject<T>` utility, this utility doesn't care if
 * this object-like structure is intersected with a function. It's utility
 * is just to detect whether the object _part_ of the type has keys or not.
 */
export type IsEmptyObject<T> = T extends Record<string, unknown>
  ? [] extends Keys<T>
    ? true
    : false
  : false;
