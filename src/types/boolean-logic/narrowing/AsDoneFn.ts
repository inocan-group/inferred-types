
export type AsDoneFn<T> = T extends { done: Fn }
  ? T
  : never;
