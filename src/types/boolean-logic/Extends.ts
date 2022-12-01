/**
 * **Extends**`<T, EXTENDS>`
 *
 * Boolean type utility which returns `true` if `T` _extends_ `EXTENDS`.
 */
export type Extends<T, EXTENDS> = T extends EXTENDS ? true : false;
/**
 * **IfExtends**
 *
 * Branching type utility which returns type `IF` when `E` _extends_ `T`; otherwise
 * it will return the type `ELSE`.
 */
export type IfExtends<E, T, IF, ELSE> = Extends<E, T> extends true ? IF : ELSE;
