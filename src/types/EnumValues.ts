/**
 * Provides the values of an Typescript **enum**:
 * ```ts
 * enum Foo { foo, bar, baz };
 * // "0" | "1" | "2"
 * type NumerericEnum = EnumValues<Foo>;
 * enum Bar { foo = "foey", bar = "barred" };
 * // "foey" | "barred"
 * type StringEnum = EnumValues<Bar>;
 * ```
 *
 * **Note:** combine with `Numeric` to get number based indexes
 */
export type EnumValues<T extends string | number> = `${T}`;
