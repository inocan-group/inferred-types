/**
 * **unionize**(value,inUnionWith)
 *
 * Takes a runtime **value** and modifies it's type to be a union with
 * the type of `inUnionWith` parameter (but does not change the actual
 * runtime value).
 */
export function unionize<T, U>(value: T, _inUnionWith: U): T | U {
  return value as T | U;
}
