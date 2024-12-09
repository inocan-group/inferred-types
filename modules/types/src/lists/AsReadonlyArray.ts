export type AsReadonlyArray<T extends unknown[]> = T extends readonly[]
  ? T
  : readonly unknown[];
