export type ExpandRecursively<T> = T extends object
  ? { [K in keyof T]: ExpandRecursively<T[K]> }
  : T;