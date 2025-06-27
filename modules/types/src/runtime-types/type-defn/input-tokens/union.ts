import type { FromInputToken__String, Trim } from "inferred-types/types";
import type {
    IT_ContainerType
} from "src/runtime-types/type-defn/input-tokens/_base";

export type IT_TakeUnionDelimiter<
    T extends string,
    TInner extends readonly any[] = [],
    TContainers extends readonly IT_ContainerType[] = []
> = Trim<T> extends `|${infer Rest}`
    ? TContainers extends [...any[], "Union"]
        ? FromInputToken__String<Trim<Rest>, TInner, TContainers>
        : FromInputToken__String<Trim<Rest>, TInner, [...TContainers, "Union"]>
    : undefined;
