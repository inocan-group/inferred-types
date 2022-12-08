import { IfLiteral } from "../boolean-logic/IsLiteral";

/**
 * **EnsureLeading**`<T, U>`
 *
 * Will ensure that `T` ends with the _substring_ `U` when
 * both are string literals.
 *
 * ```ts
 * type T = " World";
 * type U = "Hello";
 * // "Hello World"
 * type R = EnsureLeading<T,U>;
 * ```
 */
export type EnsureLeading<T extends string, U extends string> = IfLiteral<
  // can only operate on literal strings
  T,
  // this path represents successful strip opp
  // but we must never accept `U` being wide
  string extends U ? never : T extends `${U}${string}` ? T : `${U}${T}`,
  // here we must stay wide
  string
>;
