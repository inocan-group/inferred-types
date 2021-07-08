export type DashToSnake<T extends string> = T extends `${infer HEAD}-${infer TAIL}`
  ? DashToSnake<`${HEAD}_${TAIL}`>
  : T;
