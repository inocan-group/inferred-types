/**
 * **Extends**
 *
 * Boolean type utility which returns `true` if `E` _extends_ `T`.
 */
export type Extends<E, T> = E extends T ? true : false;

/**
 * **IfExtends**
 *
 * Branching type utility which returns type `IF` when `E` _extends_ `T`; otherwise
 * it will return the type `ELSE`.
 */
export type IfExtends<E, T, IF, ELSE> = Extends<E, T> extends true ? IF : ELSE;
