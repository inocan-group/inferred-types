import { IfNumericLiteral, IfStringLiteral } from "src/types/boolean-logic";
import { Narrowable } from "src/types/literals/Narrowable";
import { 
  StripLeading, 
  StripTrailing, 
  CamelCase, 
  KebabCase, 
  PascalCase 
} from "src/types/string-literals";
import { ToString } from "../ToString";
import { TypeMapRule } from "../TypeMapRule";
import { TypeTuple } from "../TypeTuple";

/**
 * **MappedValue**`<TValue, TRule>`
 * 
 * Converts a _type value_ `TValue` and a rule `TRule`
 * into a transformed type value.
 */
export type MappedValue<
  TValue extends Narrowable, 
  TRule extends TypeMapRule 
> = TRule["transform"][0] extends "Identity"
  ? TValue
  : TRule["transform"][0] extends "AsString"
  ? `${string}`
  : TRule["transform"][0] extends "AsNumericString"
  ? `${number}`
  : TRule["transform"][0] extends "AsBooleanString"
  ? `${false | true}`
  : TRule["transform"][0] extends "AsString"
  ? `${string}`
  : TRule["transform"][0] extends "ToString"
  ? ToString<TValue>
  : TRule["transform"][0] extends "ToTrue"
  ? true
  : TRule["transform"][0] extends "ToFalse"
  ? false
  : TRule["transform"][0] extends "Capitalized"
  ? Capitalize<`${string}`>
  : TRule["transform"][0] extends "PascalCase"
  ? PascalCase<`${string}`>
  : TRule["transform"][0] extends "CamelCase"
  ? CamelCase<`${string}`>
  : TRule["transform"][0] extends "KebabCase"
  ? KebabCase<`${string}`>

  : TRule["transform"][0] extends "As"
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  ? TRule["transform"][1] extends TypeTuple<infer TT,any> ? TT : never
  : TRule["transform"][0] extends "StripLeading"
  ? StripLeading<TValue, TRule["transform"][1]>
  : TRule["transform"][0] extends "StripTrailing"
  ? StripTrailing<TValue, TRule["transform"][1]>
  : TRule["transform"][0] extends "NumericLiteral"
  ? IfNumericLiteral<
      TRule["transform"][1], 
      TRule["transform"][1], 
      ["error", "invalid-numeric-literal"]
    >
  : TRule["transform"][0] extends "StringLiteral"
    ? IfStringLiteral<
        TRule["transform"][1], 
        TRule["transform"][1], 
        ["error", "invalid-string-literal"]
      >
  : unknown;
