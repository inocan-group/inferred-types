import { NumericChar } from "src/types/string-literals";

type MakeArray<S extends string, T extends unknown[] = []> = S extends `${T["length"]}`
  ? T
  : MakeArray<S, [...T, 0]>;
type Multiply10<T extends unknown[]> = [...T, ...T, ...T, ...T, ...T, ...T, ...T, ...T, ...T, ...T];

/**
 * **ToNumber**`<TStr>`
 * 
 * Converts a string literal to a numeric literal.
 * 
 * ```ts
 * // 0
 * type Zero = Numeric<"0">;
 * // 100
 * type OneHundred = Numeric<"100">;
 * ```
 */
export type ToNumber<S extends string, T extends unknown[] = []> = S extends `${infer S1}${infer S2}`
  ? S1 extends NumericChar
    ? ToNumber<S2, [...Multiply10<T>, ...MakeArray<S1>]>
    : never
  : T["length"];

