import type { Dictionary, StringEncoder } from "inferred-types/types";

/**
 * **TokenSyntax**`<TName, TEnc>`
 *
 * Provides the shape of the token as well as an
 * encoder/decoder to ensure parameter values of
 * tokens will not interfere with string pattern
 * matching.
 */
export interface TokenSyntax<
  TName extends string = string,
  TEnc extends StringEncoder = StringEncoder,
  TDec extends StringEncoder = StringEncoder,
> {
  kind: "TokenSyntax";
  /** the name of the Token Syntax */
  name: TName;
  /** the initial starting character's of a token */
  start: string;
  /** a token's  */
  end: string;
  /** the initial starting character's of a token */
  sep: string;

  /**
   * the encode/decode definition
   */
  encodingDefinition: Dictionary<string, string>;

  /**
   * An encoder for parameter values to ensure parsing
   * mistakes on the token are avoided.
   */
  encode: TEnc;
  /**
   * A decoder for parameter values to allow
   * decoding of the _encoded_ safe type.
   */
  decode: TDec;
}
