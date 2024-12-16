/* eslint-disable no-template-curly-in-string */
export const TYPE_TOKEN_REC_VARIANTS = [
  "object-key",
  "string-key",
] as const;

export const TYPE_TOKEN_REC_KEY_VARIANTS = [
  "unknown",
  "any",
  "string",
  "number",
  "boolean",
  "truthy",
  "numberlike",
  "scalar",
  "object",
  "string|undefined",
  "number|undefined",
  "boolean|undefined",
  "object|undefined",
  "unknown[]",
  "any[]",
  "string[]",
  "number[]",
  "boolean[]",

] as const;

export const TYPE_TOKEN_STRING_SET_VARIANTS = [
  "endsWith::${string}",
  "startsWith::${string}",
  "contains::${string}",
  "civilianTime",
  "militaryTime",
  "ipv4Address",
  "ipv4Address::tight",
  "ipv4Address::loose",
  "ipv6Address",
  "ipv6Address::${string}",
  "numericString",
  "zipCode5",
  "zipCode5+4",
  "countryCode2",
  "countryCode3",
  "countryName",
  "capitalized",
  "url",
  "url::${string}",
  "isoDate",
  "isoDateTime",
  "usStateAbbrev",
  "usCitySuggestions",
  "metricCategory",
  "metric",
  "metric::${Metric}",
] as const;

export const TYPE_TOKEN_UNION_SET_VARIANTS = [
  "numberLike",
  "scalar",

];
