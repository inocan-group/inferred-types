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
} from "inferred-types/types";
import type {
    IT_ContainerType
} from "src/runtime-types/type-defn/input-tokens/_base";


type ParseMap<
    T extends readonly [string, string],
    TKey extends string = T[0],
    TVal = T[1]
> = FromStringInputToken<TKey> extends Error
    ? WhenErr<FromStringInputToken<TKey>, { in: `Map<${TKey}, value>`, area: "problem with Key in Map type"}>
    : TVal extends string
        ? FromStringInputToken<TVal> extends Error
            ? WhenErr<FromStringInputToken<TVal>, { in: `Map<${TKey},${TVal}`}>
        : Map<FromStringInputToken<TKey>,FromStringInputToken<TVal>>
    : Err<`invalid-token/map`, `The value of the Map token could not be parsed out from '${Trim<Join<T>>}'`>;

type IsolateMap<
    T extends string,
    U extends string = RetainAfter<T, "Map<">
> = Split<
    U,
    ","
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
    : Err<`invalid-token/map`, `Could not parse Map token: ${T}!`>;

/**
 * Look for a `Map<...>` token at the start of a input token.
 *
 * - returns `Unset` if not found
 * - returns the Set's type -- with generics -- if there are no more tokens
 * after this token
 * - continues processing the rest of the string if there are more tokens
 * to be processed and adds an entry to the `TContainers` generic
 */
export type IT_TakeMap<
    T extends string,
    TInner extends readonly unknown[] = [],
    TContainers extends readonly IT_ContainerType[] = []
> = Trim<T> extends `Map<${infer M}`
    ? IsolateMap<T> extends Error
        ? IsolateMap<T>
        : IsolateMap<T> extends readonly [string, string]
            ? ParseMap<IsolateMap<T>> extends Error
                ? ParseMap<IsolateMap<T>>
                : ParseMap<IsolateMap<T>> extends Map<any,any>
                    ? FromStringInputToken<
                        "  ",
                        [ ...TInner, ParseMap<IsolateMap<T>>],
                        TContainers
                    >
                    : Err<
                        `invalid-token/map`,
                        `Problems parsing Map token: Map<${IsolateMap<T>[0]}, ${IsolateMap<T>[1]}`
                    >
        : never
    : Unset;

// DEBUG MAP
type T = "Map<string | number, { id: number, data: unknown }>";
type TIsolate = IsolateMap<T>;
type TParse = ParseMap<IsolateMap<T>>
