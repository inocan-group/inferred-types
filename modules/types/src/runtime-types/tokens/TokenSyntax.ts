import type { ReverseLookup } from "src/dictionary";
import type { AsFromTo, ReplaceAllFromTo, ReplaceAllToFrom } from "src/type-conversion";

/**
 * **TokenSyntax**`<TName, TEnc>`
 *
 * Provides the shape of the token as well as an
 * encoder/decoder to ensure parameter values of
 * tokens will not interfere with string pattern
 * matching.
 */
export interface TokenSyntax<
  TName extends string,
  TEnc extends Record<string, string>,
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
  encodingDefinition: TEnc;

  /**
   * An encoder for parameter values to ensure parsing
   * mistakes on the token are avoided.
   */
  encode: <T extends string>(content: T) =>
    ReplaceAllFromTo<T, AsFromTo<TEnc>>;
  /**
   * A decoder for parameter values to
   */
  decode: <T extends string>(token: T) =>
    ReplaceAllToFrom<T, AsFromTo<TEnc>>;
}
