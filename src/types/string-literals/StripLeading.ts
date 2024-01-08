import { IfAnd, IfLiteral, IsString } from "..";

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
 * 
 * Note: 
 *   - if `T` is a non-string type then no transformation will be done
 *   - same applies to `U`
 */
export type StripLeading<T, U> = IfAnd<
  [ IsString<T>, IsString<U>],
  IfLiteral<
    // can only operate on literal strings
    T,
    // this path represents successful strip opp
    // but we must never accept `U` being wide
    string extends U ? never : T extends `${U & string}${infer After}` ? After : T,
    // here we must stay wide
    string
  >,
  T
>;
