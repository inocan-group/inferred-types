import type { TemplateBlock, TemplateBlocks } from "inferred-types/types";

type Map = {
    "{{string}}": string;
    "{{number}}": number;
    "{{boolean}}": boolean;
};

/**
 * **TemplateParams**`<T>`
 *
 * Extracts a tuple of wide types which are needed to complete a given literal template.
 */
export type TemplateParams<
    T extends string,
    B extends readonly TemplateBlock[] = TemplateBlocks<T>
> = {
    [K in keyof B]: B[K] extends keyof Map
        ? Map[B[K]]
        : never
};
