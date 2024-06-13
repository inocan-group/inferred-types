/* eslint-disable @typescript-eslint/ban-types */

import {
  AnyObject,
  If,
  IsEqual,
  Unset
 } from "src/types/index";

/**
 * **OptionalKeys**`<T,[V]>`
 *
 * Provides a union type of the _keys_ in `T` which are
 * **optional** properties.
 *
 * **Note:** you also may optionally filter further by specifying a value
 * by the _value_ of the key and then only keys which are required AND
 * who extend `V` will be included in the union.
 *
 * **Related:** `OptionalKeys`, `RequiredProps` * Provides a union type of the _keys_ in `T` which are
 * **required** properties.
 *
 * **Note:** you also may optionally filter further by specifying a value
 * by the _value_ of the key and then only keys which are required AND
 * who extend `V` will be included in the union.
 *
 * **Related:** `RequiredKeys`, `RequiredProps`
 */
export type OptionalKeys<
  T extends AnyObject,
  V = Unset
> = {
  [K in keyof T]-?: {} extends { [P in K]: T[K] }
    ? If<IsEqual<V,Unset>, K, K extends V ? K : never>
    : never;
}[keyof T];
