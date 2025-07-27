import type {
    As,
    AsTemplateType,
    AsTemplateTypes,
    Filter,
    FromLiteralTemplate,
    Split,
    TemplateBlock
} from "inferred-types/types";



/**
 * **TemplateBlocks**`<T>`
 *
 * Given a template string `T`, this utility will extract all of the
 * dynamic blocks -- in the correct order -- found in the template string.
 */
export type TemplateBlocks<
    T extends string
> = string extends T
? TemplateBlock[]
: As<
    Filter<
    Split<
        As<FromLiteralTemplate<T>, string>,
        TemplateBlock,
        "inline"
    >,
    "extends",
    [TemplateBlock]
>, readonly TemplateBlock[]>

