/**
 * type guard which tests `val` to see if it's a valid `Set<any>`
 */
export function isMap(val: unknown): val is Map<any, any> {
  return val instanceof Map;
}
