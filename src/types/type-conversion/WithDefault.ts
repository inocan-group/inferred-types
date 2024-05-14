import { If, Extends, IsFalsy, Nothing } from "src/types/index";

/**
 * **WithDefault**`<TVal,TDef>`
 * 
 * Provided a type `TVal`, this utility will proxy any value which is
 * _not_ `null` or `undefined` through as `TVal`; otherwise it will 
 * substitute in `TDef`.
 * 
 * **Note:** you may optionally set the criteria for using the default
 * value from `null` or `undefined` to any _falsy_ value.
 * 
 * ### Examples
 * ```ts
 * // "foo"
 * type T1 = WithDefault<"foo","bar">;
 * // "bar"
 * type T2 = WithDefault<null,"bar">;
 * // "bar"
 * type T3 = WithoutDefault<"", "bar", "falsy">;
 * ```
 */
export type WithDefault<
  TVal, 
  TDef,
  TPolicy extends "nothing" | "falsy" = "nothing"
> = TPolicy extends "nothing"
? If<Extends<TVal, Nothing>, TDef, TVal>
: TPolicy extends "falsy"
  ? If<IsFalsy<TVal>,TDef, TVal>
  : never;
