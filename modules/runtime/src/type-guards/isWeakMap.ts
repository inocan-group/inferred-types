/**
 * type guard which tests `val` to see if it's a valid `WeakMap<any,any>`
 */
export function isWeakMap(val: unknown): val is WeakMap<any, any> {
    return val instanceof WeakMap;
}
