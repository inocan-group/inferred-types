import type { ReplaceAll } from "inferred-types/types";

export type AsLiteralTemplate<T extends string | number> = T extends number
    ? `${T}`
    : T extends string
        ? ReplaceAll<
            ReplaceAll<T, "{{string}}", `${string}`>,
            "{{number}}",
            `${number}`
        >
        : never;
