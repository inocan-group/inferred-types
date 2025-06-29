import type {
    AfterFirst,
    Csv,
    First,
    Integer,
    Ip4Address,
    IsoDateLike,
    IsoDateTimeLike,
    IsoTimeLike,
    Keys,
    ReplaceAll,
} from "inferred-types/types";

interface DefaultLookup {
    "{{string}}": string;
    "{{boolean}}": `${boolean}`;
    "{{number}}": `${number}`;
    "{{integer}}": `${Integer}`;
    "{{date}}": `${IsoDateLike}`;
    "{{csv}}": `${Csv}`;
    "{{time}}": `${IsoTimeLike}`;
    "{{datetime}}": `${IsoDateTimeLike}`;
    "{{ipv4}}": `${Ip4Address}`;
}

type Find = Keys<DefaultLookup>;

type Interpolate<
    TContent extends string,
    TFind extends readonly string[],
> = [] extends TFind
    ? TContent
    : First<TFind> extends keyof DefaultLookup
        ? DefaultLookup[First<TFind>] extends string
            ? Interpolate<
                ReplaceAll<TContent, First<TFind>, DefaultLookup[First<TFind>]>,
                AfterFirst<TFind>
            >
            : never
        : never;

/**
 * **asTemplate**`(template)`
 *
 * Converts a string with template tags `{{type}}` into string literals.
 *
 * ```ts
 * // `age: ${Integer}`
 * const template = asTemplate("age: {{integer}}")
 * ```
 *
 * **Related:** `asTemplateProvidingTags`
 */
export function asTemplate<T extends string>(template: T) {
    return template as Interpolate<T, Find>;
}

export function applyTemplate() {
    // TODO
}
