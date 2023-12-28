
const t_unknown = "<<unknown>>" as unknown;
const t_string = "<<string>>" as string;
const t_number = "<<number>>" as unknown as number;
const t_union_string_tuple = "<<union:string,tuple>>" as string | readonly unknown[];
const t_numeric_array = "<<numeric-array>>" as unknown as readonly (number | `${number}`)[];

/**
 * **TYPE_TRANSFORMS**
 * 
 * A lookup table keyed with the available conversions `ConversionOp` and where
 * each row provides:
 * 
 * 1. Reference Type
 * 2. Parameters
 * 3. Description
 */
export const TYPE_TRANSFORMS = {
  Identity: [ t_unknown, [], "a transform which returns the same value passed in"],
  ToNever: [ t_unknown, [], "converts all incoming types to the Never type"],
  ToString: [ t_unknown, [], "ensures that any incoming type is converted to a string variant of that value"],
  ToBoolean: [ t_unknown, [], "uses Javascript's \"truthiness\" to convert inputs to a boolean value; with functions it will use the return type"],
  Trim: [ t_string, [], "Trims whitespace from start and end of string" ],
  TrimStart: [ t_string, [], "Trims whitespace from start of string" ],
  TrimEnd: [ t_string, [], "Trims whitespace from end of string" ],
  Capitalize: [ t_string, [], "Converts a string input to a capitalized variant"],
  UnCapitalize: [ t_string, [], "Converts a string input to a un-capitalized variant"],
  AllCaps: [ t_string, [], "Converts a string input to all uppercase characters"],
  Lowercase: [ t_string, [], "Converts a string input to all lowercase characters"],
  ToCamelCase: [ t_string, [], "Converts a string to use the camelCase naming convention"],
  ToKebabCase: [ t_string, [], "Converts a string to use the kebab-case naming convention"],
  ToPascalCase: [ t_string, [], "Converts a string to use the PascalCase naming convention"],
  ToSnakeCase: [ t_string, [], "Converts a string to use the snake_case naming convention"],
  StripLeading: [ t_string, [t_string], "Strips a string literal from the beginning of a string (if it exists)"],
  StripTrailing: [ t_string, [t_string], "Strips a string literal from the end of a string (if it exists)"],
  EnsureLeading: [ t_string, [t_string], "Ensures a string literal is at the beginning of a string (with no change if it already was)"],
  EnsureTrailing: [ t_string, [t_string], "Ensures a string literal is at the end of a string (with no change if it already was)"],
  ToPlural: [ t_string, [], "Pluralizes a word"],
  Surround: [ t_string, [t_string, t_string], "Surrounds a string literal with a pre and post character or set of characters"],
  Prepend: [ t_union_string_tuple, [t_unknown], "Takes a string or tuple and prepends a value to the start."],
  Append: [ t_union_string_tuple, [t_unknown], "Takes a string or tuple and appends a value to the end."],
  Increment: [ t_number, [], "Increments a numeric value by one"],
  Decrement: [ t_number, [], "Decrements a numeric value by one"],
} as const; // satisfies Record<TransformOp, 



