import type {
    As,
    Filter,
    FromLiteralTemplate,
    Split,
    TemplateBlock
} from "inferred-types/types";

type TemplateTupleToTypeTuple<T extends readonly TemplateBlock[]> = {
    [K in keyof T]: T[K] extends "{{string}}"
        ? string
        : T[K] extends "{{number}}"
            ? number
            : T[K] extends "{{boolean}}"
                ? boolean
                : never;
};

/**
 * **TemplateParams**`<T>`
 *
 * Extracts a tuple of wide types which are needed to complete a given literal template.
 */
export type TemplateParams<
    T extends string
> = TemplateTupleToTypeTuple<
    As<
        Filter<
            Split<
                FromLiteralTemplate<T>,
                TemplateBlock,
                "inline"
            >,
            "extends",
            [TemplateBlock]
        >,
        readonly TemplateBlock[]
    >
>;
