import { FromLiteralTemplate, Retain, Split, TemplateBlocks } from "inferred-types/types";


type TemplateTupleToTypeTuple<T extends readonly TemplateBlocks[]> = {
    [K in keyof T]: T[K] extends "{{string}}"
        ? string
        : T[K] extends "{{number}}"
        ? number
        : T[K] extends "{{boolean}}"
        ? boolean
        : never;
}

/**
 * **TemplateParams**`<T>`
 *
 * Extracts a tuple of wide types which are needed to complete a given literal template.
 */
export type TemplateParams<
    T extends string
> = TemplateTupleToTypeTuple<
    Retain<
        Split<
            FromLiteralTemplate<T>,
            TemplateBlocks,
            "inline"
        >,
        TemplateBlocks
    >
>
