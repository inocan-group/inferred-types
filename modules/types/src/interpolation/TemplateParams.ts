import { TemplateBlock, TemplateBlocks } from "inferred-types/types";

/**
 * **TemplateParams**`<T>`
 *
 * Extracts a tuple of wide types which are needed to complete a given literal template.
 */
export type TemplateParams<T extends string> = TemplateBlocks<T> extends readonly TemplateBlock[]
? {
    [K in keyof T]: T[K] extends TemplateBlock
        ? T[K] extends "{{string}}"
            ? string
        : T[K] extends "{{number}}"
            ? number
        : T[K] extends "{{boolean}}"
            ? boolean
        : never
        : never
}

: never;
