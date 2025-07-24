import { AfterFirst, First, FromLiteralTemplate, Replace, TemplateParams } from "inferred-types/types";

type Iterate<
    /**
     * the template which has already been converted from
     * literal template to a static template
     */
    TTpl extends string,
    /**
     * the explicit value/types which the caller has passed in
     */
    TArgs extends readonly (string|number|boolean)[],
    /**
     * the template "holes" which exist in `TTpl` along with
     * their base type.
     */
    TParams extends readonly (string|number|boolean)[]
> = [] extends TParams
? TTpl
: Iterate<
    Replace<
        // content
        TTpl,
        // find
        First<TParams> extends string
        ? "{{string}}"
        : First<TParams> extends number
        ? "{{number}}"
        : First<TParams> extends boolean
        ? "{{boolean}}"
        : never,
        // replace
        `${First<TArgs>}`
    >,
    AfterFirst<TArgs>,
    AfterFirst<TParams>
>;


/**
 * **IntoTemplate**`<TTpl, TArgs>`
 *
 *
 */
export type IntoTemplate<
    TTpl extends string,
    TArgs extends TemplateParams<TTpl>
> = Iterate<
    FromLiteralTemplate<TTpl>,
    TArgs,
    TemplateParams<TTpl>
>;
