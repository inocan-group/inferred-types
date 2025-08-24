import type { Contains } from "inferred-types/types";
import type { StringKeys } from "types/dictionary";
import type { TemplateMap__Basic } from "types/interpolation/template-maps";
import type { DefineObject } from "types/runtime-types";

type Curly<
    T extends DefineObject,
    K extends readonly string[] = StringKeys<T>,
    O extends string = never
> = K extends [ infer Head extends string, ...infer Rest extends readonly string[]]
    ? Curly<T, Rest, O | `{{${Head}}}`>
    : O;

/**
 * **IsStaticTemplate**`<TContent,[TSegments]>`
 *
 * A boolean operator which indicates whether any of the dynamic segments
 * defined in `TSegments` was found in `TContent`.
 */
export type IsStaticTemplate<
    TContent extends string,
    TSegments extends DefineObject = TemplateMap__Basic
> = Contains<TContent, Curly<TSegments>>;
