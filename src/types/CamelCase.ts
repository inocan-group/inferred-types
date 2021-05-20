import { Lowercase, Capitalize } from "./Intrinsic";

type Delimiter = "_" | "-";

export type CamelCase<S extends string> = S extends `${infer B}${Delimiter}${infer A}${infer R}`
  ? `${Lowercase<B>}${Capitalize<A>}${CamelCase<R>}`
  : Lowercase<S>;
