import { AfterFirst } from "../lists";
import { First } from "../lists/First";
import { Narrowable } from "../Narrowable";
import { And } from "./And";

/**
 * **Extends**`<T, EXTENDS>`
 *
 * Boolean type utility which returns `true` if `T` _extends_ `EXTENDS`.
 */
export type Extends<T extends Narrowable, EXTENDS extends Narrowable> = T extends EXTENDS
  ? true
  : false;
/**
 * **IfExtends**
 *
 * Branching type utility which returns type `IF` when `E` _extends_ `T`; otherwise
 * it will return the type `ELSE`.
 */
export type IfExtends<
  T extends Narrowable,
  EXTENDS extends Narrowable,
  IF extends Narrowable,
  ELSE extends Narrowable
> = Extends<T, EXTENDS> extends true ? IF : ELSE;

type ExtendAllAcc<
  V extends Narrowable,
  T extends readonly any[],
  Processed extends readonly any[] = []
> = [] extends T
  ? And<Processed>
  : First<T> extends V
    ? ExtendAllAcc<V, AfterFirst<T>, readonly [...Processed, true]>
    : ExtendAllAcc<V, AfterFirst<T>, readonly [...Processed, false]>;

/**
 * **ExtendsAll**`<V,T[]>`
 * 
 * A type utility which provides a boolean response on whether the value `V`
 * extends all of the properties in the array of `T`
 */
export type ExtendsAll<
  V extends Narrowable,
  T extends readonly any[]
> = ExtendAllAcc<V,T>;


/**
 * **IfExtendsAll**`<V,T,IF,ELSE>`
 * 
 * Type utility which converts the type based on whether `V` _extends_
 * all the values in `T`.
 */
export type IfExtendsAll<
  V extends Narrowable,
  T extends readonly any[],
  IF extends Narrowable,
  ELSE extends Narrowable
> = ExtendsAll<V,T> extends true ? IF : ELSE;