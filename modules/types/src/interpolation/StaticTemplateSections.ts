import type {
    As,
    FromLiteralTemplate,
    StringLiteralTemplate
} from "inferred-types/types";

type Finalize<
    TResults extends readonly string[],
    TWithType extends boolean | null
> = TWithType extends true
    ? {
            [K in keyof TResults]: StringLiteralTemplate<TResults[K]>
        }
    : TResults;

type Section<
    THead extends string,
    TBlock extends string,
    TWithType extends boolean | null
> = TWithType extends null
    ? THead
    : `${THead}${TBlock}`;

type Scan<
    TTemplate extends string,
    TWithType extends boolean | null,
    TResults extends readonly string[] = [],
    TCurrent extends string = ""
> = TTemplate extends `{{string}}${infer Rest}`
    ? Scan<Rest, TWithType, [...TResults, Section<TCurrent, "{{string}}", TWithType>]>
    : TTemplate extends `{{number}}${infer Rest}`
        ? Scan<Rest, TWithType, [...TResults, Section<TCurrent, "{{number}}", TWithType>]>
        : TTemplate extends `{{boolean}}${infer Rest}`
            ? Scan<Rest, TWithType, [...TResults, Section<TCurrent, "{{boolean}}", TWithType>]>
            : TTemplate extends `{{true}}${infer Rest}`
                ? Scan<Rest, TWithType, [...TResults, Section<TCurrent, "{{true}}", TWithType>]>
                : TTemplate extends `{{false}}${infer Rest}`
                    ? Scan<Rest, TWithType, [...TResults, Section<TCurrent, "{{false}}", TWithType>]>
                    : TTemplate extends `${infer Head}${infer Rest}`
                        ? Scan<Rest, TWithType, TResults, `${TCurrent}${Head}`>
                        : TResults;

/**
 * **StaticTemplateSections**`<TTemplate, [TWithType]>`
 *
 * Segments the various static sections defined in the `TTemplate`.
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
    FromLiteralTemplate<TTemplate> extends infer Template extends string
        ? As<Scan<Template, TWithType>, readonly string[]>
        : [],
    TWithType
>;
