import { IfAnd } from "../boolean-logic/And";
import { IfLiteral } from "../boolean-logic/IsLiteral";
import { IsString } from "../boolean-logic/IsString";
import { Narrowable } from "../literals/Narrowable";

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
export type StripTrailing<T extends Narrowable, U extends Narrowable> = IfAnd<
  [ IsString<T>, IsString<U>],
  IfLiteral<
    // can only operate on literal strings
    T,
    // this path represents successful strip opp
    // but we must never accept `U` being wide
    string extends U ? never : T extends `${infer Before}${U & string}` ? Before : T,
    // here we must stay wide
    string
  >,
  T
>;
