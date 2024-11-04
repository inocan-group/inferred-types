import { Tuple } from "src/types/index";

type Compute<
  TStr extends string,
  TLen extends Tuple = []
> = TStr extends `${infer _Char}${infer Rest}`
  ? Compute<Rest, [...TLen, unknown]>
  : TLen["length"];

/**
 * **StrLen**`<T>`
 * 
 * Provides the length of a string if T is a string literal,
 * otherwise just returns `number` type.
 */
export type StrLen<T extends string> = Compute<T>;

