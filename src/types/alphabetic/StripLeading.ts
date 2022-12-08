import { IfLiteral } from "../boolean-logic/IsLiteral";

/**
 * **StripStarting**`<T, U>`
 *
 * Will strip off of `T` the starting string defined by `U` when
 * both are string literals.
 * ```ts
 * type T = "Hello World";
 * type U = "Hello ";
 * // "World"
 * type R = StripStarting<T,U>;
 * ```
 */
export type StripLeading<T extends string, U extends string> = IfLiteral<
  // can only operate on literal strings
  T,
  // this path represents successful strip opp
  // but we must never accept `U` being wide
  string extends U ? never : T extends `${U}${infer After}` ? After : T,
  // here we must stay wide
  string
>;
