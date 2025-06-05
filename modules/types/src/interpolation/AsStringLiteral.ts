import { ReplaceAll } from "inferred-types/types";


export type AsStringLiteral<T extends string | number> = T extends number
    ? `${T}`
    : T extends string
        ? ReplaceAll<
            ReplaceAll<T, "{{string}}", `${string}`>,
            "{{number}}",
            `${number}`
        >
    : never;
