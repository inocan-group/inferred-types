export type SnakeToDash<T extends string> = T extends `${infer HEAD}_${infer TAIL}`
  ? SnakeToDash<`${HEAD}-${TAIL}`>
  : T;
