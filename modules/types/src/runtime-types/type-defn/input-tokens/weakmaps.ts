import type {
    Err,
    WhenErr,
    FromStringInputToken,
    Trim,
    Unset,
    Split,
    RetainAfter,
    Join,
    StripAfter,
    Container,
    NestedSplit,
} from "inferred-types/types";
import type {
    IT_ContainerType
} from "src/runtime-types/type-defn/input-tokens/_base";


type ParseWeakMap<
    T extends readonly [string, string],
    TKey extends string = T[0],
    TVal = T[1]
> = FromStringInputToken<TKey> extends Error
    ? WhenErr<FromStringInputToken<TKey>, { in: `WeakMap<${TKey}, value>`, area: "problem with Key in WeakMap type"}>
    : TVal extends string
        ? FromStringInputToken<TVal> extends Error
            ? WhenErr<FromStringInputToken<TVal>, { in: `Map<${TKey},${TVal}`}>
        : FromStringInputToken<TKey> extends Container
            ? WeakMap<FromStringInputToken<TKey>,FromStringInputToken<TVal>>
            : Err<`invalid-token/weakmap`, `The key of the WeakMap -- ${TKey} -- is not a container type!`, { token: T }>
    : Err<`invalid-token/weakmap`, `The value of the Map token could not be parsed out from '${Trim<Join<T>>}'`>;

type IsolateWeakMap<
    T extends string,
    U extends string = RetainAfter<T, "WeakMap<">
> = NestedSplit<
    U,
    ",",
    { "{": "}" }
> extends readonly [
    infer Key extends string,
    ...[string, ...string[]]
]
    ? [
        Key,
        StripAfter<
        Trim<RetainAfter<T, `${Key},`>>,
        ">"
        >
    ]
    : Err<`invalid-token/weakmap`, `Could not parse WeakMap token: ${T}!`>;

/**
 * Look for a `WeakMap<...>` token at the start of a input token.
 *
 * - returns `Unset` if not found
 * - returns the Set's type -- with generics -- if there are no more tokens
 * after this token
 * - continues processing the rest of the string if there are more tokens
 * to be processed and adds an entry to the `TContainers` generic
 */
export type IT_TakeWeakMap<
    T extends string,
    TInner extends readonly unknown[] = [],
    TContainers extends readonly IT_ContainerType[] = []
> = Trim<T> extends `WeakMap<${infer M}`
    ? IsolateWeakMap<T> extends Error
        ? IsolateWeakMap<T>
        : IsolateWeakMap<T> extends readonly [string, string]
            ? ParseWeakMap<IsolateWeakMap<T>> extends Error
                ? ParseWeakMap<IsolateWeakMap<T>>
                : ParseWeakMap<IsolateWeakMap<T>> extends WeakMap<any,any>
                    ? FromStringInputToken<
                        "  ",
                        [ ...TInner, ParseWeakMap<IsolateWeakMap<T>>],
                        TContainers
                    >
                    : Err<
                        `invalid-token/weakmap`,
                        `Problems parsing WeakMap token: WeakMap<${IsolateWeakMap<T>[0]}, ${IsolateWeakMap<T>[1]}`
                    >
        : never
    : Unset;

// DEBUG WEAKMAP
// type T = "WeakMap<{id: number, data: Array<string>}, string>";
// type TIsolate = IsolateWeakMap<T>;
// type TParse = ParseWeakMap<IsolateWeakMap<T>>
