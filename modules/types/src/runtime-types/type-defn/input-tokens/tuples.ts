import type {
    Contains,
    Err,
    FromInputToken,
    FromStringInputToken,
    Join,
    NestedSplit,
    RetainAfter,
    Trim,
    Unset
} from "inferred-types/types";
import {
    IT_ContainerType
} from "src/runtime-types/type-defn/input-tokens";

type Isolate<T extends string> = NestedSplit<
    RetainAfter<T, "[">,
    "]",
    {
        "<":">",
        "(":")",
        "{":"}"
    }
>;

type Content<T extends string> = Isolate<T> extends readonly [infer C extends string, ...string[]]
    ? Trim<C>
    : never;

type Rest<T extends string> = Isolate<T> extends readonly [string, ...infer R extends readonly string[]]
? Trim<Join<R>>
: never;

type Parse<
    T extends string,
    P extends readonly string[] = NestedSplit<Content<T>, ",", { "{":"}", "[":"]" }>
> = {
    [K in keyof P]: P[K] extends string
        ? FromStringInputToken<P[K]>
        : never
};

type HasError<T extends readonly unknown[]> = Contains<
    T,
    Error
> extends true
    ? true
    : false;

type PresentError<T> = T extends readonly unknown[]
    ? Err<`invalid-token/tuple`>
    : Err<`invalid-token/tuple`>



export type IT_TakeTuple<
    T extends string,
    TInner extends readonly unknown[] = [],
    TContainers extends readonly IT_ContainerType[] = []
> = Trim<T> extends `[${string}`
    ? Isolate<T> extends Error
        ? Isolate<T>
    : HasError<Parse<T>> extends true
        ? PresentError<Parse<T>>
    : FromStringInputToken<
        Rest<T>,
        [ ...TInner, Parse<T> ],
        TContainers
    >
    : Unset;

// DEBUG TUPLE
// type T = "[ number, number, string ] | false";
// type TIsolate = Isolate<T>;
// type TContent = Content<T>;
// type TRest = Rest<T>;
// type TParse = Parse<T>;

