import { IfLiteral } from "../boolean-logic/IsLiteral";

/**
 * **StripEnding**`<T, U>`
 *
 * Will strip off of `T` the ending defined by `U` when
 * both are string literals.
 * ```ts
 * type T = "Hello World";
 * type U = " World";
 * // "Hello"
 * type R = StripEnding<T,U>;
 * ```
 */
export type StripTrailing<T extends string, U extends string> = IfLiteral<
  // can only operate on literal strings
  T,
  // this path represents successful strip opp
  // but we must never accept `U` being wide
  string extends U ? never : T extends `${infer Before}${U}` ? Before : T,
  // here we must stay wide
  string
>;
