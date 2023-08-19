export const TYPE_CONVERSION_CROSS_TYPE = [
  "Identity",
  "ToNever",
  "ToString",
  "ToBoolean"
] as const;

export const TYPE_CONVERSION_STRING = [
  "Capitalize",
  "Lowercase",
  "AllCaps",
  "Plural",
  "ToPascalCase",
  "ToCamelCase",
  "ToKebabCase",
  "ToSnakeCase",
  "StripLeading",
  "StripTrailing",
  "EnsureLeading",
  "EnsureTrailing",
  "Surround",
  "Prepend",
  "Append"
] as const;

export const TYPE_CONVERSION_NUMERIC = [
  "Increment",
  "Decrement"
] as const;

export const TYPE_CONVERSION_TUPLE = [
  "Sum",
] as const;

/**
 * **TYPE_CONVERSION**
 * 
 * All type conversions supported by mapping operations
 */
export const TYPE_CONVERSION =[
  ...TYPE_CONVERSION_CROSS_TYPE,
  ...TYPE_CONVERSION_STRING,
  ...TYPE_CONVERSION_NUMERIC,
] as const;


export const TYPE_CONVERSION_DESC = {
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
