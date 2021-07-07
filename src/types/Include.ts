/**
 * **Include<T, U, L>**
 * 
 * _Allows_ any value `T` which extends `U` otherwise sets type to `never`. Normally, you'll just ignore
 * the `L` generic but if need the comparison to be literal you can set to `true`: 
 * 
 * ```ts
 * const foo: "foo" = "foo";
 * // "foo"
 * type Normal = Include<typeof foo, string>;
 * // L1 is never, L2 is "foo"
 * type L1 = Include<typeof foo, string, true>;
 * type L2 = Include<typeof foo, "foo", true>;
 * ```
 */
export type Include<T, U, L extends boolean = false> = L extends true
  ? T extends U ? U extends T ? T : never : never
  : T extends U ? T : never;
