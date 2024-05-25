import { AsUnion, UnionElDefn } from "src/types/index";



export const union = <U extends readonly [UnionElDefn,...UnionElDefn[]]>(...elements: U) => {
  const result: unknown = elements.map(_el => {
    // TODO
  });

  return result as AsUnion<U>
};
