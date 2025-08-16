import type { ReplaceAll } from "inferred-types/types";

/**
 * **AsLiteralTemplate**`<T>`
 *
 * Converts a Static Template to a Literal Template
 */
export type AsLiteralTemplate<T extends string | number> = T extends number
    ? `${T}`
    : T extends string
        ? ReplaceAll<
            ReplaceAll<T, "{{string}}", `${string}`>,
            "{{number}}",
            `${number}`
        >
        : never;
