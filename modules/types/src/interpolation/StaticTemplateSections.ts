import type {
    As,
    FromLiteralTemplate,
    Split,
    StringLiteralTemplate,
    TemplateBlock
} from "inferred-types/types";

type Finalize<
    TResults extends readonly string[],
    TWithType extends boolean | null
> = TWithType extends true
    ? {
        [K in keyof TResults]: StringLiteralTemplate<TResults[K]>
    }
    : TResults;

/**
 * **StaticTemplateSections**`<TTemplate, [TWithType]>`
 *
 * Segments the various static sections definied in the `TTemplate`.
 *
 * - if you optionally set the `TWithType` generic to `true` then the
 * string literal templates will be added
 * - if you set `TWithType` generic to `false` then the template blocks
 * like `{{string}}`, etc. will be added.
 */
export type StaticTemplateSections<
    TTemplate extends string,
    TWithType extends boolean | null = null
> = Finalize<
    As<Split<
        FromLiteralTemplate<TTemplate>,
        TemplateBlock,
        TWithType extends null
            ? "omit"
            : "before"
    >, readonly string[]>,
    TWithType
>;
