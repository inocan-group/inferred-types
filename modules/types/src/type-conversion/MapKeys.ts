import type {
    AsFromTo,
    CamelKeys,
    Dictionary,
    EmptyObject,
    FromTo,
    KebabKeys,
    PascalKeys,
    ReplaceAllFromTo,
    ReplaceFromTo,
    SnakeKeys,
} from "inferred-types/types";

type CaseOptions = "none" | "PascalCase" | "CamelCase" | "SnakeCase" | "KebabCase";

export interface MapKeysOptions {

    /**
     * Indicates whether to replace _all_ `from` instances in the key or
     * just the first one. Default is `true`.
     */
    replaceAll: boolean;

    /**
     * switch the _casing_ standard of all keys (camelCase, PascalCase, etc.)
     */
    casing: CaseOptions;
}

interface DEFAULT extends MapKeysOptions {
    replaceAll: true;
    casing: "none";
}

type Process<
    TObj extends Dictionary,
    TConfig extends (readonly FromTo[]),
    TOpt extends Partial<MapKeysOptions> = DEFAULT,
> = TConfig extends readonly FromTo[]
    ? TOpt["replaceAll"] extends false
        ? {
            [K in keyof TObj as ReplaceFromTo<K, TConfig>]: TObj[K] extends Dictionary
                ? Process<TObj[K], TConfig, TOpt>
                : TObj[K];
        }
        : {
            [K in keyof TObj as ReplaceAllFromTo<K, TConfig>]: TObj[K] extends Dictionary
                ? Process<TObj[K], TConfig, TOpt>
                : TObj[K];
        }
// Dictionary definition
    : TConfig extends Dictionary<string, string>
        ? Process<TObj, AsFromTo<TConfig>, TOpt>
        : TConfig extends EmptyObject
            ? TObj
            : never;

type Go<T extends Dictionary<string, string> | readonly FromTo[]> = T extends readonly FromTo[]
    ? T
    : T extends Dictionary<string, string>
        ? AsFromTo<T>
        : never;

/**
 * **MapKeys**`<TObj,TFromTo,[TOpt]>`
 *
 * Maps a given `TObj`'s keys to a variant set of keys.
 *
 * - keys are mapped with `TMap`
 *     - `TMap` can either be a dictionary config or a tuple of `FromTo` instructions
 *     - the TMap transforms are done _before_ any "case-based" transforms from
 *     the options hash.
 *
 * - `TOpt` allows you to express:
 *    - `deep` - whether the traversal should be deep or not (default is **true**)
 *    - `replaceAll` - whether _all instances_ of `from` in the key should be replaced
 * or just the first instance (default is **true**)
 *
 * ```ts
 * // { Foo: { Bar: 2 }}
 * type Obj = MapKeys<{ _foo_: { _bar_: 2 }}, [
 *    { from: "f"; to: "F" },
 *    { from: "b"; to: "B" },
 *    { from: "_"; to: "" }
 * ]>
 * ```
 */
export type MapKeys<
    TObj extends Dictionary,
    TConfig extends (readonly FromTo[]) | Dictionary<string, string>,
    TOpt extends Partial<MapKeysOptions> = DEFAULT,
>
  = TOpt["casing"] extends "CamelCase"
      ? CamelKeys<Process<TObj, Go<TConfig>, TOpt>>
      : TOpt["casing"] extends "PascalCase"
          ? PascalKeys<Process<TObj, Go<TConfig>, TOpt>>
          : TOpt["casing"] extends "KebabCase"
              ? KebabKeys<Process<TObj, Go<TConfig>, TOpt>>
              : TOpt["casing"] extends "SnakeCase"
                  ? SnakeKeys<Process<TObj, Go<TConfig>, TOpt>>
                  : Process<TObj, Go<TConfig>, TOpt>;
