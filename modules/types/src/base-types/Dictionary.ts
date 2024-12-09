import { ObjectKey } from "./ObjectKey";

/**
 * **Dictionary**`<[K],[V]>`
 * 
 * Represents a Key/Value dictionary type.
 * 
 * **Note:** this is pretty much the same as the built-in
 * `Record<K,V>` type of Typescript but 
 */
export type Dictionary<
  K extends ObjectKey = ObjectKey,
  V = unknown
> = Record<K,V>;
