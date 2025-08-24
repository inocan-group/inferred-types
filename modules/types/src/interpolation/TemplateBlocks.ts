import type {
    As,
    DefaultTemplateBlocks,
    Filter,
    FromLiteralTemplate,
    Split
} from "inferred-types/types";

/**
 * **TemplateBlocks**`<T>`
 *
 * Given a template string `T`, this utility will extract all of the
 * dynamic blocks -- in the correct order -- found in the template string.
 *
 * @deprecated use `GetTemplateBlocks<T>` instead
 */
export type TemplateBlocks<
    T extends string
> = string extends T
    ? DefaultTemplateBlocks[]
    : As<
        Filter<
            Split<
                As<FromLiteralTemplate<T>, string>,
                DefaultTemplateBlocks,
                "inline"
            >,
            "extends",
            [DefaultTemplateBlocks]
        >,
        readonly DefaultTemplateBlocks[]
    >;

/**
 * **GetTemplateBlocks**`<T, [B]>`
 *
 * A more flexible variant of `TemplateBlocks` where by default the "blocks" which are
 * used are the standard blocks used for interpolation: `{{string}} | {{number}} | {{boolean}}`.
 *
 * - if you want to define your own block vocabulary you can simply express it as a union type
 * and pass into the optional `B` parameter.
 */
export type GetTemplateBlocks<
    T extends string,
    B extends string = DefaultTemplateBlocks
> = As<
    string extends T
        ? B[]
        : Split<T, B, "inline"> extends infer Elements extends readonly string[]
            ? Filter<Elements, "extends", [B]>
            : never,
    readonly string[]
>;
