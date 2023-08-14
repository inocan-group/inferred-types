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

