

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
