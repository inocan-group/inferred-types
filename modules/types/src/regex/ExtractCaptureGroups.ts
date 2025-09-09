import type { RegexGroupValue } from "inferred-types/types";

type TemplateSegment = "{{string}}" | "{{number}}" | "{{boolean}}";

type SegmentToType<S extends TemplateSegment> = S extends "{{string}}"
    ? string
    : S extends "{{number}}"
        ? number
        : S extends "{{boolean}}"
            ? boolean
            : never;

/**
 * Extracts the capture groups in a RegExp and their type.
 */
type IsSubset<T extends string> = T extends `.*(${string}).*` ? true : false;

export type ExtractCaptureGroups<
    TTmpl extends string,
    TSubset extends boolean = IsSubset<TTmpl>,
    Acc extends RegexGroupValue[] = [],
> = TTmpl extends `${infer _Before}{{${infer Segment}}}${infer After}`
    ? Segment extends "string" | "number" | "boolean"
        ? ExtractCaptureGroups<After, TSubset, [...Acc, SegmentToType<`{{${Segment}}}`>]>
        : ExtractCaptureGroups<After, TSubset, Acc>
    : TSubset extends true
        ? [string, ...Acc]
        : Acc;
