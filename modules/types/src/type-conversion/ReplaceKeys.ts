import type {
    AnyObject,
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

export interface ReplaceKeysOptions {

    /**
     * Indicates whether to replace _all_ `from` instances in the key or
     * just the first one. Default is `true`.
     */
    replaceAll: boolean;

    casing: CaseOptions;
}

interface DEFAULT extends ReplaceKeysOptions {
    replaceAll: true;
    casing: "none";
}

type Process<
    TObj extends AnyObject,
    TConfig extends (readonly FromTo[]) | Dictionary<string, string>,
    TOpt extends Partial<ReplaceKeysOptions> = DEFAULT,
> = TConfig extends readonly FromTo[]
    ? TOpt["replaceAll"] extends false
        ? {
            [K in keyof TObj as ReplaceFromTo<K, TConfig>]: TObj[K] extends AnyObject
                ? Process<TObj[K], TConfig, TOpt>
                : TObj[K];
        }
        : {
            [K in keyof TObj as ReplaceAllFromTo<K, TConfig>]: TObj[K] extends AnyObject
                ? Process<TObj[K], TConfig, TOpt>
                : TObj[K];
        }
// Dictionary definition
    : TConfig extends Dictionary<string, string>
        ? Process<TObj, AsFromTo<TConfig>, TOpt>
        : TConfig extends EmptyObject
            ? TObj
            : never;

/**
 * **ReplaceKeys**`<TObj,TFromTo,[TOpt]>`
 *
 * Replaces the keys in an object with a tuple of `FromTo` instructions.
 *
 * - `TOpt` allows you to express:
 *    - `deep` - whether the traversal should be deep or not (default is **true**)
 *    - `replaceAll` - whether _all instances_ of `from` in the key should be replaced
 * or just the first instance (default is **true**)
 *
 * ```ts
 * // { Foo: { Bar: 2 }}
 * type Obj = ReplaceKeys<{ _foo_: { _bar_: 2 }}, [
 *    { from: "f"; to: "F" },
 *    { from: "b"; to: "B" },
 *    { from: "_"; to: "" }
 * ]>
 * ```
 */
export type ReplaceKeys<
    TObj extends AnyObject,
    TConfig extends (readonly FromTo[]) | Dictionary<string, string>,
    TOpt extends Partial<ReplaceKeysOptions> = DEFAULT,
> =
  TOpt["casing"] extends "CamelCase"
      ? CamelKeys<Process<TObj, TConfig, TOpt>>
      : TOpt["casing"] extends "PascalCase"
          ? PascalKeys<Process<TObj, TConfig, TOpt>>
          : TOpt["casing"] extends "KebabCase"
              ? KebabKeys<Process<TObj, TConfig, TOpt>>
              : TOpt["casing"] extends "SnakeCase"
                  ? SnakeKeys<Process<TObj, TConfig, TOpt>>
                  : Process<TObj, TConfig, TOpt>;
