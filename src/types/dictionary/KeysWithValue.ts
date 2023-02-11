
/**
 * **KeysWithValue**`<TObj,TValue>`
 * 
 * The _keys_ on a given object `TObj` which extend the value 
 * of `TWithValue`.
 * 
 * ```ts
 * // "foo"
 * type Str = KeysWithValue<{ foo: "hi"; bar: 5 }, string>;
 * ```
 */
export type KeysWithValue<TObj extends object, TWithValue> = {
  [K in keyof TObj]: TObj[K] extends TWithValue 
    ? TObj[K] extends any[]
      ? TWithValue extends any[]
        ? Readonly<K>
        : never
      : TWithValue extends any[]
        ? never
        : Readonly<K>
    : never;
}[keyof TObj];
