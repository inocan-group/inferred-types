

/**
 * type guard which tests `val` to see if it's a valid `Set<any>`
 */
export function isSet(val: unknown): val is Set<any> {
    return val instanceof Set;
}
