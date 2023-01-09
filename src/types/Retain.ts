import { IfEquals } from "./boolean-logic/equivalency";
import { IfExtends } from "./boolean-logic/Extends";

/**
 * **Retain**`<TVal, TFilter, MakeEquality>`
 * 
 * Allows any value `T` which extends `U` otherwise removes it from
 * a union type. This is effectively the _inverse_ of `Omit<T, U>`.
 * 
 * The one additional feature of this type is the inclusion of the
 * optional generic `MakeEquality` which indicates of using the 
 * _extends_ operation to use _equality_ instead. This can sometimes
 * be useful for literal values.
 * 
 * ```ts
 * // string
 * type T1 = Retain<abc as string | number, string>;
 * ```ts
 */
export type Retain<
  TVal, 
  TFilter, 
  MakeEquality extends boolean = false
> = MakeEquality extends true
  ? IfEquals<TVal,TFilter, TVal, never>
  : IfExtends<TVal, TFilter, TVal, never>;
