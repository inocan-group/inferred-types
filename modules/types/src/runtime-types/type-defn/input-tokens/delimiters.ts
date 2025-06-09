import type {
    And,
    As,
    Extends,
    FromKv,
    FromInputToken__String,
    Last,
    Or,
    Pop,
    Trim,
    Unset
} from "inferred-types/types";
import type {
    IT_ContainerType
} from "src/runtime-types/type-defn/input-tokens/_base";

type IsTerminalChar<
    T,
    TContainers extends readonly IT_ContainerType[]
> = And<[
    Or<[
        Extends<Last<TContainers>, "Array">,
        Extends<Last<TContainers>, "Map">,
        Extends<Last<TContainers>, "WeakMap">,
        Extends<Last<TContainers>, "Set">,
    ]>,
    Extends<T, ">">
]> extends true
    ? true
    : And<[
        Extends<Last<TContainers>, "Literal">,
        Extends<T, ")">
    ]> extends true
        ? true
        : false;

type IT_UnwrapContainer<
    TEl extends readonly any[],
    TContainers extends readonly IT_ContainerType[]
> = Last<TContainers> extends "Array"
    ? TEl[0]
    : Last<TContainers> extends "Object"
        ? FromKv<TEl>
        : TEl[0];

export type IT_TakeTerminalDelimiter<
    T extends string,
    TInner extends readonly any[] = [],
    TContainers extends readonly IT_ContainerType[] = []
> = Trim<T> extends `${infer First}${infer Rest}`
    ? IsTerminalChar<First, TContainers> extends true
        ? Trim<Rest> extends ""
            ? IT_UnwrapContainer<
                TInner,
                As<Pop<TContainers>, readonly IT_ContainerType[]>
            >
            : FromInputToken__String<
                Rest,
                TInner,
                As<Pop<TContainers>, readonly IT_ContainerType[]>
            >
        : Unset
    : Unset;
