export const SIMPLE_DICT_VALUES = [
  "string",
  "number",
  "boolean",
  "unknown",
  "Opt<string>",
  "Opt<number>",
  "Opt<boolean>",
  "Opt<unknown>",
] as const;

export const SIMPLE_SET_TYPES = [
  "string",
  "number",
  "boolean",
  "unknown",
  "Opt<string>",
  "Opt<number>",
  "Opt<boolean>",
  "Opt<unknown>",
] as const;

export const SIMPLE_SCALAR_TOKENS = [
  "string",
  "number",
  `string(TOKEN)` as `string(${string})`,
  `number(TOKEN)` as `number(${number}${`,${string}` | ""})`,
  "boolean",
  "true",
  "false",
  "null",
  "undefined",
  "unknown",
  "any",
  "never",
] as const;

export const SIMPLE_OPT_SCALAR_TOKENS = [
  "Opt<string>",
  "Opt<number>",
  "Opt<boolean>",
  "Opt<true>",
  "Opt<false>",
  "Opt<null>",
  "Opt<undefined>",
  "Opt<unknown>",
  "Opt<any>",
  "Opt<string(TOKEN)>" as `Opt<string(${string}${`,${string}` | ""})>`,
  "Opt<number(TOKEN)>" as `Opt<number(${number}${`,${string}` | ""})`,
  "Opt<undefined>",
] as const;

export const SIMPLE_FN_TOKENS = [
  "Fn<none> => Unknown",
  "Fn<string> => Unknown",
  "Fn<number> => Unknown",
  "Fn<boolean> => Unknown",
] as const;

export const SIMPLE_UNION_TOKENS = [
  `Union(TOKEN)` as `union(${string}${`,${string}` | ""})`,
] as const;

export const SIMPLE_MAP_KEYS = [
  "string",
  "number",
  "Dict",
  "Dict<string, string>",
  "Dict<string, number>",
  "Dict<string, boolean>",
  "Dict<string, unknown>",
  "Dict<string, Opt<string>>",
  "Dict<string, Opt<number>>",
  "Dict<string, Opt<boolean>>",
] as const;

export const SIMPLE_MAP_VALUES = [
  ...SIMPLE_MAP_KEYS,
  "boolean",
  "unknown",
  "undefined",
  "Dict",
  "Array",
  "Dict<string, Opt<string>>",
  "Dict<string, Opt<number>>",
  "Dict<string, Opt<boolean>>",
  "Dict<string, Opt<unknown>>",
] as const;

type ReqScalarToken = typeof SIMPLE_SCALAR_TOKENS[number];
type OptScalarToken = typeof SIMPLE_OPT_SCALAR_TOKENS[number];
type ScalarToken = ReqScalarToken | OptScalarToken;
type MapKeys = typeof SIMPLE_MAP_KEYS[number];
type MapValues = typeof SIMPLE_MAP_VALUES[number];
type SetType = typeof SIMPLE_SET_TYPES[number];

export const SIMPLE_DICT_TOKENS = [
  "Dict",
  "Dict<string, string>",
  "Dict<string, number>",
  "Dict<string, boolean>",
  "Dict<string, unknown>",
  "Dict<string, Opt<string>>",
  "Dict<string, Opt<number>>",
  "Dict<string, Opt<boolean>>",
  "Dict<string, Opt<unknown>>",
  "Dict<{TOKEN: TOKEN}>" as `Dict<{${string}: ${ScalarToken}}>`,
  "Dict<{TOKEN: TOKEN, TOKEN: TOKEN}>" as `Dict<{${string}: ${ScalarToken}, ${string}: ${string}}`,
] as const;

export const SIMPLE_ARRAY_TOKENS = [
  "Array",
  "Array<string>",
  "Array<string(TOKEN)>" as `Array<string(${string})>`,
  "Array<number>",
  "Array<number(TOKEN)>" as `Array<number(${number}${`,${string}` | ""})>`,
  "Array<boolean>",
  "Array<unknown>",
  `Array<Dict>`,
  `Array<Set>`,
  `Array<Map>`,
] as const;

export const SIMPLE_MAP_TOKENS = [
  "Map",
  "Map<TOKEN, TOKEN>" as `Map<${MapKeys}, ${MapValues}>`,
  "WeakMap",
] as const;

export const SIMPLE_SET_TOKENS = [
  "Set",
  "Set<TOKEN>" as `Set<${SetType}>`,
] as const;

export const SIMPLE_CONTAINER_TOKENS = [
  ...SIMPLE_DICT_TOKENS,
  ...SIMPLE_ARRAY_TOKENS,
  ...SIMPLE_MAP_TOKENS,
  ...SIMPLE_SET_TOKENS,
] as const;

/**
 * **SIMPLE_TOKENS**
 *
 * A list of strings literals which can be used
 * to express the type of a variable or token
 * in relatively course granularity
 */
export const SIMPLE_TOKENS = [
  ...SIMPLE_SCALAR_TOKENS,
  ...SIMPLE_OPT_SCALAR_TOKENS,
  ...SIMPLE_CONTAINER_TOKENS,
  ...SIMPLE_UNION_TOKENS,
] as const;
