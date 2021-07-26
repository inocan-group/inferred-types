/**
 * Type utility that provides the _length_ of a given string type
 * ```ts
 * const foo = "foo";
 * // 3
 * type Three = StringLength<typeof foo>;
 * ```
 */
export type StringLength<S extends string, A extends any[] = []> = S extends "" ? A["length"] : S extends `${infer First}${infer Rest}` ? StringLength<Rest, [First, ...A]> : never;
