import { ObjectKey,  ExpandRecursively, IfNever, Keys, AnyObject } from "src/types/index";

export type GenericIndexableObject = {
  [key: string | symbol]: unknown;
};

/**
 * **IndexableObject**`<[TObj]>`
 * 
 * Represents any object which _can_ be indexed by a valid key
 * for a JS object/dictionary. These keys may be explicitly defined
 * or can be generically allowed via a generic index like `{[key: string]: unknown}`.
 * 
 * **Related:** `EmptyObject`, `IndexedObject`
 */
export type IndexableObject<TObj extends AnyObject = GenericIndexableObject> = 
IfNever<
  TObj,
  never,
  IfNever<
    Keys<TObj>["length"],
    GenericIndexableObject,
    ExpandRecursively< Record<ObjectKey, unknown> & TObj >
  >
>;
