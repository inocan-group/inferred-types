import { ObjectKey } from "./ObjectKey";

/**
 * **KV**`<[K],[V]>`
 * 
 * Represents a Key/Value dictionary type.
 */
export type KV<
  K extends ObjectKey = ObjectKey,
  V = unknown
> = Record<K,V>;
