
/**
 * **Type Tokens** which have zero configuration elements.
 */
export const TT_Atomics = [
  "undefined",
  "null",
  "boolean",
  "true",
  "false"
] as const;

/**
 * **Type Tokens** which have a literal variant which represents
 * the _single_ configuration of this type which is available.
 */
export const TT_Singletons = [
  "string",
  "number"
] as const;

export const TT_Sets = [
  "string-set",
  "numeric-set",
  "union-set"
] as const;

/**
 * **Type Tokens** which represent _functions_ (either the typical
 * variety or Generator functions).
 */
export const TT_Functions = [
  "fn",
  "gen"
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
  "tuple"
] as const;

export const TT_START = "<<" as const;
export const TT_STOP = ">>" as const;
export const TT_SEP = "::" as const;

/**
 * `TypeToken` names whose name provides the full definition
 * for the type.
 */
export const TYPE_TOKEN_IDENTITIES = [
  "string",
  "number",
  "numericString",
  "booleanString",
  "null",
  "undefined",
  "boolean",
  "true",
  "false",
  "space",
  "whitespace",
  "object",
  "emptyObject",
  "function",
  "array"
] as const;

/**
 * `TypeToken` names which need a _string_ parameter to fully qualify
 */
export const TYPE_TOKEN_PARAM_STR = [
  "explicitClass",
  "startsWith",
  "endsWith",
  "ensureLeading",
  "stripLeading",
  "ensureTrailing",
  "stripTrailing",
  "camelCase",
  "pascalCase",
  "snakeCase",
  "kebabCase",
  "explicitType"
] as const;


/**
 * `TypeToken` names which need a _CSV_ parameter to fully qualify
 */
export const TYPE_TOKEN_PARAM_CSV = [
  "stringLiteral",
  "numericLiteral",
  "objectLiteral",
  "tuple",
  "union"
] as const;

/**
 * `TypeToken` names which need a _datetime_ parameter to fully qualify
 */
export const TYPE_TOKEN_PARAM_DATETIME = [
  "datetime",
] as const;

/**
 * `TypeToken` names which need a _datetime_ parameter to fully qualify
 */
export const TYPE_TOKEN_PARAM_DATE = [
  "ymd",
  "monthThenDate",
  "dateThenMonth"
] as const;

export const TYPE_TOKEN_PARAM_TIME = [
  "timeInMinutes",
  "timeInSeconds",
  "militaryTimeInMinutes",
  "militaryTimeInSeconds",
  "militaryTimeInMilliseconds",
  "civilianTimeInMinutes"
] as const;

export const TYPE_TOKEN_ALL = [
  ...TYPE_TOKEN_IDENTITIES,
  ...TYPE_TOKEN_PARAM_CSV,
  ...TYPE_TOKEN_PARAM_DATE,
  ...TYPE_TOKEN_PARAM_DATETIME,
  ...TYPE_TOKEN_PARAM_STR,
  ...TYPE_TOKEN_PARAM_TIME
] as const; 
