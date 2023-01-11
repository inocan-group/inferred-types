import { IfTrue } from "../boolean-logic/boolean";
import { LeftWhitespace } from "src/types/string-literals/LeftWhitespace";
import { RightWhitespace } from "src/types/string-literals/RightWhitespace";
import { PascalCase } from "./PascalCase";
import { Concat } from "src/runtime/lists/Concat";

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
