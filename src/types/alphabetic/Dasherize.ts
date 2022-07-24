/* eslint-disable @typescript-eslint/no-unused-vars */

import { Trim } from "../string-literals";
import { DashUppercase } from "./DashUppercase";
import { LowerAllCaps } from "./LowerAllCaps";

/**
 * Converts a string literal into a _dasherized_ format while ignoring _exterior_ whitespace.
 *
 * ```ts
 * // "foo-bar"
 * type Dash = Dasherize<"foo_bar">;
 * type Dash = Dasherize<"fooBar">;
 * type Dash = Dasherize<"FooBar">;
 * // "\n  foo-bar \t"
 * type Dash = Dasherize<"\n  foo bar \t">;
 * ```
 */
export type Dasherize<S extends string> = string extends S
  ? string
  : DashUppercase<Trim<LowerAllCaps<S>>> extends `${infer Begin}${"_" | " "}${infer Rest}`
  ? Dasherize<`${Lowercase<Begin>}-${Rest}`>
  : Lowercase<DashUppercase<Uncapitalize<Trim<LowerAllCaps<S>>>>>;
