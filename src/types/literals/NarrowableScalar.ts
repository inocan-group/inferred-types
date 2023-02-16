/**
 * **NarrowableScalar**
 * 
 * A union of all types which are not "containers" (aka, objects and arrays) so that
 * properties like `{}` and `object` causing conflicts.
 */
export type NarrowableScalar = string 
  | number 
  | boolean 
  | symbol 
  | undefined 
  | void 
  | null;
