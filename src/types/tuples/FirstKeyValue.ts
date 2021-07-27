import { FirstKey } from "./FirstKey";

/**
 * Utility type which operates on a dictionary and provides the **value** of the
 * `First<T>` key of the dictionary. Because dictionary's don't provide assurances
 * about key order, this is typically only used in cases where it's known there is
 * a single key on the object.
 */
export type FirstKeyValue<T extends object> = FirstKey<T> extends keyof T ? T[FirstKey<T>] : never;