/**
 * **UnionToIntersection**`<U>`
 * 
 * Type utility which converts a union type to an intersection
 */
export type UnionToIntersection<U> = (
  U extends U ? (x: U) => unknown : never
) extends (x: infer R) => unknown
  ? R
  : never;
