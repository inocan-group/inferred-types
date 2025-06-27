import type { Dictionary } from "inferred-types/types";

/**
 * **EncodingDefinition**`<T>`
 *
 * An encoding and decoding tuple for converting one
 * string literal type to another.
 */
export interface EncodingDefinition<
    TDefn extends Dictionary<string, string>,
> {
    kind: "EncodingDefinition";
    defn: TDefn;
}
