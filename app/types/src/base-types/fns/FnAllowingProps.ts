import { Dictionary, ObjectKey, TypedFunction } from "src/types/index";


/**
 * **FnAllowingProps**
 *
 * Allows for any typed function and any associated key/value properties.
 *
 * - by default all properties are allowed and set to `unknown` but you can use
 * optional generic `TDict` to be more explicit about the properties.
 */
export type FnAllowingProps<
  TDict extends Dictionary = Record<ObjectKey,unknown>
> = TypedFunction & TDict;
