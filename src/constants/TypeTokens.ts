/**
 * `TypeToken` names whose name provides the full definition
 * for the type.
 */
export const TYPE_TOKEN_IDENTITIES = [
  "string",
  "number",
  "numeric-string",
  "boolean-string",
  "null",
  "undefined",
  "boolean",
  "boolean-image",
  "true",
  "false",
  "space",
  "whitespace"
] as const;

/**
 * `TypeToken` names which need a _string_ parameter to fully qualify
 */
export const TYPE_TOKEN_PARAM_STR = [
  "string-literal",
  "object-literal",
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
  "numeric-literal"
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
  "date",
  "full-date",
  "YMD",
  "MonthThenDate",
  "DateThenMonth"
] as const;

export const TYPE_TOKEN_PARAM_TIME = [
  "time-in-minutes",
  "time-in-seconds",
  "military-time",
  "civilian-time"
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
