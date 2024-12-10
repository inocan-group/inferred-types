import type { AsUnion, UnionElDefn } from "inferred-types/types";

/**
 * **union**
 *
 * provides API implementation for defining a union
 */
export function union<U extends readonly [UnionElDefn, ...UnionElDefn[]]>(...elements: U) {
  const result: unknown = elements.map((_el) => {
    // TODO
  });

  return result as AsUnion<U>;
}
