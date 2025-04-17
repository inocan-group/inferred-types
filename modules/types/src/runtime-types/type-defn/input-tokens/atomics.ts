import {
    Err,
    FromStringInputToken,
    IT_AtomicToken,
    Trim,
    Unset
} from "inferred-types/types";
import {
    IT_ContainerType
} from "src/runtime-types/type-defn/input-tokens/_base";


export type IT_TakeAtomic<
    T extends string,
    TInner extends readonly any[] = [],
    TContainers extends readonly IT_ContainerType[] = []
> = Trim<T> extends `${IT_AtomicToken}${infer Rest}`
    ? Trim<T> extends `${infer Token extends IT_AtomicToken}${Rest}`
    ? FromStringInputToken<
        Rest,
        [...TInner, ConvertAtomic<Token>],
        TContainers
    >
    : never
    : Unset;

type ConvertAtomic<
    T extends IT_AtomicToken
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
    : T extends "function"
    ? (...args: any[]) => any
    : Err<"invalid-token/atomic", `The token '${T}' is not a valid atomic token!`>;


