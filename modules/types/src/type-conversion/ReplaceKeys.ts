import type {
  AnyObject,
  FromTo,
  MergeObjects,
  ReplaceAllFromTo,
  ReplaceFromTo,
} from "inferred-types/types";

export interface ReplaceKeysOptions {
  /**
   * Whether to recurse deeply into the object when
   * replacing keys. Default is `true`.
   */
  deep: boolean;
  /**
   * Indicates whether to replace _all_ `from` instances in the key or
   * just the first one. Default is `true`.
   */
  replaceAll: boolean;
}

interface DEFAULT {
  deep: true;
  replaceAll: true;
}

type O<
  T extends Partial<ReplaceKeysOptions>,
> = MergeObjects<DEFAULT, T> extends ReplaceKeysOptions
  ? MergeObjects<DEFAULT, T>
  : never;

/**
 * **ReplaceKeys**`<TObj,TFromTo,[TOpt]>`
 *
 * Replaces the keys in an object with a tuple of `ToFrom` instructions.
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
  TFromTo extends readonly FromTo[],
  TOpt extends Partial<ReplaceKeysOptions> = DEFAULT,
> = O<TOpt>["replaceAll"] extends true

  ? {
      [K in keyof TObj as ReplaceAllFromTo<K, TFromTo>]: TObj[K] extends AnyObject
        ? O<TOpt>["deep"] extends true
          ? ReplaceKeys<TObj[K], TFromTo, TOpt>
          : TObj[K]
        : TObj[K];
    }
  : {
      [K in keyof TObj as ReplaceFromTo<K, TFromTo>]: TObj[K] extends AnyObject
        ? O<TOpt>["deep"] extends true
          ? ReplaceKeys<TObj[K], TFromTo, TOpt>
          : TObj[K]
        : TObj[K];
    };
