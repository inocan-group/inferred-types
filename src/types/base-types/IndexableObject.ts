import { ObjectKey, AnyObject, ExpandRecursively, IfNever } from "src/types";


/**
 * **IndexableObject**`<[TObj]>`
 * 
 * Represents any object which can be indexed by a valid key
 * for a JS object/dictionary. This kind of object _may_ or _may not_ have 
 * any explicit types defined but it does allow for any property to be added 
 * later without that resulting in an error to the type's definition.
 * 
 * The optional generic `T` allows you to express _known_ keys in addition
 * to the runtime option of adding more.
 * 
 * This kind of type definition is _flexible_ for runtime code but may not
 * be what you want for the most type literal definitions.
 * 
 * **Related:** `EmptyObject`, `IndexedObject`
 */
export type IndexableObject<TObj extends AnyObject | never = never> = 
IfNever<
  TObj,
  Record<ObjectKey, unknown>,
  ExpandRecursively< Record<ObjectKey, unknown> & TObj >
>;
