export type AsObject<T> = T extends object
  ? T
  : never;
