import { ObjectKey } from "src/types";


/**
 * **IndexableObject**
 * 
 * Represents any object which can be indexed by a valid key
 * for a JS object/dictionary. This kind of object _may_ or _may not_ have 
 * any explicit types defined but it does allow for any property to be added 
 * later without that resulting in an error to the type's definition.
 * 
 * This kind of type definition is _flexible_ for runtime code but may not
 * be what you want for the most type literal definitions.
 * 
 * **Related:** `EmptyObject`, `IndexedObject`
 */
export type IndexableObject = Record<ObjectKey, unknown>;
