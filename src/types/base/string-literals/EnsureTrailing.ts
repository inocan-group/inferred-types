import { IfLiteral } from "..";


/**
 * **EnsureTrailing**`<T, U>`
 *
 * Will ensure that `T` ends with the substring `U` when
 * both are string literals.
 *
 * ```ts
 * type T = "Hello";
 * type U = " World";
 * // "Hello World"
 * type R = EnsureTrailing<T,U>;
 * ```
 */
export type EnsureTrailing<T extends string, U extends string> = IfLiteral<
  // can only operate on literal strings
  T,
  // this path represents successful strip opp
  // but we must never accept `U` being wide
  string extends U ? never : T extends `${string}${U}` ? T : `${T}${U}`,
  // here we must stay wide
  string
>;
