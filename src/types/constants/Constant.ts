export type Constant<T extends string> = [
  kind: T, 
  uniqueness: Symbol
];
