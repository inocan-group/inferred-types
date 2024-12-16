/**
 * **Type Tokens** which have zero configuration elements.
 */
export const TT_Atomics = [
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
export const TT_Singletons = [
  "string",
  "number",
] as const;

export const TT_Sets = [
  "string-set",
  "numeric-set",
  "fn-set",
  "union-set",
] as const;

/**
 * **Type Tokens** which represent _functions_ (either the typical
 * variety or Generator functions).
 */
export const TT_Functions = [
  "fn",
  "gen",
] as const;

/**
 * **Type Tokens** which _contain_ other **Type Tokens** to make up their
 * identity.
 */
export const TT_Containers = [
  "rec",
  "arr",
  "set",
  "map",
  "union",
  "obj",
  "tuple",
] as const;

export const TT_KIND_VARIANTS = [
  ...TT_Atomics,
  ...TT_Containers,
  ...TT_Functions,
  ...TT_Sets,
  ...TT_Singletons,
] as const;

export const TT_START = "<<" as const;
export const TT_STOP = ">>" as const;
export const TT_SEP = "::" as const;
