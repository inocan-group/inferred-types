export const FALSY_TYPE_KINDS = [
  "undefined",
  "null",
] as const;

export const LITERAL_TYPE_KINDS = [
  "true",
  "false",
  "stringLiteral",
  "numericLiteral",
] as const;

export const WIDE_TYPE_KINDS = [
  "string",
  "number",
  "boolean",
] as const;

export const NARROW_CONTAINER_TYPE_KINDS = [
  "object",
  "explicitFunctions",
  "fnType",
  "fnWithDict",
  "tuple",
  "union",
  "intersection",
  "arrayOf",
] as const;

export const WIDE_CONTAINER_TYPE_KINDS = [
  "anyArray",
  "anyObject",
  "unknownObject",
  "anyFunction",
  "emptyObject",
] as const;

/**
 * A full list of the _types_ of types we have within the `Type` namespace.
 */
export const TYPE_KINDS = [
  ...FALSY_TYPE_KINDS,
  ...WIDE_TYPE_KINDS,
  ...LITERAL_TYPE_KINDS,
  ...NARROW_CONTAINER_TYPE_KINDS,
  ...WIDE_CONTAINER_TYPE_KINDS,
] as const;
