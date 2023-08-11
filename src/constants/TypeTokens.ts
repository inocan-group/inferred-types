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
  "object"
] as const;

/**
 * `TypeToken` names which need a _string_ parameter to fully qualify
 */
export const TYPE_TOKEN_PARAM_STR = [
  "stringLiteral",
  "objectLiteral",
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
 * `TypeToken` names which need a _numeric string_ parameter to fully qualify
 */
export const TYPE_TOKEN_PARAM_NUMERIC = [
  "numericLiteral"
] as const;

/**
 * `TypeToken` names which need a _CSV_ parameter to fully qualify
 */
export const TYPE_TOKEN_PARAM_CSV = [
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
  ...TYPE_TOKEN_PARAM_NUMERIC,
  ...TYPE_TOKEN_PARAM_STR,
  ...TYPE_TOKEN_PARAM_TIME
] as const; 
