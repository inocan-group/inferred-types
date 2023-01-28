/* eslint-disable @typescript-eslint/no-unused-vars */

import { Concat,  LeftWhitespace, RightWhitespace, Trim } from "../../types";
import { DashUppercase } from "./DashUppercase";
import { LowerAllCaps } from "./LowerAllCaps";

/**
 * **KebabCase**`<TString,TPreserve>`
 * 
 * Converts a string literal into a `kebab-case` format while optionally
 * allowing surrounding whitespace.
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
export type KebabCase<
  TString extends string,
  TPreserve extends boolean = false
> = TPreserve extends true
  
  ? // preserve
    Concat<[
      LeftWhitespace<TString>,
      KebabCase<TString, false>,
      RightWhitespace<TString>
    ]>
  
  : // remove whitespace
    string extends TString
      ? string
      : DashUppercase<Trim<LowerAllCaps<TString>>> extends `${infer Begin}${"_" | " "}${infer Rest}`
      ? KebabCase<`${Lowercase<Begin>}-${Rest}`>
      : Lowercase<DashUppercase<Uncapitalize<Trim<LowerAllCaps<TString>>>>>;
