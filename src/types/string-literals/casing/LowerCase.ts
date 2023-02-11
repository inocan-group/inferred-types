export type LowerCase<T> = T extends string
  ? Lowercase<T>
  : never;
