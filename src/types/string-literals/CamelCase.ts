import { IfTrue } from "types/boolean-logic";
import { LeftWhitespace , RightWhitespace } from "types/type-conversion";
import { PascalCase } from "types/string-literals";
import { Concat } from "runtime/lists/Concat";

/**
 * **CamelCase**`<TString,TPreserveWhitespace>`
 * 
 * Converts a string to `CamelCase` format while optionally preserving
 * surrounding whitespace. 
 */
export type CamelCase<
  TString extends string,
  TPreserveWhitespace extends boolean = false
> = IfTrue<
  TPreserveWhitespace,
  string extends TString
    ? string
    : Concat<[
      LeftWhitespace<TString>,
      Uncapitalize<PascalCase<TString>>,
      RightWhitespace<TString>
    ]>
  ,
  string extends TString
    ? string
    : Uncapitalize<PascalCase<TString>>
>;
