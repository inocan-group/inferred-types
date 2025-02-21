import type {
  And,
  AnyFunction,
  Dictionary,
  IsObjectLiteral,
  ObjectKey,
} from "inferred-types/types";

/**
 * **KeysWithValue**`<TObj,TValue>`
 *
 * Filter's the key/values found on `TObj` to only those whose
 * value _extends_ `TValue`.
 *
 * ```ts
 * // "foo" | "baz"
 * type Str = KeysWithValue<{ foo: "hi"; bar: 5; baz: "bye" }, string>;
 * ```
 *
 * **Related:** `KeysEqualValue`
 */
export type KeysWithValue<
  TObj extends Dictionary,
  TValue,
> = IsObjectLiteral<TObj> extends true
  ? {
      [K in keyof TObj]: TObj[K] extends TValue
        ? TObj[K] extends AnyFunction
          ? TValue extends AnyFunction
            ? K
            : never
          : And<[
            TObj[K] extends readonly any[] ? true : false,
            TValue extends readonly any[] ? false : true,
          ]> extends true

            ? never

            : K
        : never
    }[keyof TObj]
  : ObjectKey[];
