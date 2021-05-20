/**
 * Preserves typing for a higher order function
 */
export type HigherOrderFn<P1 extends any[], P2 extends any[], S extends any> = (
  p1: P1
) => (p2: P2) => S;

export type HigherOrderIdentity<I extends any, P extends any[]> = (i: I) => (p: P) => I;

export function ProxyHigherOrderDictionary<
  D extends Record<K, HigherOrderIdentity<I, P>>,
  K extends string,
  I extends {},
  P extends any[]
>(dict: D, value: I) {
  return Object.entries(dict).map([key, val] => ({[key]: value}))
}
