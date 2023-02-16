import { Key } from "../dictionary/Key";

/**
 * **IndexableObject**
 * 
 * Meant to represent any _indexable_ object.
 */
export type IndexableObject = Record<Exclude<Key, number>, unknown>;
