import {  As, Dictionary, EmptyObject, IfUnset, ObjectKey, Unset } from "src/types/index";

/**
 * **RequiredKeys**`<T,[V]>`
 *
 * Provides a union type of the _keys_ in `T` which are
 * **required** properties.
 *
 * **Note:** you also may optionally filter further by specifying a value
 * by the _value_ of the key and then only keys which are required AND
 * who extend `V` will be included in the union.
 *
 * **Related:** `OptionalKeys`, `RequiredProps`
 */
export type RequiredKeys<
  T extends Dictionary,
  V = Unset> = As<{
  [K in keyof T]-?: EmptyObject extends { [P in K]: T[K] }
    ? never //
    : IfUnset<
        V,
        K,
        T[K] extends V
          ? K
          : never
      >;
}[keyof T], ObjectKey>;
