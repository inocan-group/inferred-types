import { IfAnd, IfBoolean, IsNumber, IsString } from "src/types/boolean-logic";
import { CamelCase, KebabCase, PascalCase, StripLeading, StripTrailing } from "src/types/string-literals";
import { ToString } from "../ToString";
import { TypeTuple } from "../TypeTuple";
import { TypeMapTransformerOp } from "./TypeMapTransformer";

/**
 * **UseTypeMapTransformer**`<TValue,TTransform>`
 * 
 * Converts `TValue` using the `TypeMapTransformer` in `TTransform`
 */
export type UseTypeMapTransformer<
  TValue,
  TOp extends TypeMapTransformerOp,
  TParam
> = TOp extends "Identity"
  ? TValue
  : TOp extends "Capitalized" ? Capitalize<TValue & string>
  : TOp extends "PascalCase" ? PascalCase<TValue & string>
  : TOp extends "CamelCase" ? CamelCase<TValue & string>
  : TOp extends "KebabCase" ? KebabCase<TValue & string>
  : TOp extends "ToString" ? ToString<TValue>
  : TOp extends "ToTrue" ? true
  : TOp extends "ToFalse" ? false
  : TOp extends "ToBoolean" ? boolean
  : TOp extends "AsString" ? ToString<TValue>
  : TOp extends "AsBooleanString" ? IfBoolean<TValue, `${TValue & (true | false)}`, never>
  : TOp extends "AsNumericString" ? IfAnd<[IsString<TValue>, IsNumber<TValue>], ToString<TValue>, never>
  : TOp extends "NumericLiteral" ? TParam 
  : TOp extends "StringLiteral" ? TParam
  : TOp extends "StripLeading" ? StripLeading<TValue & string, TParam>
  : TOp extends "StripTrailing" ? StripTrailing<TValue & string, TParam>
  : TOp extends "As" ? TParam extends TypeTuple ? TValue & TParam[0] : never
  : never;
