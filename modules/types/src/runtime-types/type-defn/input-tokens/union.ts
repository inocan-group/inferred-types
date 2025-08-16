import type { FromInputToken__String, IT_ContainerType, Trim } from "inferred-types/types";

export type IT_TakeUnionDelimiter<
    T extends string,
    TInner extends readonly any[] = [],
    TContainers extends readonly IT_ContainerType[] = []
> = Trim<T> extends `|${infer Rest}`
    ? TContainers extends [...any[], "Union"]
        ? FromInputToken__String<Trim<Rest>, TInner, TContainers>
        : FromInputToken__String<Trim<Rest>, TInner, [...TContainers, "Union"]>
    : undefined;
