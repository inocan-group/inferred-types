/**
 * **UnionToIntersection**`<U>`
 * 
 * Type utility which converts a union type to an intersection
 */
export type UnionToIntersection<U> = (
  U extends unknown ? (arg: U) => 0 : never
) extends (arg: infer I) => 0
  ? I
  : never;


  