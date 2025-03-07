import type { IsWideString } from "src/boolean-logic";

export type AsTypeSubtype<T extends string> = IsWideString<T> extends true
    ? [ string, string | undefined]
    : T extends `${infer Type}/${infer Subtype}`
        ? [ Type, Subtype ]
        : [ T, undefined ];
