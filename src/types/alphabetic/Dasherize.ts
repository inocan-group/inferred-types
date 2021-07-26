/* eslint-disable @typescript-eslint/no-unused-vars */
import { Trim } from "../string-literals";

type _DU<T extends string> = T extends Lowercase<T> ? T : `-${Lowercase<T>}`;

/**
 * Converts uppercase characters to a dash and then the lowercase equivalent
 * ```ts
 * // "one-two-three"
 * type T = DashUppercase<"oneTwoThree">;
 * ```
 * 
 * _Intended to be used as a lower level utility; prefer `Dasherize<T>` for more full-fledged
 * dash solution_.
 */
type DashUppercase<T extends string> =
  T extends `${infer C0}${infer R}` ? `${_DU<C0>}${DashUppercase<R>}` :
  "";

/**
 * Converts a string literal into a _dasherized_ format while ignoring _exterior_ whitepace.
 * 
 * ```ts
 * // "foo-bar"
 * type Dash = Dasherize<"foo_bar">;
 * type Dash = Dasherize<"fooBar">;
 * type Dash = Dasherize<"FooBar">;
 * // "\n  foo-bar \t"
 * type Dash = Dasherize<"\n  fooBar \t">;
 * ```
 */
export type Dasherize<S extends string> =
  DashUppercase<Trim<S>> extends `${infer Begin}${"_" | " "}${infer Rest}`
  ? Dasherize<`${Lowercase<Begin>}-${Rest}`>
  : Lowercase<DashUppercase<Uncapitalize<S>>>;
