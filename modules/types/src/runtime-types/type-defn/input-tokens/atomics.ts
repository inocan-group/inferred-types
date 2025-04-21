import {
    FirstChar,
    FromStringInputToken,
    IT_AtomicToken,
    Trim,
    Unset,
    Whitespace
} from "inferred-types/types";
import {
    IT_ContainerType
} from "src/runtime-types/type-defn/input-tokens/_base";

type IsTerminal<T extends string> = Trim<T> extends ""
? true
: FirstChar<T> extends Whitespace | "|" | "&"
? true
: false


export type IT_TakeAtomic<
    T extends string,
    TInner extends readonly any[] = [],
    TContainers extends readonly IT_ContainerType[] = []
> = Trim<T> extends `${IT_AtomicToken}${infer Rest}`
    ? Trim<T> extends `${infer Token extends IT_AtomicToken}${Rest}`
    ? ConvertAtomic<Token, IsTerminal<Rest>> extends Unset
        ? ConvertAtomic<Token, IsTerminal<Rest>>
    : FromStringInputToken<
        Rest,
        [
            ...TInner,
            ConvertAtomic<Token, IsTerminal<Rest>>
        ],
        TContainers
    >
    : never
    : Unset;

type ConvertAtomic<
    T extends IT_AtomicToken,
    E extends boolean
> = T extends "string"
    ? string
    : T extends "number"
    ? number
    : T extends "bigint"
    ? bigint
    : T extends "boolean"
    ? boolean
    : T extends "null"
    ? null
    : T extends "undefined"
    ? undefined
    : T extends "void"
    ? void
    : T extends "unknown"
    ? unknown
    : T extends "any"
    ? any
    : T extends "true"
    ? true
    : T extends "false"
    ? false
    : Lowercase<T> extends "object"
    ? object
    : [E] extends [true]
        ? T extends "function"
            ? (...args: any[]) => any
        : T extends "Map"
            ? Map<any,any>
        : T extends "Set"
            ? Set<any>
        : T extends "WeakMap"
            ? WeakMap<any,any>
        : T extends "Generator"
            ? Generator<any,any,any>
        : T extends "Array"
            ? Array<any>
        : Unset
    : Unset;




