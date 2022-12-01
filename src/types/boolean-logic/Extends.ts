import { Narrowable } from "../Narrowable";

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
