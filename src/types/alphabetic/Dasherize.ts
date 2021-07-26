/* eslint-disable @typescript-eslint/no-unused-vars */
import { DashUppercase, LowerAllCaps } from "~/types";
import { Trim } from "../string-literals";

/**
 * Converts a string literal into a _dasherized_ format while ignoring _exterior_ whitepace.
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
export type Dasherize<S extends string> = string extends S ? string :
  DashUppercase<Trim<LowerAllCaps<S>>> extends `${infer Begin}${"_" | " "}${infer Rest}`
  ? Dasherize<`${Lowercase<Begin>}-${Rest}`>
  : Lowercase<DashUppercase<Uncapitalize<Trim<LowerAllCaps<S>>>>>;
