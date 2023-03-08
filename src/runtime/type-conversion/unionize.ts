
/**
 * **unionize**(value,_inUnionWith)
 * 
 * Takes a runtime **value** and modifies it's type to be a union with
 * the type of `inUnionWith` parameter (but does not change the actual
 * runtime value).
 */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function unionize<T,U>(value: T, inUnionWith: U): T | U {
  return value as T | U;
}
