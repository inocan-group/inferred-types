/**
 * **Type Tokens** which have zero configuration elements.
 */
export const TT_ATOMICS = [
  "undefined",
  "null",
  "boolean",
  "true",
  "false",
] as const;

/**
 * **Type Tokens** which have a literal variant which represents
 * the _single_ configuration of this type which is available.
 */
export const TT_SINGLETONS = [
  "string",
  "number",
] as const;

export const TT_SETS = [
  "string-set",
  "numeric-set",
  "fn-set",
  "union-set",
] as const;

/**
 * **Type Tokens** which represent _functions_ (either the typical
 * variety or Generator functions).
 */
export const TT_FUNCTIONS = [
  "fn",
  "gen",
] as const;

/**
 * **Type Tokens** which _contain_ other **Type Tokens** to make up their
 * identity.
 */
export const TT_CONTAINERS = [
  "rec",
  "arr",
  "set",
  "map",
  "union",
  "obj",
  "tuple",
] as const;

export const TT_KIND_VARIANTS = [
  ...TT_ATOMICS,
  ...TT_CONTAINERS,
  ...TT_FUNCTIONS,
  ...TT_SETS,
  ...TT_SINGLETONS,
] as const;

export const TT_START = "<<" as const;
export const TT_STOP = ">>" as const;
export const TT_DELIMITER = "::" as const;
