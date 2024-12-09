import type {
  AfterFirst,
  Dictionary,
  First,
  IsFunction,
  IsObjectLiteral,
  Keys,
  ObjectKey,
} from "inferred-types/types";

type Process<
  TKeys extends readonly ObjectKey[],
  TObj extends Dictionary,
  TValue,
  TResults extends readonly ObjectKey[] = [],
> = [] extends TKeys
  ? TResults
  : [First<TKeys>] extends [keyof TObj ]
      ? [IsFunction<TValue>] extends [true]
          ? [IsFunction<TObj[First<TKeys>]>] extends [true]
              ? Process<AfterFirst<TKeys>, TObj, TValue, [...TResults, First<TKeys>]>
              : Process<AfterFirst<TKeys>, TObj, TValue, TResults>
          : [TObj[First<TKeys>]] extends [TValue]
              ? Process<AfterFirst<TKeys>, TObj, TValue, [...TResults, First<TKeys>]>
              : Process<AfterFirst<TKeys>, TObj, TValue, TResults>
      : never;

/**
 * **KeysWithValue**`<TObj,TValue>`
 *
 * Filter's the key/values found on `TObj` to only those whose
 * values _extend_ `TValue`.
 *
 * ```ts
 * // ["foo",  "baz"]
 * type Str = KeysWithValue<{ foo: "hi"; bar: 5; baz: "bye" }, string>;
 * ```
 *
 * **Related:** `KeysEqualValue`
 */
export type KeysWithValue<
  TObj extends Dictionary,
  TValue,
> = [IsObjectLiteral<TObj>] extends [true]
  ? Process<
    Keys<TObj>,
    TObj,
    TValue
  >
  : ObjectKey[];
