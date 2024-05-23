import { AsUnion, UnionElDefn } from "src/types/literals/Shape";



export const union = <U extends readonly [UnionElDefn,...UnionElDefn[]]>(...elements: U) => {
  const result: unknown = elements.map(el => {
    // TODO
  });

  return result as AsUnion<U>
};
