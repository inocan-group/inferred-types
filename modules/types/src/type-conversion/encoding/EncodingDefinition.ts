import { Dictionary } from "src/base-types";
import { FromTo } from "../FromTo";

/**
 * **EncodingDefinition**`<T>`
 *
 * An encoding and decoding tuple for converting one
 * string literal type to another.
 */
export type EncodingDefinition<
  TDefn extends Dictionary<string, string>,
> = {
  kind: "EncodingDefinition";
  defn: TDefn;
}
