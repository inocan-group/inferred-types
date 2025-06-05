import type {
    AfterFirst,
    First,
    Replace,
    Split,
    Split2,
    StartsWith,
    StaticTemplateSections,
    StringLiteralTemplate,
    TemplateBlock,
    TemplateBlock__BARE
} from "inferred-types/types";

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
    >;

export type TemplateSection<T extends TemplateBlock = TemplateBlock> = {
    before: string;
    type: T;
} | { after: string };

export type ExtractTemplateSections<
    TTemplate extends string,
    TSection extends readonly TemplateSection[] = []
> = TTemplate extends `${string}{{${infer Block extends TemplateBlock__BARE}${string}`
    ? TTemplate extends `${infer Before}${Block}`
        ? TakeSection<Before, Block> extends Error
            ? [
                ...TSection,

            ]
            : []
        : never




: TTemplate extends ""
    ? TSection
    : [
        ...TSection,
        {
            after: TTemplate
        }
    ];




// TContent extends StringLiteralTemplate<TTemplate>
//     ? Remove<
//         TContent,
//         StaticTemplateSections<TTemplate>
//     >
//     : never;
