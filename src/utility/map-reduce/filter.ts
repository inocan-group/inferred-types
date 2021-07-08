// inspired by [article](https://medium.com/@reidev275/creating-a-type-safe-dsl-for-filtering-in-typescript-53fe68a7942e)]


export type Filter<A> =
  | { kind: "Equals"; field: keyof A; val: A[keyof A] }
  | { kind: "Greater"; field: keyof A; val: A[keyof A] }
  | { kind: "Less"; field: keyof A; val: A[keyof A] }
  | { kind: "And"; a: Filter<A>; b: Filter<A> }
  | { kind: "Or"; a: Filter<A>; b: Filter<A> };

export const equals = <A, K extends keyof A>(field: K, val: A[K]): Filter<A> => ({
  kind: "Equals",
  field,
  val
});
export const greater = <A, K extends keyof A>(field: K, val: A[K]): Filter<A> => ({
  kind: "Greater",
  field,
  val
});
export const less = <A, K extends keyof A>(field: K, val: A[K]): Filter<A> => ({
  kind: "Less",
  field,
  val
});
export const and = <A>(a: Filter<A>, b: Filter<A>): Filter<A> => ({
  kind: "And",
  a,
  b
});
export const or = <A>(a: Filter<A>, b: Filter<A>): Filter<A> => ({
  kind: "Or",
  a,
  b
});