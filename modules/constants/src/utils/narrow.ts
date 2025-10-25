
type Narrowable = string | number | boolean | symbol | object | undefined | void | null;

type Dictionary = Record<string | symbol, any>;

type IsUnionImpl<T, C extends T = T>
    = (T extends infer TItem // Iterate over T, here TItem is an item from the original union T. Ingredients 1&2
        ? C extends TItem // C holds the original union T. Does union T extends an item from it? // Ingredient 3
            ? true // yes. that could only be true if union T consist of one item
            : unknown // no
        : never) extends true ? false : true; // have we got true from the above? yes - it's not a union

/**
 * **IsUnion**`<T>`
 *
 * Type utility which returns a boolean flag indicating whether the
 * given `T` is typed as a _union_ type.
 *
 * Note: `boolean` is treated as a union (`true | false`) and returns `true`.
 */
type IsUnion<T> = IsUnionImpl<T>;

type IsTuple<T> = [T] extends [readonly any[]]
                ? [number] extends [T["length"]]
                    ? false
                    : true
                : false;

type MutableObject<T> = [T] extends [boolean]
    ? T
    : {
        -readonly [K in keyof T]: T[K] extends Dictionary
            ? Mutable<MutableObject<T[K]>>
            : IsTuple<T[K]> extends true
                ? Mutable<T[K]>
                : T[K] extends readonly (infer R)[]
                    ? [...R[]]
                    : Mutable<T[K]>;
    };

type MutableArray<T extends readonly unknown[]> = [...{
    [K in keyof T]: Mutable<T[K]>
}];

/**
 * **Mutable**`<T>`
 *
 * Makes a readonly type -- either a dictionary or an array -- into a mutable value without
 * widening the type.
 */
type Mutable<T>
    = [IsUnion<T>] extends [true]
        ? T
        : [T] extends [infer Arr extends readonly unknown[]]
            ? MutableArray<Arr>
            : [T] extends [infer Dict extends Dictionary]
                ? MutableObject<Dict>
                : T;


type Returns<
    T extends (readonly N[]) | [Record<K, N>] | [readonly N[]],
    K extends PropertyKey,
    N extends Narrowable
> = T["length"] extends 1
    ? Mutable<T[0]>
    : Mutable<T>;

/**
 * **narrow**(value)
 *
 * An identity function which provides the input in as narrow a form
 * as possible.
 *
 * - if only a single item is provided we will isolate it and treat
 * as it's own entity.
 *      - so a scalar value such as `narrow(42)` results in the numeric literal `42`
 *      not `[42]`
 *
 * ```ts
 * const s = narrow("foo"); // "foo"
 * const n = narrow(42); // 42
 * // ["foo", "bar"]
 * const t1 = narrow(["foo", "bar"] as const);
 * const t2 = narrow(["foo","bar"]);
 * const t3 = narrow("foo", "bar");
 * // { foo: 1 }
 * const o1 = narrow({foo: 1});
 * // [ { foo: 1 } ]
 * const o2 = narrow([foo:1]);
 * ```
 *
 * **Related:** `defineObj`
 */
export function narrow<
    const N extends Narrowable,
    const K extends PropertyKey,
    const T extends (readonly N[]) | [Record<K, N>] | [readonly N[]],
>(...values: T): Returns<T, K, N> {
    // we evaluate lengths of 1 differently
    if (values.length === 1) {
        return values[0] as Returns<T, K, N>;
    }

    return values as Returns<T, K, N>;
}
