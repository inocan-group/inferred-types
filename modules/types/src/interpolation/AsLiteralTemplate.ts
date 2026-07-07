import type {
    As,
    Err,
    FromInputToken__String,
    InputTokenSuggestions,
    ReplaceAll,
    StringKeys,
    TemplateMap__Basic
} from "inferred-types/types";

type Convert<
    TContent extends string,
    TSegments extends object,
    TKeys extends readonly string[] = StringKeys<TSegments>
> = TKeys extends [infer Head extends string & keyof TSegments, ...infer Rest extends readonly string[]]
    ? [FromInputToken__String<As<TSegments[Head], InputTokenSuggestions>>] extends [string | number | boolean]
            ? Convert<
                ReplaceAll<TContent, `{{${Head}}}`, `${FromInputToken__String<As<TSegments[Head], InputTokenSuggestions>>}`>,
                TSegments,
                Rest
            >
            : TContent extends `{{${Head}}}`
                ? FromInputToken__String<As<TSegments[Head], InputTokenSuggestions>>
                : Err<
                    `invalid-type/template`,
            `The segment '{{${Head}}}' was configured as a type which can not be embedded inside of a string literal!`,
            { segment: Head; invalidType: FromInputToken__String<As<TSegments[Head], InputTokenSuggestions>>; content: TContent }
                >
    : TContent;

/**
 * **AsLiteralTemplate**`<T>`
 *
 * Converts Static Template sections to a Literal Template
 */
export type AsLiteralTemplate<
    TContent extends string | number,
    TSegments extends object = TemplateMap__Basic
> = TContent extends number
    ? `${TContent}`
    : TContent extends string
        ? TContent extends `{{${infer Inner extends string}}}`
            ? Inner extends keyof TSegments
                ? FromInputToken__String<As<TSegments[Inner], InputTokenSuggestions>>
                : Convert<TContent, TSegments>
            : Convert<TContent, TSegments>
        : never;
