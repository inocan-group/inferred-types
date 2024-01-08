type Iterate<T extends number, A extends number[] = []> = A["length"] extends T
  ? A
  : Iterate<T, [...A, A["length"]]>;

type LengthDiff<A extends unknown[], B extends unknown[]> = A extends [
  unknown,
  ...infer ATail
]
  ? B extends [unknown, ...infer BTail]
    ? LengthDiff<ATail, BTail>
    : A["length"]
  : B extends []
  ? 0
  : never;

export type Subtract<M extends number, S extends number> = LengthDiff<
  Iterate<M>,
  Iterate<S>
>;
