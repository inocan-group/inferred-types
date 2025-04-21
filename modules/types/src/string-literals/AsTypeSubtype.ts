import type { IsWideString } from "inferred-types/types";

export type AsTypeSubtype<T extends string> = IsWideString<T> extends true
    ? [ string, string | undefined]
    : T extends `${infer Type}/${infer Subtype}`
        ? [ Type, Subtype ]
        : [ T, undefined ];
