type Digital = "0" | "1" | "2" | "3" | "4" | "5" | "6" | "7" | "8" | "9";
type MakeArray<S extends string, T extends any[] = []> = S extends `${T["length"]}`
  ? T
  : MakeArray<S, [...T, 0]>;
type Multiply10<T extends any[]> = [...T, ...T, ...T, ...T, ...T, ...T, ...T, ...T, ...T, ...T];

/**
 * Converts a string literal to a numeric literal
 * ```ts
 * // 0
 * type Zero = Numeric<"0">;
 * // 10
 * type Ten = Numeric<"10">;
 * ```
 */
export type Numeric<S extends string, T extends any[] = []> = S extends `${infer S1}${infer S2}`
  ? S1 extends Digital
    ? Numeric<S2, [...Multiply10<T>, ...MakeArray<S1>]>
    : never
  : T["length"];
