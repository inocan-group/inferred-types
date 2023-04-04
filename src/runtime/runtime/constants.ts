import { LowerAlphaChar, UnionToTuple, UpperAlphaChar } from "src/types";

// TODO: move constants into src/constants!

/**
 * **TYPE_OF**
 * 
 * The set of values which are possible results of the `typeof` command in Javascript.
 */
export const TYPE_OF = ["string", "number", "boolean", "undefined", "symbol", "bigint", "function", "object"] as const;

/**
 * Values which evaluate to _falsy_ in Javascript
 */
export const FALSY_VALUES = [false, 0, -0, "", null, undefined, Number.NaN] as const;


/**
 * Lowercase letters
 */
export const LETTER_LOWER = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z"] as UnionToTuple<LowerAlphaChar>;

/**
 * Uppercase letters
 */
export const LETTER_UPPER = ["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"] as UnionToTuple<UpperAlphaChar>;

/**
 * Letters (both upper and lowercase)
 */
export const LETTER = [...LETTER_LOWER,...LETTER_UPPER] as const;

export const TYPE_MATCHER_DESC = {
  Extends: "Matches types which 'extend' the type expressed.",
  Equals: "Matches types which 'equal' the type expressed.",
  NotEqual: "Matches types which 'do notequal' the type expressed.",
  StartsWith: "Matches string types which start with a given string literal.",
  EndsWith: "Matches types being mapped which 'do not equal' the type expressed.",
  Truthy: "Matches all types which are 'truthy' based on Javascript rules.",
  Falsy: "Matches all types which are 'falsy' based on Javascript rules.",
  Returns: "Matches all functions which return the specified type.",
  Any: "Matches against all types; provides a way to provide a fallback rule."
} as const;

export const TYPE_TRANSFORMER_DESC = {
  Identity: "The type matched is passed through 'as is'.",
  Capitalized: "Converts strings to a capitalized representation; passes through non-strings 'as is'.",
  PascalCase: "Converts strings to a PascalCase representation; passes through non-strings 'as is'.",
  CamelCase: "Converts strings to a camelCase representation; passes through non-strings 'as is'.",
  KebabCase: "Converts strings to a kebab-case representation; passes through non-strings 'as is'.",
  ToString: "Converts non-strings to a string representation.",
  ToTrue: "Converts to the 'true' literal type",
  ToFalse: "Converts to the 'false' literal type",
  ToBoolean: "Converts to the wide 'boolean' type",
  AsString: "Converts to the wide 'string' type",
  AsBooleanString: "Converts strings to a capitalized representation; passes through non-strings 'as is'.",
  AsNumericString: "Converts strings to a capitalized representation; passes through non-strings 'as is'.",
  Never: "Converts strings to a capitalized representation; passes through non-strings 'as is'.",
  StripLeading: "Converts strings to a capitalized representation; passes through non-strings 'as is'.",
  StripTrailing: "Converts strings to a capitalized representation; passes through non-strings 'as is'.",
  As: "Converts strings to a capitalized representation; passes through non-strings 'as is'.",
  NumericLiteral: "Converts strings to a capitalized representation; passes through non-strings 'as is'.",
  StringLiteral: "Converts strings to a capitalized representation; passes through non-strings 'as is'.",
} as const;
