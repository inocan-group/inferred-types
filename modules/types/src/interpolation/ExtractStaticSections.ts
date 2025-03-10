import { AfterFirst, First, FromLiteralTemplate, Replace, Split, StaticTemplateSections, StringLiteralTemplate } from "inferred-types/types";



type Remove<
    TContent extends string,
    TStatic extends readonly string[],
    TResult extends readonly string[] = []
> = [] extends TStatic
? TContent
: Remove<
    Replace<TContent, First<TStatic>, "">,
    AfterFirst<TStatic>,
    [
        ...TResult,

    ]
>



export type ExtractStaticSections<
    TContent extends string,
    TTemplate extends string
> = TContent extends StringLiteralTemplate<TTemplate>
? Remove<
    TContent,
    StaticTemplateSections<TTemplate>
>
: never;
